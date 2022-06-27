import{_ as n,o as s,c as a,e}from"./app.6e5a8480.js";const i={},c=e(`<h1 id="nginx\u914D\u7F6E\u53C2\u6570\u53CA\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#nginx\u914D\u7F6E\u53C2\u6570\u53CA\u4F18\u5316" aria-hidden="true">#</a> Nginx\u914D\u7F6E\u53C2\u6570\u53CA\u4F18\u5316</h1><h2 id="nginx\u57FA\u672C\u914D\u7F6E\u4E0E\u53C2\u6570\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#nginx\u57FA\u672C\u914D\u7F6E\u4E0E\u53C2\u6570\u8BF4\u660E" aria-hidden="true">#</a> nginx\u57FA\u672C\u914D\u7F6E\u4E0E\u53C2\u6570\u8BF4\u660E</h2><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token comment"># \u8FD0\u884C\u7528\u6237</span>
<span class="token directive"><span class="token keyword">user</span> nobody</span><span class="token punctuation">;</span>

<span class="token comment"># \u542F\u52A8\u8FDB\u7A0B\u6570</span>
<span class="token comment"># \u5EFA\u8BAE\u548C\u672C\u673ACPU\u6838\u5FC3\u6570\u4FDD\u6301\u4E00\u81F4</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> 
 
<span class="token comment"># \u5168\u5C40\u9519\u8BEF\u65E5\u5FD7\u53CAPID\u6587\u4EF6</span>
<span class="token directive"><span class="token keyword">error_log</span>  logs/error.log</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  logs/error.log  notice</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  logs/error.log  info</span><span class="token punctuation">;</span>
 
<span class="token directive"><span class="token keyword">pid</span>        logs/nginx.pid</span><span class="token punctuation">;</span>

<span class="token comment"># \u5DE5\u4F5C\u6A21\u5F0F\u53CA\u8FDE\u63A5\u6570\u4E0A\u9650</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># epoll\u662F\u591A\u8DEF\u590D\u7528IO(I/O Multiplexing)\u4E2D\u7684\u4E00\u79CD\u65B9\u5F0F,</span>
    <span class="token comment"># \u4EC5\u7528\u4E8Elinux2.6\u4EE5\u4E0A\u5185\u6838,\u53EF\u4EE5\u5927\u5927\u63D0\u9AD8nginx\u7684\u6027\u80FD</span>
    <span class="token directive"><span class="token keyword">use</span>   epoll</span><span class="token punctuation">;</span> 
    
    <span class="token comment"># \u4F7F\u6BCF\u4E2Aworker\u8FDB\u7A0B\u53EF\u4EE5\u540C\u65F6\u5904\u7406\u591A\u4E2A\u5BA2\u6237\u7AEF\u8BF7\u6C42</span>
    <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span>
 
    <span class="token comment">#\u5355\u4E2A\u540E\u53F0worker process\u8FDB\u7A0B\u7684\u6700\u5927\u5E76\u53D1\u94FE\u63A5\u6570    </span>
    worker_connections  <span class="token number">1024</span></span><span class="token punctuation">;</span>
 
    <span class="token comment"># \u5E76\u53D1\u603B\u6570\u662F worker_processes \u548C worker_connections \u7684\u4E58\u79EF</span>
    <span class="token comment"># \u5373 max_clients = worker_processes * worker_connections</span>
    
    <span class="token comment"># \u5728\u8BBE\u7F6E\u4E86\u53CD\u5411\u4EE3\u7406\u7684\u60C5\u51B5\u4E0B\uFF0Cmax_clients = worker_processes * worker_connections / 4</span>

    <span class="token comment"># worker_connections \u503C\u7684\u8BBE\u7F6E\u8DDF\u7269\u7406\u5185\u5B58\u5927\u5C0F\u6709\u5173</span>
    <span class="token comment"># \u56E0\u4E3A\u5E76\u53D1\u53D7IO\u7EA6\u675F\uFF0Cmax_clients\u7684\u503C\u987B\u5C0F\u4E8E\u7CFB\u7EDF\u53EF\u4EE5\u6253\u5F00\u7684\u6700\u5927\u6587\u4EF6\u6570</span>
    <span class="token comment"># \u800C\u7CFB\u7EDF\u53EF\u4EE5\u6253\u5F00\u7684\u6700\u5927\u6587\u4EF6\u6570\u548C\u5185\u5B58\u5927\u5C0F\u6210\u6B63\u6BD4\uFF0C\u4E00\u822C1GB\u5185\u5B58\u7684\u673A\u5668\u4E0A\u53EF\u4EE5\u6253\u5F00\u7684\u6587\u4EF6\u6570\u5927\u7EA6\u662F10\u4E07\u5DE6\u53F3</span>
    <span class="token comment"># \u6211\u4EEC\u6765\u770B\u770B360M\u5185\u5B58\u7684VPS\u53EF\u4EE5\u6253\u5F00\u7684\u6587\u4EF6\u53E5\u67C4\u6570\u662F\u591A\u5C11\uFF1A</span>
    <span class="token comment"># cat /proc/sys/fs/file-max</span>
    <span class="token comment"># \u8F93\u51FA 34336</span>
    <span class="token comment"># 32000 &lt; 34336\uFF0C\u5373\u5E76\u53D1\u8FDE\u63A5\u603B\u6570\u5C0F\u4E8E\u7CFB\u7EDF\u53EF\u4EE5\u6253\u5F00\u7684\u6587\u4EF6\u53E5\u67C4\u603B\u6570\uFF0C\u8FD9\u6837\u5C31\u5728\u64CD\u4F5C\u7CFB\u7EDF\u53EF\u4EE5\u627F\u53D7\u7684\u8303\u56F4\u4E4B\u5185</span>
    <span class="token comment"># \u6240\u4EE5\uFF0Cworker_connections \u7684\u503C\u9700\u6839\u636E worker_processes \u8FDB\u7A0B\u6570\u76EE\u548C\u7CFB\u7EDF\u53EF\u4EE5\u6253\u5F00\u7684\u6700\u5927\u6587\u4EF6\u603B\u6570\u8FDB\u884C\u9002\u5F53\u5730\u8FDB\u884C\u8BBE\u7F6E</span>
    <span class="token comment"># \u4F7F\u5F97\u5E76\u53D1\u603B\u6570\u5C0F\u4E8E\u64CD\u4F5C\u7CFB\u7EDF\u53EF\u4EE5\u6253\u5F00\u7684\u6700\u5927\u6587\u4EF6\u6570\u76EE</span>
    <span class="token comment"># \u5176\u5B9E\u8D28\u4E5F\u5C31\u662F\u6839\u636E\u4E3B\u673A\u7684\u7269\u7406CPU\u548C\u5185\u5B58\u8FDB\u884C\u914D\u7F6E</span>
    <span class="token comment"># \u5F53\u7136\uFF0C\u7406\u8BBA\u4E0A\u7684\u5E76\u53D1\u603B\u6570\u53EF\u80FD\u4F1A\u548C\u5B9E\u9645\u6709\u6240\u504F\u5DEE\uFF0C\u56E0\u4E3A\u4E3B\u673A\u8FD8\u6709\u5176\u4ED6\u7684\u5DE5\u4F5C\u8FDB\u7A0B\u9700\u8981\u6D88\u8017\u7CFB\u7EDF\u8D44\u6E90\u3002</span>
    <span class="token comment"># ulimit -SHn 65535</span>
 
<span class="token punctuation">}</span>
 
 
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># \u8BBE\u5B9Amime\u7C7B\u578B,\u7C7B\u578B\u7531mime.type\u6587\u4EF6\u5B9A\u4E49</span>
    <span class="token directive"><span class="token keyword">include</span>    mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token comment"># \u8BBE\u5B9A\u65E5\u5FD7\u683C\u5F0F</span>
    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>
 
    <span class="token directive"><span class="token keyword">access_log</span>  logs/access.log  main</span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u9690\u85CFNginx\u7248\u672C\u53F7</span>
    <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
 
    <span class="token comment"># \u4F7F\u7528\u5185\u6838\u7684FD\u6587\u4EF6\u4F20\u8F93\u529F\u80FD\uFF0C\u53EF\u4EE5\u51CF\u5C11user mode\u548Ckernel mode\u7684\u5207\u6362\uFF0C\u4ECE\u800C\u63D0\u5347\u670D\u52A1\u5668\u6027\u80FD</span>
    <span class="token comment"># \u5BF9\u4E8E\u666E\u901A\u5E94\u7528\uFF0C\u5FC5\u987B\u8BBE\u4E3A on,</span>
    <span class="token comment"># \u5982\u679C\u7528\u6765\u8FDB\u884C\u4E0B\u8F7D\u7B49\u5E94\u7528\u78C1\u76D8IO\u91CD\u8D1F\u8F7D\u5E94\u7528\uFF0C\u53EF\u8BBE\u7F6E\u4E3A off\uFF0C</span>
    <span class="token comment"># \u4EE5\u5E73\u8861\u78C1\u76D8\u4E0E\u7F51\u7EDCI/O\u5904\u7406\u901F\u5EA6\uFF0C\u964D\u4F4E\u7CFB\u7EDF\u7684uptime.</span>
    <span class="token directive"><span class="token keyword">sendfile</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u5F53tcp_nopush\u8BBE\u7F6E\u4E3Aon\u65F6\uFF0C\u4F1A\u8C03\u7528tcp_cork\u65B9\u6CD5\u8FDB\u884C\u6570\u636E\u4F20\u8F93\uFF0C\u5F53\u5E94\u7528\u7A0B\u5E8F\u4EA7\u751F\u6570\u636E\u65F6\uFF0C\u5185\u6838\u4E0D\u4F1A\u7ACB\u9A6C\u5C01\u88C5\u5305\uFF0C\u800C\u662F\u5F53\u6570\u636E\u91CF\u79EF\u7D2F\u5230\u4E00\u5B9A\u91CF\u65F6\u624D\u4F1A\u5C01\u88C5\uFF0C\u7136\u540E\u4F20\u8F93\u3002</span>
    <span class="token directive"><span class="token keyword">tcp_nopush</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span>
 
    <span class="token comment"># \u5F53tcp_nodelay\u8BBE\u7F6E\u4E3Aon\u65F6\uFF0C\u4E0D\u7F13\u5B58data-sends\uFF08\u5173\u95ED Nagle \u7B97\u6CD5\uFF09,\u80FD\u591F\u63D0\u9AD8\u9AD8\u9891\u53D1\u9001\u5C0F\u6570\u636E\u62A5\u6587\u7684\u5B9E\u65F6\u6027\u3002</span>
    <span class="token directive"><span class="token keyword">tcp_nodelay</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment"># \u5173\u4E8ENagle\u7B97\u6CD5</span>
    <span class="token comment"># \u6BD4\u5982\u8981\u4F20\u8F931\u4E2A\u5B57\u8282\u7684\u6570\u636E\uFF0C\u4EE5IPv4\u4E3A\u4F8B\uFF0C\u5219\u6BCF\u4E2A\u5305\u90FD\u8981\u9644\u5E2640\u5B57\u8282\u7684\u5934\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u603B\u8BA141\u4E2A\u5B57\u8282\u7684\u6570\u636E\u91CC\uFF0C\u5176\u4E2D\u53EA\u67091\u4E2A\u5B57\u8282\u662F\u6211\u4EEC\u9700\u8981\u7684\u6570\u636E\u3002\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u51FA\u73B0\u4E86Nagle\u7B97\u6CD5\u3002\u5B83\u89C4\u5B9A\uFF1A\u5982\u679C\u5305\u7684\u5927\u5C0F\u6EE1\u8DB3MSS\uFF0C\u5219\u53EF\u4EE5\u7ACB\u5373\u53D1\u9001\uFF0C\u5426\u5219\u6570\u636E\u4F1A\u88AB\u653E\u5230\u7F13\u51B2\u533A\uFF0C\u7B49\u5230\u5DF2\u7ECF\u53D1\u9001\u7684\u5305\u88AB\u786E\u8BA4\u4E86\u4E4B\u540E\u624D\u80FD\u7EE7\u7EED\u53D1\u9001\u3002\u901A\u8FC7\u8FD9\u6837\u7684\u89C4\u5B9A\uFF0C\u53EF\u4EE5\u964D\u4F4E\u7F51\u7EDC\u91CC\u5C0F\u5305\u7684\u6570\u91CF\uFF0C\u4ECE\u800C\u63D0\u5347\u7F51\u7EDC\u6027\u80FD</span>
    
    <span class="token comment"># \u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">30</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u5B9A\u4E49\u5F53\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u5904\u4E8E\u957F\u8FDE\u63A5\u7684\u60C5\u51B5\u4E0B\uFF0C\u6BCF\u4E2A\u5BA2\u6237\u7AEF\u7684\u8BF7\u6C42\u4E0A\u9650</span>
    <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">5000</span>
        
    <span class="token comment"># \u5BA2\u6237\u7AEF\u5982\u679C\u5728\u8BE5\u6307\u5B9A\u65F6\u95F4\u5185\u6CA1\u6709\u52A0\u8F7D\u5B8Cbody\u6570\u636E\uFF0C\u5219\u65AD\u5F00\u8FDE\u63A5\uFF0C\u9ED8\u8BA460s</span>
    client_body_timeout <span class="token number">10</span>
    
    <span class="token comment"># \u670D\u52A1\u5668\u5411\u5BA2\u6237\u7AEF\u53D1\u9001\u6570\u636E\u5305\u540E\uFF0C\u5BA2\u6237\u7AEF\u5728\u4E00\u5B9A\u65F6\u95F4\u5185\u6CA1\u6709\u63A5\u6536\u6570\u636E\uFF0Cnginx\u5C06\u5173\u95ED\u8BE5\u8FDE\u63A5</span>
    send_timeout <span class="token number">3</span>
        
    <span class="token comment"># \u5F00\u542Fgzip\u538B\u7F29\u529F\u80FD</span>
    gzip  <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u8BF7\u6C42\u8D44\u6E90\u8D85\u8FC7\u8BE5\u503C\u624D\u8FDB\u884C\u538B\u7F29\uFF0C\u5355\u4F4D\uFF1A\u5B57\u8282</span>
    <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u8BBE\u7F6E\u538B\u7F29\u4F7F\u7528\u7684buffer\u5927\u5C0F\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u4E3A\u6570\u91CF\uFF0C\u7B2C\u4E8C\u4E2A\u4E3A\u6BCF\u4E2Abuffer\u7684\u5927\u5C0F</span>
    <span class="token directive"><span class="token keyword">gzip_buffers</span> <span class="token number">16</span> <span class="token number">8k</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u8BBE\u7F6E\u538B\u7F29\u7EA7\u522B\uFF0C\u8303\u56F41-9\uFF0C9\u538B\u7F29\u7EA7\u522B\u6700\u9AD8\uFF0C\u4E5F\u6700\u8017\u8D39CPU\u8D44\u6E90</span>
    <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">6</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u6307\u5B9A\u9700\u8981\u538B\u7F29\u7684\u6587\u4EF6\u7C7B\u578B</span>
    <span class="token directive"><span class="token keyword">gzip_types</span> text/plain application/x-javascript text/css application/xml image/jpeg image/gif image/png</span><span class="token punctuation">;</span>
    
    <span class="token comment"># IE1-6\u7248\u672C\u7684\u6D4F\u89C8\u5668\u4E0D\u542F\u7528\u538B\u7F29</span>
    <span class="token directive"><span class="token keyword">gzip_disable</span> <span class="token string">&quot;MSIE [1-6].&quot;</span></span><span class="token punctuation">;</span>
 
    <span class="token comment"># \u5BA2\u6237\u7AEFheader\u7684buffer\u5927\u5C0F</span>
    <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">4k</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u5BF9\u4E8E\u8F83\u5927\u7684header\u5C06\u4F7F\u7528\u8BE5\u90E8\u5206\u7684buffer\uFF0C\u4E24\u4E2A\u53C2\u6570\uFF0C\u7B2C\u4E00\u4E2A\u4E3A\u4E2A\u6570\uFF0C\u7B2C\u4E8C\u4E2A\u4E3A\u6BCF\u4E2Abuffe\u5927\u5C0F</span>
    <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">8k</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># \u5F53\u5BA2\u6237\u7AEF\u4EE5POST\u65B9\u6CD5\u63D0\u4EA4\u6570\u636E\u5230\u670D\u52A1\u7AEF\u65F6\uFF0C\u4F1A\u5148\u5199\u5165\u5230client_body_buffer\u4E2D\uFF0C\u5F53buffer\u5199\u6EE1\u4F1A\u5199\u5230\u4E34\u65F6\u6587\u4EF6</span>
    <span class="token directive"><span class="token keyword">client_body_buffer_size</span> <span class="token number">128k</span>
    
    <span class="token comment"># \u5BA2\u6237\u7AEF\u5728\u53D1\u9001\u6570\u636E\u8F83\u5927\u7684\u8BF7\u6C42\u65F6\uFF0Cclient_max_body_size\u5C06\u9650\u5236Content-Length\u6240\u793A\u503C\u7684\u5927\u5C0F\u3002\u5F53\u6570\u636E\u5927\u5C0F\u8D85\u8FC7\u8BE5\u9650\u5236\uFF0CNginx\u5728\u4E0D\u63A5\u6536\u5B8C\u6240\u6709\u6570\u636E\u7684\u60C5\u51B5\u4E0B\u5373\u53EF\u4E2D\u65AD\u8BF7\u6C42\uFF0C\u5E76\u8FD4\u56DE\u72B6\u6001\u7801413\u3002\u53C2\u6570\u8BBE\u7F6E\u4E3A0\uFF0C\u8868\u793A\u65E0\u9650\u5236\uFF0C\u5EFA\u8BAE\u53C2\u6570\u8BBE\u7F6E\u4E3A10m</span>
    client_max_body_size <span class="token number">10m</span>

 
 
    <span class="token comment"># \u8BBE\u5B9A\u865A\u62DF\u4E3B\u673A\u914D\u7F6E</span>
    server</span> <span class="token punctuation">{</span>
        <span class="token comment"># \u4FA6\u542C80\u7AEF\u53E3</span>
        <span class="token directive"><span class="token keyword">listen</span>    <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment"># \u5B9A\u4E49\u4F7F\u7528 www.nginx.cn\u8BBF\u95EE</span>
        <span class="token directive"><span class="token keyword">server_name</span>  www.nginx.cn</span><span class="token punctuation">;</span>
 
        <span class="token comment"># \u5B9A\u4E49\u670D\u52A1\u5668\u7684\u9ED8\u8BA4\u7F51\u7AD9\u6839\u76EE\u5F55\u4F4D\u7F6E</span>
        <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
 
        <span class="token comment"># \u8BBE\u5B9A\u672C\u865A\u62DF\u4E3B\u673A\u7684\u8BBF\u95EE\u65E5\u5FD7</span>
        <span class="token directive"><span class="token keyword">access_log</span>  logs/nginx.access.log  main</span><span class="token punctuation">;</span>
 
        <span class="token comment"># \u9ED8\u8BA4\u8BF7\u6C42</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token comment"># \u5B9A\u4E49\u9996\u9875\u7D22\u5F15\u6587\u4EF6\u7684\u540D\u79F0 </span>
            <span class="token directive"><span class="token keyword">index</span> index.php index.html index.htm</span><span class="token punctuation">;</span>   
 
        <span class="token punctuation">}</span>
 
        <span class="token comment"># \u5B9A\u4E49\u9519\u8BEF\u63D0\u793A\u9875\u9762</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span> /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
 
        <span class="token comment"># \u9759\u6001\u6587\u4EF6</span>
        <span class="token directive"><span class="token keyword">location</span> ~ ^/(images|javascript|js|css|flash|media|static)/</span> <span class="token punctuation">{</span>
          	<span class="token comment"># \u9759\u6001\u6587\u4EF6\u5728\u6D4F\u89C8\u5668\u7F13\u5B58\u4E2D\u7684\u8FC7\u671F\u65F6\u95F4</span>
            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 
        <span class="token comment"># PHP \u811A\u672C\u8BF7\u6C42\u5168\u90E8\u8F6C\u53D1\u5230 FastCGI\u5904\u7406. \u4F7F\u7528FastCGI\u9ED8\u8BA4\u914D\u7F6E.</span>
        <span class="token directive"><span class="token keyword">location</span> ~ .php$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">fastcgi_pass</span> 127.0.0.1:9000</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">fastcgi_index</span> index.php</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">fastcgi_param</span>  SCRIPT_FILENAME  <span class="token variable">$document_root</span><span class="token variable">$fastcgi_script_name</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">include</span> fastcgi_params</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment"># \u53CD\u5411\u4EE3\u7406</span>
        <span class="token comment"># \u540E\u7AEF\uFF08Flask\uFF09\u63A5\u53E3\u8BF7\u6C42\u8F6C\u53D1</span>
        <span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span>
            
        <span class="token comment"># DemoBackend\u6CA1\u6709\u659C\u6760\u7684\u8BDD\u4F1A\u5BFC\u81F4404</span>
	    <span class="token directive"><span class="token keyword">proxy_pass</span> http://DemoBackend/</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_redirect</span>  <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>  Host  <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Real-IP  <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
	
	    <span class="token directive"><span class="token keyword">include</span> uwsgi_params</span><span class="token punctuation">;</span>
	    <span class="token directive"><span class="token keyword">uwsgi_pass</span> 127.0.0.1:5000</span><span class="token punctuation">;</span>
	    <span class="token directive"><span class="token keyword">uwsgi_read_timeout</span> <span class="token number">20s</span></span><span class="token punctuation">;</span>
	    <span class="token directive"><span class="token keyword">uwsgi_send_timeout</span> <span class="token number">20s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">20s</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">20s</span></span><span class="token punctuation">;</span>
      
    <span class="token punctuation">}</span>
 
        <span class="token comment"># \u7981\u6B62\u8BBF\u95EE .htxxx \u6587\u4EF6</span>
            <span class="token directive"><span class="token keyword">location</span> ~ /.ht</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 
    <span class="token punctuation">}</span>
    
    <span class="token comment"># HTTPS\u914D\u7F6E</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  www.nginx.cn</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">charset</span>     utf-8</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/conf.d/www.nginx.cn.pem</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/conf.d/www.nginx.cn.key</span><span class="token punctuation">;</span>
        <span class="token comment"># \u4F1A\u8BDD\u7F13\u5B58</span>
        <span class="token directive"><span class="token keyword">ssl_session_cache</span>   shared:SSL:10m</span><span class="token punctuation">;</span>
       	<span class="token comment"># \u4F1A\u8BDD\u8D85\u65F6\u65F6\u95F4</span>
        <span class="token directive"><span class="token keyword">ssl_session_timeout</span> <span class="token number">5m</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_ciphers</span> ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1 TLSv1.1 TLSv1.2</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
		
        <span class="token comment"># \u8BE5\u8BBE\u7F6E\u5C06\u53EA\u5141\u8BB8\u4F7F\u7528\u57DF\u540D\u8BBF\u95EE</span>
        <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$host</span> != <span class="token string">&#39;www.nginx.cn&#39;</span>)</span><span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">return</span> <span class="token number">404</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">alias</span> /www/</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
    
    <span class="token comment"># \u7B80\u5355\u7684\u8D1F\u8F7D\u5747\u8861\u8282\u70B9\u914D\u7F6E</span>
    <span class="token directive"><span class="token keyword">upstream</span> DemoBackend</span> <span class="token punctuation">{</span>
     <span class="token directive"><span class="token keyword">server</span> 192.168.10.1</span><span class="token punctuation">;</span>
     <span class="token directive"><span class="token keyword">server</span> 192.168.10.2</span><span class="token punctuation">;</span>
     <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[c];function p(t,o){return s(),a("div",null,l)}var r=n(i,[["render",p],["__file","Nginx\u914D\u7F6E\u53C2\u6570\u53CA\u4F18\u5316.html.vue"]]);export{r as default};
