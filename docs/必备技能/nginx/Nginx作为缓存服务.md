# Nginx作为缓存服务

### 基本配置详解

```nginx
    #需要首先配置 缓存目录，文件目录层级2级，空间名字 10m大小，目录最大大小(超过启动nginx自己的淘汰规则)，在60分钟的时间内没有被访问就会被清理，存放临时文件
# 作用:设置缓存的路径以及其他参数
# 参数(按顺序依次对应):
#      :path 缓存路径
#      :levels 定义目录层级
#      :keys_zone 配置缓存空间名称和空间大小
#      :max_size 配置最大缓存大小，超过限制将启用淘汰机制，淘汰掉使用频率最少的缓存
#      :inactive 在指定时间内未被访问的缓存数据将被删除
#      :use_temp_path 临时文件存放路径，建议设置为off
proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=cache_zone:10m max_size=10g inactive=10m use_temp_path=off;
 
server {
    listen       80;
    server_name  localhost www.a.com;
 
    # 如果url中包含以下路径参数，那么 cookie_nocache 的值为1
    if($request_uri ~^/(url3|login|register|password\/reset)){
        set $cookie_nocache 1;
    }
 
    location / {
        slice 5m; # 设置切片大小，将一个请求分解成多个子请求，每个子请求返回响应内容的一片段
        proxy_cache cache_zone;  # 开启缓存
        proxy_pass http://backend.com;
        proxy_cache_valid 200 304 12h; # 为状态码为200和304的响应设置12小时过期的缓存
        proxy_cache_valid any 10m;  # 为其它状态码的响应设置10分钟过期的缓存
        proxy_cache_key $host$uri$is_args$args$slice_range; # 定义缓存的key
        proxy_set_header  Range $slice_range; #在请求头中添加Range参数，可向服务器请求文件的一部分
        add_header  Nginx-Cache "$upstream_cache_status"; # 可根据该头信息判断是否命中缓存
 
        #部分不设置缓存 cookie_nocache上面配置的参数,    cookie_nocache不为0或者空  那么是不会进行缓存的
        proxy_no_cache $cookie_nocache $arg_nocache $arg_comment;
        proxy_no_cache $http_pragma $http_authorization;
    }
}
```

---



### 参考链接

- [Module ngx_http_proxy_module](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [Module ngx_http_slice_module](http://nginx.org/en/docs/http/ngx_http_slice_module.html)