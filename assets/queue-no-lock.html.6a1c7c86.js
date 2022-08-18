import{_ as s,o as n,c as a,a as l}from"./app.62dc178f.js";const p={},e=l(`<h1 id="\u65E0\u9501\u961F\u5217" tabindex="-1"><a class="header-anchor" href="#\u65E0\u9501\u961F\u5217" aria-hidden="true">#</a> \u65E0\u9501\u961F\u5217</h1><p>https://github.com/yireyun/go-queue</p><div class="language-go ext-go line-numbers-mode"><pre class="shiki" style="background-color:#1E1E1E;"><code><span class="line"><span style="color:#6A9955;">// esQueue</span></span>
<span class="line"><span style="color:#569CD6;">package</span><span style="color:#D4D4D4;"> queue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">import</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#CE9178;">&quot;fmt&quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#CE9178;">&quot;runtime&quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#CE9178;">&quot;sync/atomic&quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">type</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">esCache</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">struct</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	putNo </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	getNo </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	value </span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;">{}</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// lock free queue</span></span>
<span class="line"><span style="color:#569CD6;">type</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">EsQueue</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">struct</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	capaciity </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	capMod    </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	putPos    </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	getPos    </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	cache     []esCache</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">NewQueue</span><span style="color:#D4D4D4;">(capaciity </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) *EsQueue {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q</span><span style="color:#D4D4D4;"> := </span><span style="color:#DCDCAA;">new</span><span style="color:#D4D4D4;">(EsQueue)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q.capaciity</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">minQuantity</span><span style="color:#D4D4D4;">(capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q.capMod</span><span style="color:#D4D4D4;"> = q.capaciity - </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q.putPos</span><span style="color:#D4D4D4;"> = </span><span style="color:#B5CEA8;">0</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q.getPos</span><span style="color:#D4D4D4;"> = </span><span style="color:#B5CEA8;">0</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">q.cache</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">make</span><span style="color:#D4D4D4;">([]esCache, q.capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">i</span><span style="color:#D4D4D4;"> := </span><span style="color:#C586C0;">range</span><span style="color:#D4D4D4;"> q.cache {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> := &amp;q.cache[i]</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">cache.getNo</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(i)</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">cache.putNo</span><span style="color:#D4D4D4;"> = </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(i)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> := &amp;q.cache[</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">]</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">cache.getNo</span><span style="color:#D4D4D4;"> = q.capaciity</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">cache.putNo</span><span style="color:#D4D4D4;"> = q.capaciity</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> q</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">String</span><span style="color:#D4D4D4;">() </span><span style="color:#4EC9B0;">string</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> fmt.</span><span style="color:#DCDCAA;">Sprintf</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&quot;Queue{capaciity: </span><span style="color:#9CDCFE;">%v</span><span style="color:#CE9178;">, capMod: </span><span style="color:#9CDCFE;">%v</span><span style="color:#CE9178;">, putPos: </span><span style="color:#9CDCFE;">%v</span><span style="color:#CE9178;">, getPos: </span><span style="color:#9CDCFE;">%v</span><span style="color:#CE9178;">}&quot;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">		q.capaciity, q.capMod, putPos, getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Capaciity</span><span style="color:#D4D4D4;">() </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> q.capaciity</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Quantity</span><span style="color:#D4D4D4;">() </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">quantity</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPos &gt;= getPos {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">quantity</span><span style="color:#D4D4D4;"> = putPos - getPos</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">quantity</span><span style="color:#D4D4D4;"> = q.capMod + (putPos - getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> quantity</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// put queue functions</span></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Put</span><span style="color:#D4D4D4;">(val </span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;">{}) (ok </span><span style="color:#4EC9B0;">bool</span><span style="color:#D4D4D4;">, quantity </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">putPosNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> *esCache</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">capMod</span><span style="color:#D4D4D4;"> := q.capMod</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPos &gt;= getPos {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = putPos - getPos</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = capMod + (putPos - getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posCnt &gt;= capMod-</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">false</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPosNew</span><span style="color:#D4D4D4;"> = putPos + </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> !atomic.</span><span style="color:#DCDCAA;">CompareAndSwapUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos, putPos, putPosNew) {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">false</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> = &amp;q.cache[putPosNew&amp;capMod]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">getNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">putNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPosNew == putNo &amp;&amp; getNo == putNo {</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">cache.value</span><span style="color:#D4D4D4;"> = val</span></span>
<span class="line"><span style="color:#D4D4D4;">			atomic.</span><span style="color:#DCDCAA;">AddUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo, q.capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">true</span><span style="color:#D4D4D4;">, posCnt + </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">		} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">			runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		}</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// puts queue functions</span></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Puts</span><span style="color:#D4D4D4;">(values []</span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;">{}) (puts, quantity </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">putPosNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">putCnt</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">capMod</span><span style="color:#D4D4D4;"> := q.capMod</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPos &gt;= getPos {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = putPos - getPos</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = capMod + (putPos - getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posCnt &gt;= capMod-</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">capPuts</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">size</span><span style="color:#D4D4D4;"> := q.capaciity-posCnt, </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(</span><span style="color:#DCDCAA;">len</span><span style="color:#D4D4D4;">(values)); capPuts &gt;= size {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">putCnt</span><span style="color:#D4D4D4;"> = size</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">putCnt</span><span style="color:#D4D4D4;"> = capPuts</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPosNew</span><span style="color:#D4D4D4;"> = putPos + putCnt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> !atomic.</span><span style="color:#DCDCAA;">CompareAndSwapUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos, putPos, putPosNew) {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">posNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">v</span><span style="color:#D4D4D4;"> := putPos+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">); v &lt; putCnt; </span><span style="color:#9CDCFE;">posNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">v</span><span style="color:#D4D4D4;"> = posNew+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, v+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> *esCache = &amp;q.cache[posNew&amp;capMod]</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">getNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">putNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posNew == putNo &amp;&amp; getNo == putNo {</span></span>
<span class="line"><span style="color:#D4D4D4;">				</span><span style="color:#9CDCFE;">cache.value</span><span style="color:#D4D4D4;"> = values[v]</span></span>
<span class="line"><span style="color:#D4D4D4;">				atomic.</span><span style="color:#DCDCAA;">AddUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo, q.capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">				</span><span style="color:#C586C0;">break</span></span>
<span class="line"><span style="color:#D4D4D4;">			} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">				runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">			}</span></span>
<span class="line"><span style="color:#D4D4D4;">		}</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> putCnt, posCnt + putCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// get queue functions</span></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Get</span><span style="color:#D4D4D4;">() (val </span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;">{}, ok </span><span style="color:#4EC9B0;">bool</span><span style="color:#D4D4D4;">, quantity </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPosNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> *esCache</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">capMod</span><span style="color:#D4D4D4;"> := q.capMod</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPos &gt;= getPos {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = putPos - getPos</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = capMod + (putPos - getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posCnt &lt; </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;">, </span><span style="color:#569CD6;">false</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPosNew</span><span style="color:#D4D4D4;"> = getPos + </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> !atomic.</span><span style="color:#DCDCAA;">CompareAndSwapUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos, getPos, getPosNew) {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">nil</span><span style="color:#D4D4D4;">, </span><span style="color:#569CD6;">false</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> = &amp;q.cache[getPosNew&amp;capMod]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">getNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">putNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> getPosNew == getNo &amp;&amp; getNo == putNo-q.capaciity {</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">val</span><span style="color:#D4D4D4;"> = cache.value</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">cache.value</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">nil</span></span>
<span class="line"><span style="color:#D4D4D4;">			atomic.</span><span style="color:#DCDCAA;">AddUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo, q.capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> val, </span><span style="color:#569CD6;">true</span><span style="color:#D4D4D4;">, posCnt - </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">		} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">			runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		}</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// gets queue functions</span></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> (q *EsQueue) </span><span style="color:#DCDCAA;">Gets</span><span style="color:#D4D4D4;">(values []</span><span style="color:#569CD6;">interface</span><span style="color:#D4D4D4;">{}) (gets, quantity </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getPosNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">getCnt</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">uint32</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">capMod</span><span style="color:#D4D4D4;"> := q.capMod</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">putPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.putPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPos</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> putPos &gt;= getPos {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = putPos - getPos</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">posCnt</span><span style="color:#D4D4D4;"> = capMod + (putPos - getPos)</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posCnt &lt; </span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">size</span><span style="color:#D4D4D4;"> := </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(</span><span style="color:#DCDCAA;">len</span><span style="color:#D4D4D4;">(values)); posCnt &gt;= size {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">getCnt</span><span style="color:#D4D4D4;"> = size</span></span>
<span class="line"><span style="color:#D4D4D4;">	} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#9CDCFE;">getCnt</span><span style="color:#D4D4D4;"> = posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#9CDCFE;">getPosNew</span><span style="color:#D4D4D4;"> = getPos + getCnt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> !atomic.</span><span style="color:#DCDCAA;">CompareAndSwapUint32</span><span style="color:#D4D4D4;">(&amp;q.getPos, getPos, getPosNew) {</span></span>
<span class="line"><span style="color:#D4D4D4;">		runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">, posCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">posNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">v</span><span style="color:#D4D4D4;"> := getPos+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, </span><span style="color:#DCDCAA;">uint32</span><span style="color:#D4D4D4;">(</span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">); v &lt; getCnt; </span><span style="color:#9CDCFE;">posNew</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">v</span><span style="color:#D4D4D4;"> = posNew+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;">, v+</span><span style="color:#B5CEA8;">1</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#569CD6;">var</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">cache</span><span style="color:#D4D4D4;"> *esCache = &amp;q.cache[posNew&amp;capMod]</span></span>
<span class="line"><span style="color:#D4D4D4;">		</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">getNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#9CDCFE;">putNo</span><span style="color:#D4D4D4;"> := atomic.</span><span style="color:#DCDCAA;">LoadUint32</span><span style="color:#D4D4D4;">(&amp;cache.putNo)</span></span>
<span class="line"><span style="color:#D4D4D4;">			</span><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> posNew == getNo &amp;&amp; getNo == putNo-q.capaciity {</span></span>
<span class="line"><span style="color:#D4D4D4;">				values[v] = cache.value</span></span>
<span class="line"><span style="color:#D4D4D4;">				</span><span style="color:#9CDCFE;">cache.value</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">nil</span></span>
<span class="line"><span style="color:#D4D4D4;">				</span><span style="color:#9CDCFE;">getNo</span><span style="color:#D4D4D4;"> = atomic.</span><span style="color:#DCDCAA;">AddUint32</span><span style="color:#D4D4D4;">(&amp;cache.getNo, q.capaciity)</span></span>
<span class="line"><span style="color:#D4D4D4;">				</span><span style="color:#C586C0;">break</span></span>
<span class="line"><span style="color:#D4D4D4;">			} </span><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">				runtime.</span><span style="color:#DCDCAA;">Gosched</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">			}</span></span>
<span class="line"><span style="color:#D4D4D4;">		}</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> getCnt, posCnt - getCnt</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A9955;">// round \u5230\u6700\u8FD1\u76842\u7684\u500D\u6570</span></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">minQuantity</span><span style="color:#D4D4D4;">(v </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;">) </span><span style="color:#4EC9B0;">uint32</span><span style="color:#D4D4D4;"> {</span></span>
<span class="line"><span style="color:#D4D4D4;">	v--</span></span>
<span class="line"><span style="color:#D4D4D4;">	v |= v &gt;&gt; </span><span style="color:#B5CEA8;">1</span></span>
<span class="line"><span style="color:#D4D4D4;">	v |= v &gt;&gt; </span><span style="color:#B5CEA8;">2</span></span>
<span class="line"><span style="color:#D4D4D4;">	v |= v &gt;&gt; </span><span style="color:#B5CEA8;">4</span></span>
<span class="line"><span style="color:#D4D4D4;">	v |= v &gt;&gt; </span><span style="color:#B5CEA8;">8</span></span>
<span class="line"><span style="color:#D4D4D4;">	v |= v &gt;&gt; </span><span style="color:#B5CEA8;">16</span></span>
<span class="line"><span style="color:#D4D4D4;">	v++</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> v</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">func</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">Delay</span><span style="color:#D4D4D4;">(z </span><span style="color:#4EC9B0;">int</span><span style="color:#D4D4D4;">) {</span></span>
<span class="line"><span style="color:#D4D4D4;">	</span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">x</span><span style="color:#D4D4D4;"> := z; x &gt; </span><span style="color:#B5CEA8;">0</span><span style="color:#D4D4D4;">; x-- {</span></span>
<span class="line"><span style="color:#D4D4D4;">	}</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function D(c,t){return n(),a("div",null,o)}var r=s(p,[["render",D],["__file","queue-no-lock.html.vue"]]);export{r as default};
