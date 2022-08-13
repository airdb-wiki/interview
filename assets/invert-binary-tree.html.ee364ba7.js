import{_ as s,o as n,c as a,a as l}from"./app.036cdc84.js";const e={},p=l(`<h1 id="\u53CD\u8F6C\u4E8C\u53C9\u6811-invert-binary-tree" tabindex="-1"><a class="header-anchor" href="#\u53CD\u8F6C\u4E8C\u53C9\u6811-invert-binary-tree" aria-hidden="true">#</a> \u53CD\u8F6C\u4E8C\u53C9\u6811 Invert Binary Tree</h1><p>https://leetcode.com/problems/invert-binary-tree/</p><div class="language-go ext-go line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// Definition for a binary tree node.</span></span>
<span class="line"><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">type</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">TreeNode</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">struct</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">      Val </span><span style="color:#4EC9B0;">int</span></span>
<span class="line"><span style="color:#D4D4D4;">      Left *TreeNode</span></span>
<span class="line"><span style="color:#D4D4D4;">      Right *TreeNode</span></span>
<span class="line"><span style="color:#D4D4D4;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">invertTree</span><span style="color:#D4D4D4;">(root *TreeNode) *TreeNode {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">dfs</span><span style="color:#D4D4D4;">(root)</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> root</span></span>
<span class="line"><span style="color:#D4D4D4;">   </span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">dfs</span><span style="color:#D4D4D4;">(root *TreeNode){</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> root == </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> root.Left != </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#DCDCAA;">dfs</span><span style="color:#D4D4D4;">(root.Left)</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> root.Right != </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;">{</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#DCDCAA;">dfs</span><span style="color:#D4D4D4;">(root.Right)</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">root.Left</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">root.Right</span><span style="color:#D4D4D4;"> = root.Right, root.Left</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[p];function r(i,c){return n(),a("div",null,o)}var t=s(e,[["render",r],["__file","invert-binary-tree.html.vue"]]);export{t as default};
