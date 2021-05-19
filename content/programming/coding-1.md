# 编程

## Q: 求 ["a", "b"], ["x", "y"], [1, 2, 3] 的迪卡尔积。

### 1. python 版本
    #!/usr/bin/env python
    #-*-coding:utf-8-*-

    import itertools

    a = ["a", "b"]
    b = ["x", "y"]
    c = [1, 2, 3]

    # 计算笛卡尔积
    # Param : 以单个集合(数组)作为参数，可以支持变长参数，即多个集合。
    # Return: 返回组合的个数及对应的数组集合
    def combination(*array):
      # 错误处理, 如果当只有一个集合进行计算，则抛出异常
      if len(array) < 2:
        raise ValueError("至少有2个集合")
      if len(array) > 12:
        print("数据量较大，生成集合耗时较长, 请耐心等待")

      count = 0
      items = []
      for item in itertools.product(*array):
        count += 1
        print item
        items.append(item)
      return (count, items)

    if __name__ == '__main__' :
      print "笛卡尔积："

      # 如果有多少集合数据，可以',' 分隔作为参数传递给函数combination(), 如combination(a1, a2, a3, a4, ...)
      # count, items = combination(a, b, c, a, b, c, a, b, c, a, b, c)
      # count, items = combination(a)
      count, items = combination(a, b, c)
      print "此笛卡尔积组合为: ", items
      print "共有 %d 个组合" % (count)

### 2. golang 版本

    package main

    import (
        "errors"
        "fmt"
    )

    // 递归下一个 index
    func NextIndex(idx []int, lenArr []int) {
        j := len(idx) - 1
        for ; j >= 0; j-- {
            fmt.Println("debug========:", j, idx)
            idx[j]++
            fmt.Println("debug========:", j, idx)
            if j == 0 || idx[j] < lenArr[j] {
                return
            }
            // 首次返回0下标
            idx[j] = 0
        }
    }

    func Combination(arr ...[]string) (count int, arrList [][]string, err error) {
        // 错误处理, 少于2个集合则错误返回。
        if len(arr) < 2 {
            fmt.Println("至少有2个集合")
            errors.New("至少有2个集合")
            count = -1
            return
        }

        // 将每一个集合的长度记录下来, 并存放在数组中
        lenArray := []int{}
        for index, _ := range arr {
            lenArray = append(lenArray, len(arr[index]))
        }

        // 构造索引数组, 并初始化[], 值为0
        idx := make([]int, len(arr))

        // 索引数组中索引小于集合长度进行循环, 从右往左依次增加下标idx数值，实现遍历。
        for ; idx[0] < lenArray[0]; NextIndex(idx, lenArray) {
            var r []string

            for j, k := range idx {
                fmt.Println("debug2======", r, j, k, idx)
                // 依次合并相邻集合，最终所有元素存放在r数组中
                r = append(r, arr[j][k])
            }
            fmt.Println(r)
            arrList = append(arrList, r)
        }
        count = len(arrList)
        return
    }

    func main() {
        arr1 := []string{"a", "b"}
        arr2 := []string{"x", "y"}
        arr3 := []string{"1", "2", "3"}

        // Combination(arr1, arr2, arr3, arr1)
        count, arrList, err := Combination(arr1, arr2, arr3, arr1)
        // count, arrList, err := Combination(arr1)
        if err == nil {
            fmt.Printf("笛卡尔积组合为：%s, 共有：%d 个组合\n", arrList, count)
        }
    }

