# Nginx作为静态资源web服务

### 基本配置详解

```nginx
http {
    include mime.types;
    default_type    application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for"';
    
    sendfile on;  # 作用：提升文件传输性能
                  # 原理：sendfile为off时：
                  #                       在对一个文件进行传输时，流程如下
                  #                       硬盘—>内核buf—>用户buf—>socket相关缓冲区—>协议引擎
                  #       sendfile为on时：
                  #                       硬盘—>内核buf—>协议引擎
    
    tcp_nopush on; # 作用：在建立套接字连接时启用Linux的TCP_CORK，即在TCP交互的过程中，数据包不会
                   #       立刻传输，而是等到数据包最大时，一次性传输，从而减少网络拥塞。
                   # 备注：需开启sendfile时才生效
    
    tcp_nodelay on; # 作用：数据包不等待，实时发送给用户（Keepalive连接下生效）
                    # 备注：同时打开tcp_nopush和tcp_nodelay并不冲突，且有以下效果
                    #       1、确保数据包在发送给客户之前是满的
   	                #       2、对于最后一个数据包，允许TCP立即发送，没有延迟
    
    server {
        listen 80;
        server_name www.a.com;
        
        location ~ .*\.(jpg|gif|png)$ {
            gzip on; # 作用：对传输的数据进行压缩，提高传输速率，并节省网络带宽资源
            gzip_http_version 1.1; # 作用：gzip协议版本配置
            gzip_comp_level 5; # 作用：压缩等级配置。等级1-9，等级越高压缩效果越好，但对CPU的资源消耗也越多
            gzip_min_length 100k; # 作用：配置允许压缩的最小字节数，即文件大小小于该值，则不对其进行压缩
            gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
            root  /opt/app/images;
        }
        
        location ~ ^/download {
            gzip_static on; # 作用：与gzip动态压缩相反，gzip_static是静态压缩，如果文件中存在'.gz'的与压缩
           	                #       文件，则直接返回。相较动态压缩更节省CPU资源。
            root  /opt/app/static;
        }
        
        location ~ .*\.(htm|html)$ {
            expires 24h; # 作用：配置文件过期时间，未过期则直接从缓存中读取
            root /opt/app/www;
        }
        
        # 跨域访问场景配置
        location ~ .*\.(htm|html)$ {
            add_header Access-Control-Allow-Origin http://www.b.com; # 备注：`*` 表示允许所有站点都可进行跨域访问
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            root /opt/app/www;
        }
        
        # 防盗链配置
        location ~*\.(gif|jpg)$ {
            valid_referers none blocked www.imcati.com; # 备注: none--表示允许请求头中缺少"Referer"字段
                                                        #       blocked--请求头中存在"Referer"字段，但
                                                        #       其值已被防火墙或代理服务器删除，这些值不
                                                        #       是以"http://"或"https://"开头的字符串,
                                                        #       该情况将被允许
                                                        #       server_names--"Referer"字段与server_name
                                                        #       相同则允许访问
            if ($invalid_referer) {
                return 403;
            }
        }
    }
}
```

---



参考链接

- [Module ngx_http_secure_link_module](http://nginx.org/en/docs/http/ngx_http_secure_link_module.html)	用于检查请求链接的真实性，保护资源免受未经授权的访问并限制链接的生命周期