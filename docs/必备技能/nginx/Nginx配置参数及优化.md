# Nginx配置参数及优化

## nginx基本配置与参数说明
~~~nginx
# 运行用户
user nobody;

# 启动进程数
# 建议和本机CPU核心数保持一致
worker_processes  1; 
 
# 全局错误日志及PID文件
error_log  logs/error.log;
error_log  logs/error.log  notice;
error_log  logs/error.log  info;
 
pid        logs/nginx.pid;

# 工作模式及连接数上限
events {
    # epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    # 仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll; 
    
    # 使每个worker进程可以同时处理多个客户端请求
    multi_accept on
 
    #单个后台worker process进程的最大并发链接数    
    worker_connections  1024;
 
    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4

    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535
 
}
 
 
http {
    # 设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    # 设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
 
    access_log  logs/access.log  main;
    
    # 隐藏Nginx版本号
    server_tokens off;
 
    # 使用内核的FD文件传输功能，可以减少user mode和kernel mode的切换，从而提升服务器性能
    # 对于普通应用，必须设为 on,
    # 如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    # 以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    
    # 当tcp_nopush设置为on时，会调用tcp_cork方法进行数据传输，当应用程序产生数据时，内核不会立马封装包，而是当数据量积累到一定量时才会封装，然后传输。
    tcp_nopush     on;
 
    # 当tcp_nodelay设置为on时，不缓存data-sends（关闭 Nagle 算法）,能够提高高频发送小数据报文的实时性。
    tcp_nodelay     on;
    # 关于Nagle算法
    # 比如要传输1个字节的数据，以IPv4为例，则每个包都要附带40字节的头，也就是说，总计41个字节的数据里，其中只有1个字节是我们需要的数据。为了解决这个问题，出现了Nagle算法。它规定：如果包的大小满足MSS，则可以立即发送，否则数据会被放到缓冲区，等到已经发送的包被确认了之后才能继续发送。通过这样的规定，可以降低网络里小包的数量，从而提升网络性能
    
    # 连接超时时间
    keepalive_timeout  30;
    
    # 定义当客户端和服务端处于长连接的情况下，每个客户端的请求上限
    keepalive_requests 5000
        
    # 客户端如果在该指定时间内没有加载完body数据，则断开连接，默认60s
    client_body_timeout 10
    
    # 服务器向客户端发送数据包后，客户端在一定时间内没有接收数据，nginx将关闭该连接
    send_timeout 3
        
    # 开启gzip压缩功能
    gzip  on;
    
    # 请求资源超过该值才进行压缩，单位：字节
    gzip_min_length 1024;
    
    # 设置压缩使用的buffer大小，第一个参数为数量，第二个为每个buffer的大小
    gzip_buffers 16 8k;
    
    # 设置压缩级别，范围1-9，9压缩级别最高，也最耗费CPU资源
    gzip_comp_level 6;
    
    # 指定需要压缩的文件类型
    gzip_types text/plain application/x-javascript text/css application/xml image/jpeg image/gif image/png;
    
    # IE1-6版本的浏览器不启用压缩
    gzip_disable "MSIE [1-6].";
 
    # 客户端header的buffer大小
    client_header_buffer_size 4k;
    
    # 对于较大的header将使用该部分的buffer，两个参数，第一个为个数，第二个为每个buffe大小
    large_client_header_buffers 4 8k;
    
    # 当客户端以POST方法提交数据到服务端时，会先写入到client_body_buffer中，当buffer写满会写到临时文件
    client_body_buffer_size 128k
    
    # 客户端在发送数据较大的请求时，client_max_body_size将限制Content-Length所示值的大小。当数据大小超过该限制，Nginx在不接收完所有数据的情况下即可中断请求，并返回状态码413。参数设置为0，表示无限制，建议参数设置为10m
    client_max_body_size 10m

 
 
    # 设定虚拟主机配置
    server {
        # 侦听80端口
        listen    80;
        # 定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;
 
        # 定义服务器的默认网站根目录位置
        root html;
 
        # 设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;
 
        # 默认请求
        location / {
            # 定义首页索引文件的名称 
            index index.php index.html index.htm;   
 
        }
 
        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }
 
        # 静态文件
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
          	# 静态文件在浏览器缓存中的过期时间
            expires 30d;
        }
 
        # PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
        
        # 反向代理
        # 后端（Flask）接口请求转发
        location /api/ {
            
        # DemoBackend没有斜杠的话会导致404
	    proxy_pass http://DemoBackend/;
        proxy_redirect  off;
        proxy_set_header  Host  $host;
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
	
	    include uwsgi_params;
	    uwsgi_pass 127.0.0.1:5000;
	    uwsgi_read_timeout 20s;
	    uwsgi_send_timeout 20s;
        proxy_read_timeout 20s;
        proxy_send_timeout 20s;
      
    }
 
        # 禁止访问 .htxxx 文件
            location ~ /.ht {
            deny all;
        }
 
    }
    
    # HTTPS配置
    server {
        listen 443 ssl;
        server_name  www.nginx.cn;
        charset     utf-8;
        ssl_certificate /etc/nginx/conf.d/www.nginx.cn.pem;
        ssl_certificate_key /etc/nginx/conf.d/www.nginx.cn.key;
        # 会话缓存
        ssl_session_cache   shared:SSL:10m;
       	# 会话超时时间
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
		
        # 该设置将只允许使用域名访问
        if ($host != 'www.nginx.cn'){
            return 404;
        }

        location / {
        index index.html;
        alias /www/;
        autoindex on;
        }
}
    
    # 简单的负载均衡节点配置
    upstream DemoBackend {
     server 192.168.10.1;
     server 192.168.10.2;
     ip_hash;
 }
}
~~~
