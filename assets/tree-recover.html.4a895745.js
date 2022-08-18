import{_ as s,o as n,c as e,a}from"./app.a9cca246.js";const l={},p=a(`<h1 id="\u6062\u590D\u6811\u4EE5\u53CA\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u6062\u590D\u6811\u4EE5\u53CA\u67E5\u8BE2" aria-hidden="true">#</a> \u6062\u590D\u6811\u4EE5\u53CA\u67E5\u8BE2</h1><h2 id="given-a-binary-tree-with-the-following-rules" tabindex="-1"><a class="header-anchor" href="#given-a-binary-tree-with-the-following-rules" aria-hidden="true">#</a> Given a binary tree with the following rules</h2><ul><li>root.val = 0\u200B</li><li>If treeNode.val == x and treeNode.left != null, then treeNode.left.val = 2 * x + 1\u200B</li><li>If treeNode.val == x and treeNode.right != null, then treeNode.right.val = 2 * x + 2\u200B</li></ul><p>Now the binary tree is reseted, which means all treeNode.val have been changed to -1.\u200B</p><p>Implement the TreeRecover class:\u200B</p><ul><li>TreeRecover(TreeNode* root) Initializes the object with a reseted binary tree and recovers it.\u200B</li><li>bool exists(int target) Returns true if the target value exists in the recovered binary tree.\u200B</li></ul><div class="language-go ext-go line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#569CD6;">package</span><span style="color:#D4D4D4;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">import</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">type</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">TreeNode</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">struct</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">    Val </span><span style="color:#4EC9B0;">int</span></span>
<span class="line"><span style="color:#D4D4D4;">    Left *TreeNode</span></span>
<span class="line"><span style="color:#D4D4D4;">    Right *TreeNode</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">f1</span><span style="color:#D4D4D4;">(t *TreeNode, v </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">t.Val</span><span style="color:#D4D4D4;"> = v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> t.Left != </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#DCDCAA;">f1</span><span style="color:#D4D4D4;">(t.Left, </span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;"> * t.Val + </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> t.Right != </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#DCDCAA;">f1</span><span style="color:#D4D4D4;">(t.Right, </span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;"> * t.Val + </span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (t *TreeNode)</span><span style="color:#DCDCAA;">TreeRecover</span><span style="color:#D4D4D4;">() {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#DCDCAA;">f1</span><span style="color:#D4D4D4;">(t, </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[p];function i(r,t){return n(),e("div",null,o)}var D=s(l,[["render",i],["__file","tree-recover.html.vue"]]);export{D as default};
