import{_ as a,r as e,o as c,c as i,a as n,b as t,e as p,d as l}from"./app.6e5a8480.js";const o={},d=p(`<h1 id="nginx\u4F5C\u4E3A\u8D1F\u8F7D\u5747\u8861\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#nginx\u4F5C\u4E3A\u8D1F\u8F7D\u5747\u8861\u670D\u52A1" aria-hidden="true">#</a> Nginx\u4F5C\u4E3A\u8D1F\u8F7D\u5747\u8861\u670D\u52A1</h1><h3 id="\u57FA\u672C\u914D\u7F6E\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a> \u57FA\u672C\u914D\u7F6E\u8BE6\u89E3</h3><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token comment"># \u8F6E\u8BE2\u7B56\u7565</span>
<span class="token directive"><span class="token keyword">upstream</span> backend_1</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> backend1.example.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> backend2.example.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> backend3.example.com</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># \u52A0\u6743\u8F6E\u8BE2\u7B56\u7565</span>
<span class="token directive"><span class="token keyword">upstream</span> backend_2</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> backend1.example.com weight=5</span><span class="token punctuation">;</span> <span class="token comment"># weight\u8D8A\u5927\u88AB\u8BBF\u95EE\u7684\u673A\u7387\u8D8A\u9AD8</span>
    <span class="token directive"><span class="token keyword">server</span> backend2.example.com weight=3</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> backend3.example.com</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># ip_hash</span>
<span class="token comment"># \u540C\u4E00\u4E2AIP\u6BCF\u6B21\u90FD\u662F\u8BF7\u6C42\u56FA\u5B9A\u7684\u670D\u52A1\u5668</span>
<span class="token directive"><span class="token keyword">upstream</span> backend_3</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
    
    <span class="token directive"><span class="token keyword">server</span> backend1.example.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> backend2.example.com</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># hash</span>
<span class="token comment"># \u901A\u8FC7\u81EA\u5B9A\u4E49key\u5B9E\u73B0\u8BF7\u6C42\u8C03\u5EA6</span>
<span class="token directive"><span class="token keyword">upstream</span> backend_4</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">hash</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
    
    <span class="token directive"><span class="token keyword">server</span> backend1.example.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> backend2.example.com</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">upstream</span> backend</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> backend1.example.com:8080 fail_timeout=5s</span><span class="token punctuation">;</span> <span class="token comment"># fail_timeout:\u591A\u6B21\u8BF7\u6C42\u5931\u8D25\u540E\uFF0C\u670D\u52A1\u6682\u505C\u7684\u65F6\u95F4</span>
    <span class="token directive"><span class="token keyword">server</span> 192.0.2.1 max_fails=3</span><span class="token punctuation">;</span> <span class="token comment"># max_fails:\u5141\u8BB8\u8BF7\u6C42\u5931\u8D25\u7684\u6B21\u6570</span>
    <span class="token directive"><span class="token keyword">server</span> backend2.example.com max_conns=10</span><span class="token punctuation">;</span> <span class="token comment"># max_conns:\u9650\u5236\u8FDE\u63A5\u5230\u540E\u7AEF\u670D\u52A1\u5668\u6700\u2F24\u5E76\u53D1\u6D3B\u52A8\u8FDE\u63A5\u6570</span>
	<span class="token directive"><span class="token keyword">server</span> unix:/tmp/backend3 down</span><span class="token punctuation">;</span> <span class="token comment">#down:\u5C06\u670D\u52A1\u5668\u6807\u8BB0\u4E3A\u6C38\u4E0D\u53EF\u7528</span>
    
    <span class="token directive"><span class="token keyword">server</span> backup2.example.com:8080 backup</span><span class="token punctuation">;</span> <span class="token comment"># backup:\u6807\u8BB0\u4E3A\u5907\u7528\u670D\u52A1\u5668</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
	
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://dynamic</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="\u53C2\u8003\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u94FE\u63A5" aria-hidden="true">#</a> \u53C2\u8003\u94FE\u63A5</h3>`,5),r={href:"http://nginx.org/en/docs/http/ngx_http_upstream_module.html",target:"_blank",rel:"noopener noreferrer"},k=l("ngx_http_upstream_module");function v(u,m){const s=e("ExternalLinkIcon");return c(),i("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[k,t(s)])])])])}var _=a(o,[["render",v],["__file","Nginx\u4F5C\u4E3A\u8D1F\u8F7D\u5747\u8861\u670D\u52A1.html.vue"]]);export{_ as default};
