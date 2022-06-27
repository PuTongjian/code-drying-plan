import{_ as e,r as t,o as p,c as i,a as n,b as c,e as o,d as s}from"./app.6e5a8480.js";const l={},d=o(`<h1 id="nginx\u4F5C\u4E3A\u9759\u6001\u8D44\u6E90web\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#nginx\u4F5C\u4E3A\u9759\u6001\u8D44\u6E90web\u670D\u52A1" aria-hidden="true">#</a> Nginx\u4F5C\u4E3A\u9759\u6001\u8D44\u6E90web\u670D\u52A1</h1><h3 id="\u57FA\u672C\u914D\u7F6E\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a> \u57FA\u672C\u914D\u7F6E\u8BE6\u89E3</h3><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span> mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>    application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
        <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
        <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>
    
    <span class="token directive"><span class="token keyword">sendfile</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>  <span class="token comment"># \u4F5C\u7528\uFF1A\u63D0\u5347\u6587\u4EF6\u4F20\u8F93\u6027\u80FD</span>
                  <span class="token comment"># \u539F\u7406\uFF1Asendfile\u4E3Aoff\u65F6\uFF1A</span>
                  <span class="token comment">#                       \u5728\u5BF9\u4E00\u4E2A\u6587\u4EF6\u8FDB\u884C\u4F20\u8F93\u65F6\uFF0C\u6D41\u7A0B\u5982\u4E0B</span>
                  <span class="token comment">#                       \u786C\u76D8\u2014&gt;\u5185\u6838buf\u2014&gt;\u7528\u6237buf\u2014&gt;socket\u76F8\u5173\u7F13\u51B2\u533A\u2014&gt;\u534F\u8BAE\u5F15\u64CE</span>
                  <span class="token comment">#       sendfile\u4E3Aon\u65F6\uFF1A</span>
                  <span class="token comment">#                       \u786C\u76D8\u2014&gt;\u5185\u6838buf\u2014&gt;\u534F\u8BAE\u5F15\u64CE</span>
    
    <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u5728\u5EFA\u7ACB\u5957\u63A5\u5B57\u8FDE\u63A5\u65F6\u542F\u7528Linux\u7684TCP_CORK\uFF0C\u5373\u5728TCP\u4EA4\u4E92\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u6570\u636E\u5305\u4E0D\u4F1A</span>
                   <span class="token comment">#       \u7ACB\u523B\u4F20\u8F93\uFF0C\u800C\u662F\u7B49\u5230\u6570\u636E\u5305\u6700\u5927\u65F6\uFF0C\u4E00\u6B21\u6027\u4F20\u8F93\uFF0C\u4ECE\u800C\u51CF\u5C11\u7F51\u7EDC\u62E5\u585E\u3002</span>
                   <span class="token comment"># \u5907\u6CE8\uFF1A\u9700\u5F00\u542Fsendfile\u65F6\u624D\u751F\u6548</span>
    
    <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u6570\u636E\u5305\u4E0D\u7B49\u5F85\uFF0C\u5B9E\u65F6\u53D1\u9001\u7ED9\u7528\u6237\uFF08Keepalive\u8FDE\u63A5\u4E0B\u751F\u6548\uFF09</span>
                    <span class="token comment"># \u5907\u6CE8\uFF1A\u540C\u65F6\u6253\u5F00tcp_nopush\u548Ctcp_nodelay\u5E76\u4E0D\u51B2\u7A81\uFF0C\u4E14\u6709\u4EE5\u4E0B\u6548\u679C</span>
                    <span class="token comment">#       1\u3001\u786E\u4FDD\u6570\u636E\u5305\u5728\u53D1\u9001\u7ED9\u5BA2\u6237\u4E4B\u524D\u662F\u6EE1\u7684</span>
   	                <span class="token comment">#       2\u3001\u5BF9\u4E8E\u6700\u540E\u4E00\u4E2A\u6570\u636E\u5305\uFF0C\u5141\u8BB8TCP\u7ACB\u5373\u53D1\u9001\uFF0C\u6CA1\u6709\u5EF6\u8FDF</span>
    
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span> www.a.com</span><span class="token punctuation">;</span>
        
        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(jpg|gif|png)$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u5BF9\u4F20\u8F93\u7684\u6570\u636E\u8FDB\u884C\u538B\u7F29\uFF0C\u63D0\u9AD8\u4F20\u8F93\u901F\u7387\uFF0C\u5E76\u8282\u7701\u7F51\u7EDC\u5E26\u5BBD\u8D44\u6E90</span>
            <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1Agzip\u534F\u8BAE\u7248\u672C\u914D\u7F6E</span>
            <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">5</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u538B\u7F29\u7B49\u7EA7\u914D\u7F6E\u3002\u7B49\u7EA71-9\uFF0C\u7B49\u7EA7\u8D8A\u9AD8\u538B\u7F29\u6548\u679C\u8D8A\u597D\uFF0C\u4F46\u5BF9CPU\u7684\u8D44\u6E90\u6D88\u8017\u4E5F\u8D8A\u591A</span>
            <span class="token directive"><span class="token keyword">gzip_min_length</span> <span class="token number">100k</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u914D\u7F6E\u5141\u8BB8\u538B\u7F29\u7684\u6700\u5C0F\u5B57\u8282\u6570\uFF0C\u5373\u6587\u4EF6\u5927\u5C0F\u5C0F\u4E8E\u8BE5\u503C\uFF0C\u5219\u4E0D\u5BF9\u5176\u8FDB\u884C\u538B\u7F29</span>
            <span class="token directive"><span class="token keyword">gzip_types</span> text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">root</span>  /opt/app/images</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token directive"><span class="token keyword">location</span> ~ ^/download</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">gzip_static</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u4E0Egzip\u52A8\u6001\u538B\u7F29\u76F8\u53CD\uFF0Cgzip_static\u662F\u9759\u6001\u538B\u7F29\uFF0C\u5982\u679C\u6587\u4EF6\u4E2D\u5B58\u5728&#39;.gz&#39;\u7684\u4E0E\u538B\u7F29</span>
           	                <span class="token comment">#       \u6587\u4EF6\uFF0C\u5219\u76F4\u63A5\u8FD4\u56DE\u3002\u76F8\u8F83\u52A8\u6001\u538B\u7F29\u66F4\u8282\u7701CPU\u8D44\u6E90\u3002</span>
            <span class="token directive"><span class="token keyword">root</span>  /opt/app/static</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(htm|html)$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span> <span class="token number">24h</span></span><span class="token punctuation">;</span> <span class="token comment"># \u4F5C\u7528\uFF1A\u914D\u7F6E\u6587\u4EF6\u8FC7\u671F\u65F6\u95F4\uFF0C\u672A\u8FC7\u671F\u5219\u76F4\u63A5\u4ECE\u7F13\u5B58\u4E2D\u8BFB\u53D6</span>
            <span class="token directive"><span class="token keyword">root</span> /opt/app/www</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment"># \u8DE8\u57DF\u8BBF\u95EE\u573A\u666F\u914D\u7F6E</span>
        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(htm|html)$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Origin http://www.b.com</span><span class="token punctuation">;</span> <span class="token comment"># \u5907\u6CE8\uFF1A\`*\` \u8868\u793A\u5141\u8BB8\u6240\u6709\u7AD9\u70B9\u90FD\u53EF\u8FDB\u884C\u8DE8\u57DF\u8BBF\u95EE</span>
            <span class="token directive"><span class="token keyword">add_header</span> Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">root</span> /opt/app/www</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment"># \u9632\u76D7\u94FE\u914D\u7F6E</span>
        <span class="token directive"><span class="token keyword">location</span> ~*\\.(gif|jpg)$</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">valid_referers</span> none blocked www.imcati.com</span><span class="token punctuation">;</span> <span class="token comment"># \u5907\u6CE8: none--\u8868\u793A\u5141\u8BB8\u8BF7\u6C42\u5934\u4E2D\u7F3A\u5C11&quot;Referer&quot;\u5B57\u6BB5</span>
                                                        <span class="token comment">#       blocked--\u8BF7\u6C42\u5934\u4E2D\u5B58\u5728&quot;Referer&quot;\u5B57\u6BB5\uFF0C\u4F46</span>
                                                        <span class="token comment">#       \u5176\u503C\u5DF2\u88AB\u9632\u706B\u5899\u6216\u4EE3\u7406\u670D\u52A1\u5668\u5220\u9664\uFF0C\u8FD9\u4E9B\u503C\u4E0D</span>
                                                        <span class="token comment">#       \u662F\u4EE5&quot;http://&quot;\u6216&quot;https://&quot;\u5F00\u5934\u7684\u5B57\u7B26\u4E32,</span>
                                                        <span class="token comment">#       \u8BE5\u60C5\u51B5\u5C06\u88AB\u5141\u8BB8</span>
                                                        <span class="token comment">#       server_names--&quot;Referer&quot;\u5B57\u6BB5\u4E0Eserver_name</span>
                                                        <span class="token comment">#       \u76F8\u540C\u5219\u5141\u8BB8\u8BBF\u95EE</span>
            <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>\u53C2\u8003\u94FE\u63A5</p>`,5),r={href:"http://nginx.org/en/docs/http/ngx_http_secure_link_module.html",target:"_blank",rel:"noopener noreferrer"},u=s("Module ngx_http_secure_link_module"),v=s(" \u7528\u4E8E\u68C0\u67E5\u8BF7\u6C42\u94FE\u63A5\u7684\u771F\u5B9E\u6027\uFF0C\u4FDD\u62A4\u8D44\u6E90\u514D\u53D7\u672A\u7ECF\u6388\u6743\u7684\u8BBF\u95EE\u5E76\u9650\u5236\u94FE\u63A5\u7684\u751F\u547D\u5468\u671F");function k(m,b){const a=t("ExternalLinkIcon");return p(),i("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[u,c(a)]),v])])])}var w=e(l,[["render",k],["__file","Nginx\u4F5C\u4E3A\u9759\u6001\u8D44\u6E90web\u670D\u52A1.html.vue"]]);export{w as default};
