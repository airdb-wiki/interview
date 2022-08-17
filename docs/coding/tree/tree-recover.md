# 恢复树以及查询

## Given a binary tree with the following rules

- root.val = 0​
- If treeNode.val == x and treeNode.left != null, then treeNode.left.val = 2 * x + 1​
- If treeNode.val == x and treeNode.right != null, then treeNode.right.val = 2 * x + 2​

Now the binary tree is reseted, which means all treeNode.val have been changed to -1.​

Implement the TreeRecover class:​
- TreeRecover(TreeNode* root) Initializes the object with a reseted binary tree and recovers it.​
- bool exists(int target) Returns true if the target value exists in the recovered binary tree.​

```go
package main

import "fmt"

type TreeNode struct {
    Val int
    Left *TreeNode
    Right *TreeNode
}

func f1(t *TreeNode, v int) {
    t.Val = v

    if t.Left != nil {
        f1(t.Left, 2 * t.Val + 1)
    }

    if t.Right != nil {
        f1(t.Right, 2 * t.Val + 2)
    }

}

func (t *TreeNode)TreeRecover() {
    f1(t, 0)
}

```