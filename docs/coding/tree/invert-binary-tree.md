# 反转二叉树 Invert Binary Tree

https://leetcode.com/problems/invert-binary-tree/

```go
// Definition for a binary tree node.
 type TreeNode struct {
      Val int
      Left *TreeNode
      Right *TreeNode
  }

func invertTree(root *TreeNode) *TreeNode {
    
    dfs(root)
    return root
   
}

func dfs(root *TreeNode){
    if root == nil{
        return 
    }
    
    if root.Left != nil{
        dfs(root.Left)
    }
    
    if root.Right != nil{
        dfs(root.Right)
    }
    
    root.Left, root.Right = root.Right, root.Left
}
```