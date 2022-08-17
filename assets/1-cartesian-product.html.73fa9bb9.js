import{_ as n,o as r,c as t,a as o}from"./app.b209ec3c.js";const a={},i=o(`<h1 id="\u6C42\u7B1B\u5361\u5C14\u79EF" tabindex="-1"><a class="header-anchor" href="#\u6C42\u7B1B\u5361\u5C14\u79EF" aria-hidden="true">#</a> \u6C42\u7B1B\u5361\u5C14\u79EF</h1><h2 id="q-\u6C42-a-b-x-y-1-2-3-\u7684\u8FEA\u5361\u5C14\u79EF\u3002" tabindex="-1"><a class="header-anchor" href="#q-\u6C42-a-b-x-y-1-2-3-\u7684\u8FEA\u5361\u5C14\u79EF\u3002" aria-hidden="true">#</a> Q: \u6C42 [&quot;a&quot;, &quot;b&quot;], [&quot;x&quot;, &quot;y&quot;], [1, 2, 3] \u7684\u8FEA\u5361\u5C14\u79EF\u3002</h2><h3 id="_1-python-\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#_1-python-\u7248\u672C" aria-hidden="true">#</a> 1. python \u7248\u672C</h3><pre><code>#!/usr/bin/env python
#-*-coding:utf-8-*-

import itertools

a = [&quot;a&quot;, &quot;b&quot;]
b = [&quot;x&quot;, &quot;y&quot;]
c = [1, 2, 3]

# \u8BA1\u7B97\u7B1B\u5361\u5C14\u79EF
# Param : \u4EE5\u5355\u4E2A\u96C6\u5408(\u6570\u7EC4)\u4F5C\u4E3A\u53C2\u6570\uFF0C\u53EF\u4EE5\u652F\u6301\u53D8\u957F\u53C2\u6570\uFF0C\u5373\u591A\u4E2A\u96C6\u5408\u3002
# Return: \u8FD4\u56DE\u7EC4\u5408\u7684\u4E2A\u6570\u53CA\u5BF9\u5E94\u7684\u6570\u7EC4\u96C6\u5408
def combination(*array):
  # \u9519\u8BEF\u5904\u7406, \u5982\u679C\u5F53\u53EA\u6709\u4E00\u4E2A\u96C6\u5408\u8FDB\u884C\u8BA1\u7B97\uFF0C\u5219\u629B\u51FA\u5F02\u5E38
  if len(array) &lt; 2:
    raise ValueError(&quot;\u81F3\u5C11\u67092\u4E2A\u96C6\u5408&quot;)
  if len(array) &gt; 12:
    print(&quot;\u6570\u636E\u91CF\u8F83\u5927\uFF0C\u751F\u6210\u96C6\u5408\u8017\u65F6\u8F83\u957F, \u8BF7\u8010\u5FC3\u7B49\u5F85&quot;)

  count = 0
  items = []
  for item in itertools.product(*array):
    count += 1
    print item
    items.append(item)
  return (count, items)

if __name__ == &#39;__main__&#39; :
  print &quot;\u7B1B\u5361\u5C14\u79EF\uFF1A&quot;

  # \u5982\u679C\u6709\u591A\u5C11\u96C6\u5408\u6570\u636E\uFF0C\u53EF\u4EE5&#39;,&#39; \u5206\u9694\u4F5C\u4E3A\u53C2\u6570\u4F20\u9012\u7ED9\u51FD\u6570combination(), \u5982combination(a1, a2, a3, a4, ...)
  # count, items = combination(a, b, c, a, b, c, a, b, c, a, b, c)
  # count, items = combination(a)
  count, items = combination(a, b, c)
  print &quot;\u6B64\u7B1B\u5361\u5C14\u79EF\u7EC4\u5408\u4E3A: &quot;, items
  print &quot;\u5171\u6709 %d \u4E2A\u7EC4\u5408&quot; % (count)
</code></pre><h3 id="_2-golang-\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#_2-golang-\u7248\u672C" aria-hidden="true">#</a> 2. golang \u7248\u672C</h3><pre><code>package main

import (
    &quot;errors&quot;
    &quot;fmt&quot;
)

// \u9012\u5F52\u4E0B\u4E00\u4E2A index
func NextIndex(idx []int, lenArr []int) {
    j := len(idx) - 1
    for ; j &gt;= 0; j-- {
        fmt.Println(&quot;debug========:&quot;, j, idx)
        idx[j]++
        fmt.Println(&quot;debug========:&quot;, j, idx)
        if j == 0 || idx[j] &lt; lenArr[j] {
            return
        }
        // \u9996\u6B21\u8FD4\u56DE0\u4E0B\u6807
        idx[j] = 0
    }
}

func Combination(arr ...[]string) (count int, arrList [][]string, err error) {
    // \u9519\u8BEF\u5904\u7406, \u5C11\u4E8E2\u4E2A\u96C6\u5408\u5219\u9519\u8BEF\u8FD4\u56DE\u3002
    if len(arr) &lt; 2 {
        fmt.Println(&quot;\u81F3\u5C11\u67092\u4E2A\u96C6\u5408&quot;)
        errors.New(&quot;\u81F3\u5C11\u67092\u4E2A\u96C6\u5408&quot;)
        count = -1
        return
    }

    // \u5C06\u6BCF\u4E00\u4E2A\u96C6\u5408\u7684\u957F\u5EA6\u8BB0\u5F55\u4E0B\u6765, \u5E76\u5B58\u653E\u5728\u6570\u7EC4\u4E2D
    lenArray := []int{}
    for index, _ := range arr {
        lenArray = append(lenArray, len(arr[index]))
    }

    // \u6784\u9020\u7D22\u5F15\u6570\u7EC4, \u5E76\u521D\u59CB\u5316[], \u503C\u4E3A0
    idx := make([]int, len(arr))

    // \u7D22\u5F15\u6570\u7EC4\u4E2D\u7D22\u5F15\u5C0F\u4E8E\u96C6\u5408\u957F\u5EA6\u8FDB\u884C\u5FAA\u73AF, \u4ECE\u53F3\u5F80\u5DE6\u4F9D\u6B21\u589E\u52A0\u4E0B\u6807idx\u6570\u503C\uFF0C\u5B9E\u73B0\u904D\u5386\u3002
    for ; idx[0] &lt; lenArray[0]; NextIndex(idx, lenArray) {
        var r []string

        for j, k := range idx {
            fmt.Println(&quot;debug2======&quot;, r, j, k, idx)
            // \u4F9D\u6B21\u5408\u5E76\u76F8\u90BB\u96C6\u5408\uFF0C\u6700\u7EC8\u6240\u6709\u5143\u7D20\u5B58\u653E\u5728r\u6570\u7EC4\u4E2D
            r = append(r, arr[j][k])
        }
        fmt.Println(r)
        arrList = append(arrList, r)
    }
    count = len(arrList)
    return
}

func main() {
    arr1 := []string{&quot;a&quot;, &quot;b&quot;}
    arr2 := []string{&quot;x&quot;, &quot;y&quot;}
    arr3 := []string{&quot;1&quot;, &quot;2&quot;, &quot;3&quot;}

    // Combination(arr1, arr2, arr3, arr1)
    count, arrList, err := Combination(arr1, arr2, arr3, arr1)
    // count, arrList, err := Combination(arr1)
    if err == nil {
        fmt.Printf(&quot;\u7B1B\u5361\u5C14\u79EF\u7EC4\u5408\u4E3A\uFF1A%s, \u5171\u6709\uFF1A%d \u4E2A\u7EC4\u5408\\n&quot;, arrList, count)
    }
}
</code></pre>`,6),e=[i];function u(d,c){return r(),t("div",null,e)}var s=n(a,[["render",u],["__file","1-cartesian-product.html.vue"]]);export{s as default};
