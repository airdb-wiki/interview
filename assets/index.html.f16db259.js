import{_ as l,r as e,o as p,c as r,b as s,d as o,e as n,a as i}from"./app.b209ec3c.js";const c={},t=s("h1",{id:"\u6392\u5E8F",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u6392\u5E8F","aria-hidden":"true"},"#"),n(" \u6392\u5E8F")],-1),D={href:"https://www.runoob.com/w3cnote/ten-sorting-algorithm.html",target:"_blank",rel:"noopener noreferrer"},d=n("1.0 \u5341\u5927\u7ECF\u5178\u6392\u5E8F\u7B97\u6CD5"),y=i(`<h2 id="\u5192\u6CE1" tabindex="-1"><a class="header-anchor" href="#\u5192\u6CE1" aria-hidden="true">#</a> \u5192\u6CE1</h2><div class="language-text ext-text line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#D4D4D4;">func bubbleSort(arr []int) []int {
        length := len(arr)
        for i := 0; i &lt; length; i++ {
                for j := 0; j &lt; length-1-i; j++ {
                        if arr[j] &gt; arr[j+1] {
                                arr[j], arr[j+1] = arr[j+1], arr[j]
                        }
                }
        }
        return arr
}
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5FEB\u901F\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u6392\u5E8F" aria-hidden="true">#</a> \u5FEB\u901F\u6392\u5E8F</h2><div class="language-go ext-go line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">quickSort</span><span style="color:#D4D4D4;">(arr []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">_quickSort</span><span style="color:#D4D4D4;">(arr, </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, </span><span style="color:#DCDCAA;">len</span><span style="color:#D4D4D4;">(arr)-</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">_quickSort</span><span style="color:#D4D4D4;">(arr []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">, left, right </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> left &lt; right {</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#9CDCFE;">partitionIndex</span><span style="color:#D4D4D4;"> := </span><span style="color:#DCDCAA;">partition</span><span style="color:#D4D4D4;">(arr, left, right)</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#DCDCAA;">_quickSort</span><span style="color:#D4D4D4;">(arr, left, partitionIndex-</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#DCDCAA;">_quickSort</span><span style="color:#D4D4D4;">(arr, partitionIndex+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, right)</span></span>
<span class="line"><span style="color:#D4D4D4;">        }</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> arr</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">partition</span><span style="color:#D4D4D4;">(arr []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">, left, right </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#9CDCFE;">pivot</span><span style="color:#D4D4D4;"> := left</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#9CDCFE;">index</span><span style="color:#D4D4D4;"> := pivot + </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">i</span><span style="color:#D4D4D4;"> := index; i &lt;= right; i++ {</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> arr[i] &lt; arr[pivot] {</span></span>
<span class="line"><span style="color:#D4D4D4;">                        </span><span style="color:#DCDCAA;">swap</span><span style="color:#D4D4D4;">(arr, i, index)</span></span>
<span class="line"><span style="color:#D4D4D4;">                        index += </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">                }</span></span>
<span class="line"><span style="color:#D4D4D4;">        }</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#DCDCAA;">swap</span><span style="color:#D4D4D4;">(arr, pivot, index-</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> index - </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">swap</span><span style="color:#D4D4D4;">(arr []</span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">, i, j </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">        arr[i], arr[j] = arr[j], arr[i]</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function v(u,C){const a=e("ExternalLinkIcon");return p(),r("div",null,[t,s("p",null,[s("a",D,[d,o(a)])]),y])}var b=l(c,[["render",v],["__file","index.html.vue"]]);export{b as default};
