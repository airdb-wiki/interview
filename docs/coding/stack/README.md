# Stack 栈

## 题目 - 1249. 移除无效的括号

https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/

给你一个由 '('、')' 和小写字母组成的字符串 s。

你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。

请返回任意一个合法字符串。

有效「括号字符串」应当符合以下 任意一条 要求：

空字符串或只包含小写字母的字符串
可以被写作 AB（A 连接 B）的字符串，其中 A 和 B 都是有效「括号字符串」
可以被写作 (A) 的字符串，其中 A 是一个有效的「括号字符串」

- 像这种括号匹配的题目基本都需要用栈来处理。
因为所有右括号都是与最近的左括号匹配的，所以可以用栈来记录所有未匹配的左括号。

时间复杂度：O(n)
空间复杂度：O(n)




```go
func minRemoveToMakeValid(s string) string {
    // available[i] 表示 s[i] 是否合法，初始化均不合法
    available := make([]bool, len(s))
    // stack 存储当前可供匹配的左括号
    stack := make([]int, 0)
    // 带下标遍历 s 中的每一个字符
    for i, ch := range s {
        // 根据字符种类进行不同处理
        if ch == '(' {
            // 如果是左括号，则直接把当前下标压入栈中，
            // 因为当前左括号可能会与后续的右括号匹配
            stack = append(stack, i)
        } else if ch == ')' {
            // 如果是右括号，此时若栈中还有左括号，
            // 则当前括号对合法
            if len(stack) > 0 {
                // 标记左括号合法
                available[stack[len(stack)-1]] = true
                // 标记右括号合法
                available[i] = true
                // 弹出该左括号的下标 j
                stack = stack[:len(stack)-1]
            }
        } else {
            // 如果是其他字符，则必定合法，标记即可
            available[i] = true
        }
    }

    // ans 收集所有合法的字符
    ans := bytes.Buffer{}
    // 遍历 s 中的每一个字符
    for i, ch := range s {
        // 如果该字符合法，则放入 ans 中
        if available[i] {
            ans.WriteRune(ch)
        }
    }

    // 返回 ans 中的字符串
    return ans.String()
}
```
