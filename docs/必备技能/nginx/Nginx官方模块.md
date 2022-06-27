# Nginx官方模块

- `--with-http_stub_status_module`

  - 概述

    | 用途                                          | 语法          | 配置位置           |
    | --------------------------------------------- | ------------- | ------------------ |
    | 监控Nginx服务器的连接状态 | `stub_status` | `server, location` |

  - 举例

    ```nginx
     location /status {
        stub_status;
    }
    ```

  - 备注

    访问http://host/status即可看到当前Nginx连接状态

- `--with-http_random_index_module`

  - 概述

    | 用途                                                 | 语法                   | 配置位置   |
    | ---------------------------------------------------- | ---------------------- | ---------- |
    | 从目录中随机选取一个页面作为主页 | `random_index on\|off` | `location` |

  - 举例

    ```nginx
    location / {
        root /www;
        random_index on;
    }
    ```

  - 备注

    不会随机到隐藏文件

- `--with-http_sub_module`

  - 概述

    | 用途                             | 语法                                                         | 配置位置                 |
    | -------------------------------- | ------------------------------------------------------------ | ------------------------ |
    | HTTP内容替换 | `sub_filter 'old_str' 'new_str' `<br>`sub_filter_last_modified on\|off`<br>`sub_filter_once on\|off` | `http, server, location` |

  - 举例

    ```nginx
    location / {
        root /www;
        index index.html;
        sub_filter 'old' 'new';
        sub_filter_once on; # 设置为on时，只替换匹配到的第一个字符；设置为off时，替换匹配到的所有字符
        # sub_filter_last_modified off; # 用于校验每一次请求时页面是否发生改变
    }
    ```

- `-limit_conn_module`

  - 概述

    | 用途                             | 语法                                                         | 配置位置                                                   |
    | -------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
    | 连接频率限制 | 1. `limit_conn_zone key zone=name:size;`<br/>2.`limit_conn zone number;` |  1.`http`<br>2.`http, server, location` |

  - 举例

    ```nginx
    http{
        limit_conn_zone $remote_addr zone=conn_zone:1m;
        server {
            location / {
                root   /www;
                index  index.html index.htm;
                limit_conn conn_zone 5; # 5同一时间的最大连接数
          }
      }
    }
    ```

    

- `-limit_req_module`

  - 概述

    | 用途                             | 语法                                                         | 配置位置                                                   |
    | -------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
    | 请求频率限制 | 1. `limit_req_zone key zone=name:size;`<br/>2.`limit_req zone=name [burst=number] [nodelay \| delay=number];` | 1.`http`<br>2.`http, server, location` |

  - 举例

    ```nginx
    http {
        limit_req_zone $binary_remote_addr zone=req_zone:10m rate=1r/s;
        server {
            location /search/ {
                limit_req zone=req_zone burst=5; # 超过请求速率的请求将被延迟请求，且延迟请求不超过5个
                							  # delay默认为0，即所有多余的请求都会被延迟
                # limit_req zone=req_zone burst=5 nodelay; # 如果不希望多余的请求被延迟，可以使用nodelay
            }
    ```

- `-http_access_module`

  - 概述

    | 用途                                 | 语法                                                         | 配置位置                               |
    | ------------------------------------ | ------------------------------------------------------------ | -------------------------------------- |
    | 基于IP的访问控制 | 1. `allow address \| CIDR \| unix: \| all`<br/>2.`deny address \| CIDR \| unix: \| all` | `http, server, location, limit_except` |

  - 举例

    ```nginx
    location  ~^/admin.html  {
        deny  192.168.1.1;
        allow 192.168.1.0/24;
        allow 10.1.1.0/16;
        allow 2001:0db8::/32;
        deny  all;
    }
    ```

- `-http_auth_basic_module`

  - 概述

    | 用途                                   | 语法                                                         | 配置位置                               |
    | -------------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
    | 基于用户的信任登陆 | 1. `auth_basic string\|off;`<br/>2.`auth_basic_user_file file;` | `http, server, location, limit_except` |

  - 举例

    ```nginx
    location / {
        auth_basic           "admin site";
        auth_basic_user_file conf/htpasswd; # 保存认证信息的文件
        								 # 可使用"htpasswd"工具生成该文件
    }
    ```

---



###参考链接

- [Nginx官方文档](http://nginx.org/en/docs/)。

