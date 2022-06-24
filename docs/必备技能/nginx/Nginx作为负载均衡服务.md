# Nginx作为负载均衡服务

### 基本配置详解

```nginx
# 轮询策略
upstream backend_1 {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}

# 加权轮询策略
upstream backend_2 {
    server backend1.example.com weight=5; # weight越大被访问的机率越高
    server backend2.example.com weight=3;
    server backend3.example.com;
}

# ip_hash
# 同一个IP每次都是请求固定的服务器
upstream backend_3 {
    ip_hash;
    
    server backend1.example.com;
    server backend2.example.com;
}

# hash
# 通过自定义key实现请求调度
upstream backend_4 {
    hash $request_uri;
    
    server backend1.example.com;
    server backend2.example.com;
}


upstream backend {
    server backend1.example.com:8080 fail_timeout=5s; # fail_timeout:多次请求失败后，服务暂停的时间
    server 192.0.2.1 max_fails=3; # max_fails:允许请求失败的次数
    server backend2.example.com max_conns=10; # max_conns:限制连接到后端服务器最⼤并发活动连接数
	server unix:/tmp/backend3 down; #down:将服务器标记为永不可用
    
    server backup2.example.com:8080 backup; # backup:标记为备用服务器
}

server {
    listen 80;
    server_name localhost;
	
    location / {
        proxy_pass http://dynamic;
    }
}
```

---



### 参考链接

- [ngx_http_upstream_module](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)

