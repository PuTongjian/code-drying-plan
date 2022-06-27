import{_ as e,o as i,c as n,e as s}from"./app.6e5a8480.js";const l={},d=s(`<h1 id="mysql\u4E3B\u4ECE\u590D\u5236" tabindex="-1"><a class="header-anchor" href="#mysql\u4E3B\u4ECE\u590D\u5236" aria-hidden="true">#</a> MySQL\u4E3B\u4ECE\u590D\u5236</h1><p>\u57FA\u4E8EDocker\u6765\u6F14\u793A\u5982\u4F55\u914D\u7F6EMySQL\u4E3B\u4ECE\u590D\u5236\u3002\u6211\u4EEC\u4E8B\u5148\u51C6\u5907\u597DMySQL\u7684\u914D\u7F6E\u6587\u4EF6\u4EE5\u53CA\u4FDD\u5B58MySQL\u6570\u636E\u548C\u8FD0\u884C\u65E5\u5FD7\u7684\u76EE\u5F55\uFF0C\u7136\u540E\u901A\u8FC7Docker\u7684\u6570\u636E\u5377\u6620\u5C04\u6765\u6307\u5B9A\u5BB9\u5668\u7684\u914D\u7F6E\u3001\u6570\u636E\u548C\u65E5\u5FD7\u6587\u4EF6\u7684\u4F4D\u7F6E\u3002</p><div class="language-Shell ext-Shell line-numbers-mode"><pre class="language-Shell"><code>root
\u2514\u2500\u2500 mysql
    \u251C\u2500\u2500 master
    \u2502   \u251C\u2500\u2500 conf
    |	\u2514\u2500\u2500 data
    \u2514\u2500\u2500 slave-1
    |	\u251C\u2500\u2500 conf
    |	\u2514\u2500\u2500 data
    \u2514\u2500\u2500 slave-2
    |	\u251C\u2500\u2500 conf
    |	\u2514\u2500\u2500 data
    \u2514\u2500\u2500 slave-3
    	\u251C\u2500\u2500 conf
    	\u2514\u2500\u2500 data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><p>MySQL\u7684\u914D\u7F6E\u6587\u4EF6\uFF08master\u548Cslave\u7684\u914D\u7F6E\u6587\u4EF6\u9700\u8981\u4E0D\u540C\u7684server-id\uFF09\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[mysqld]
pid-file=/var/run/mysqld/mysqld.pid
socket=/var/run/mysqld/mysqld.sock
datadir=/var/lib/mysql
log-error=/var/log/mysql/error.log
server-id=1
log-bin=/var/log/mysql/mysql-bin.log
expire_logs_days=30
max_binlog_size=256M
symbolic-links=0
# slow_query_log=ON
# slow_query_log_file=/var/log/mysql/slow.log
# long_query_time=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u521B\u5EFA\u548C\u914D\u7F6Emaster\u3002</p><div class="language-Shell ext-Shell line-numbers-mode"><pre class="language-Shell"><code>docker run -d -p 3306:3306 --name mysql-master \\
-v /root/mysql/master/conf:/etc/mysql/mysql.conf.d \\
-v /root/mysql/master/data:/var/lib/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 mysql:5.7

docker exec -it mysql-master /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-Shell ext-Shell line-numbers-mode"><pre class="language-Shell"><code>mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 1
Server version: 5.7.23-log MySQL Community Server (GPL)
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.

mysql&gt; grant replication slave on *.* to &#39;slave&#39;@&#39;%&#39; identified by &#39;iamslave&#39;;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql&gt; flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 |      590 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)

mysql&gt; quit
Bye
exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u521B\u5EFADocker\u5BB9\u5668\u65F6\u4F7F\u7528\u7684<code>-v</code>\u53C2\u6570\uFF08<code>--volume</code>\uFF09\u8868\u793A\u6620\u5C04\u6570\u636E\u5377\uFF0C\u5192\u53F7\u524D\u662F\u5BBF\u4E3B\u673A\u7684\u76EE\u5F55\uFF0C\u5192\u53F7\u540E\u662F\u5BB9\u5668\u4E2D\u7684\u76EE\u5F55\uFF0C\u8FD9\u6837\u76F8\u5F53\u4E8E\u5C06\u5BBF\u4E3B\u673A\u4E2D\u7684\u76EE\u5F55\u6302\u8F7D\u5230\u4E86\u5BB9\u5668\u4E2D\u3002</p></li><li><p>\u521B\u5EFA\u548C\u914D\u7F6Eslave\u3002</p><div class="language-Shell ext-Shell line-numbers-mode"><pre class="language-Shell"><code>docker run -d -p 3308:3306 --name mysql-slave-1 \\
-v /root/mysql/slave-1/conf:/etc/mysql/mysql.conf.d \\
-v /root/mysql/slave-1/data:/var/lib/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 \\
--link mysql-master:mysql-master mysql:5.7

docker run -d -p 3309:3306 --name mysql-slave-2 \\
-v /root/mysql/slave-2/conf:/etc/mysql/mysql.conf.d \\
-v /root/mysql/slave-2/data:/var/lib/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 \\
--link mysql-master:mysql-master mysql:5.7

docker run -d -p 3310:3306 --name mysql-slave-3 \\
-v /root/mysql/slave-3/conf:/etc/mysql/mysql.conf.d \\
-v /root/mysql/slave-3/data:/var/lib/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 \\
--link mysql-master:mysql-master mysql:5.7

docker exec -it mysql-slave-1 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-Shell ext-Shell line-numbers-mode"><pre class="language-Shell"><code>mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 2
Server version: 5.7.23-log MySQL Community Server (GPL)
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.

mysql&gt; reset slave;
Query OK, 0 rows affected (0.02 sec)

mysql&gt; change master to master_host=&#39;mysql-master&#39;, master_user=&#39;slave&#39;, master_password=&#39;iamslave&#39;, master_log_file=&#39;mysql-bin.000003&#39;, master_log_pos=590;
Query OK, 0 rows affected, 2 warnings (0.03 sec)

mysql&gt; start slave;
Query OK, 0 rows affected (0.01 sec)

mysql&gt; show slave status\\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: mysql57
                  Master_User: slave
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000001
          Read_Master_Log_Pos: 590
               Relay_Log_File: f352f05eb9d0-relay-bin.000002
                Relay_Log_Pos: 320
        Relay_Master_Log_File: mysql-bin.000001
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
             Replicate_Do_DB:
          Replicate_Ignore_DB:
           Replicate_Do_Table:
       Replicate_Ignore_Table:
      Replicate_Wild_Do_Table:
  Replicate_Wild_Ignore_Table:
                   Last_Errno: 0
                   Last_Error:
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 590
              Relay_Log_Space: 534
              Until_Condition: None
               Until_Log_File:
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File:
           Master_SSL_CA_Path:
              Master_SSL_Cert:
            Master_SSL_Cipher:
               Master_SSL_Key:
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error:
               Last_SQL_Errno: 0
               Last_SQL_Error:
  Replicate_Ignore_Server_Ids:
             Master_Server_Id: 1
                  Master_UUID: 30c38043-ada1-11e8-8fa1-0242ac110002
             Master_Info_File: /var/lib/mysql/master.info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates
           Master_Retry_Count: 86400
                  Master_Bind:
      Last_IO_Error_Timestamp:
     Last_SQL_Error_Timestamp:
               Master_SSL_Crl:
           Master_SSL_Crlpath:
           Retrieved_Gtid_Set:
            Executed_Gtid_Set:
                Auto_Position: 0
         Replicate_Rewrite_DB:
                 Channel_Name:
           Master_TLS_Version:
1 row in set (0.00 sec)

mysql&gt; quit
Bye
exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u4E0B\u6765\u53EF\u4EE5\u5982\u6CD5\u70AE\u5236\u914D\u7F6E\u51FAslave2\u548Cslave3\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u642D\u5EFA\u8D77\u4E00\u4E2A\u201C\u4E00\u4E3B\u5E26\u4E09\u4ECE\u201D\u7684\u4E3B\u4ECE\u590D\u5236\u73AF\u5883\u3002\u4E0A\u9762\u521B\u5EFA\u521B\u5EFA\u5BB9\u5668\u65F6\u4F7F\u7528\u7684<code>--link</code>\u53C2\u6570\u7528\u6765\u914D\u7F6E\u5BB9\u5668\u5728\u7F51\u7EDC\u4E0A\u7684\u4E3B\u673A\u540D\uFF08\u7F51\u7EDC\u5730\u5740\u522B\u540D\uFF09\u3002</p></li></ol>`,4),r=[d];function a(v,m){return i(),n("div",null,r)}var t=e(l,[["render",a],["__file","MySQL\u4E3B\u4ECE\u590D\u5236.html.vue"]]);export{t as default};
