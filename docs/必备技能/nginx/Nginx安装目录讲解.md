# Nginx安装目录讲解

## 安装目录详解

通过命令`rpm -ql nginx`查看Nginx生成的文件
```
/etc/logrotate.d/nginx
/etc/nginx
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf
/etc/nginx/fastcgi_params
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/mime.types
/etc/nginx/modules
/etc/nginx/nginx.conf
/etc/nginx/scgi_params
/etc/nginx/uwsgi_params
/etc/nginx/win-utf
/etc/sysconfig/nginx
/etc/sysconfig/nginx-debug
/usr/lib/systemd/system/nginx-debug.service
/usr/lib/systemd/system/nginx.service
/usr/lib64/nginx
/usr/lib64/nginx/modules
/usr/libexec/initscripts/legacy-actions/nginx
/usr/libexec/initscripts/legacy-actions/nginx/check-reload
/usr/libexec/initscripts/legacy-actions/nginx/upgrade
/usr/sbin/nginx
/usr/sbin/nginx-debug
/usr/share/doc/nginx-1.16.1
/usr/share/doc/nginx-1.16.1/COPYRIGHT
/usr/share/man/man8/nginx.8.gz
/usr/share/nginx
/usr/share/nginx/html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html
/var/cache/nginx
/var/log/nginx
```

---

`/etc/logrotate.d/nginx`
- 类型：配置文件
- 作用：Nginx日志轮转，用于logrotate服务的日志切割（比如按天切割日志）

---

`/etc/nginx /etc/nginx/nginx.conf /etc/nginx/conf.d /etc/nginx/conf.d/default.conf`
- 类型：目录，配置文件
- 作用：Nginx主配置文件

**/etc/nginx/nginx.conf 是主配置文件，当Nginx启动优先读取，当没有变更的时候，会读取/etc/nginx/conf.d/default.conf（安装是默认加载的）。**

---

`/etc/nginx/fastcgi_params /etc/nginx/uwsgi_params /etc/nginx/scgi_params`
- 类型：配置文件
- 作用：cgi配置相关，fastcgi配置

---

`/etc/nginx/koi-utf /etc/nginx/koi-win /etc/nginx/win-utf`
- 类型：配置文件
- 作用：编码转换映射转化文件

---

`/etc/nginx/mime.types`
- 类型：配置文件
- 作用：设置http协议的ContentType(数据返回类型)与扩展名对应关系

**当Nginx要处理一些不能识别的扩展名和文件类型的时候就需要编辑该文件**

---

`/usr/lib/systemd/system/nginx-debug.service /usr/lib/systemd/system/nginx.service /etc/sysconfig/nginx /etc/sysconfig/nginx-debug`
- 类型：配置文件
- 作用：用于配置出系统守护进程管理器管理方式

---

`/usr/lib64/nginx /etc/nginx/modules`
- 类型：目录
- 作用：Nginx模块目录

---

`/usr/sbin/nginx /usr/sbin/nginx-debug`
- 类型：命令
- 作用：Nginx服务的启动管理的终端命令

---

`/usr/share/doc/nginx-1.16.0 /usr/share/doc/nginx-1.16.0/COPYRIGHT /usr/share/man/man8/nginx.8.gz`
- 类型：文件，目录
- 作用：Nginx的手册和帮助文件

---

`/var/cache/nginx`
- 类型：目录
- 作用：Nginx的缓存目录

**Nginx处理可以做代理，还可以做缓存服务**

---

`/var/log/nginx`
- 类型：目录
- 作用：Nginx的日志目录
