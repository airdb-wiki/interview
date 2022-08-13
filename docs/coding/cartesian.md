# Cartesian Product - 笛卡尔积


```go
package main
 
import (
    "fmt"
)
 
var a = map[string][]string{
    "1" : []string{"a","b","c"},
    "2": []string{"d", "f", "g"},
    "3":[]string{"k","v","s"},
}
 
func main() {
    fmt.Println(Print("123"))
}
 
func Print(str string)(res []string){
    baseSlices := [][]string{}
    for i := 0; i< len(str); i++{
        baseSlices = append(baseSlices, a[string(str[i])])
    }
    res = baseSlices[0]
 
    for _,v := range baseSlices[1:]{
        res = MakeData(res, v)
    }
 
    return
}
 
func MakeData(base []string, makeData []string) (str []string) {
    for _,v := range base{
        for _,makeDataValue :=  range makeData {
            str = append(str, v+makeDataValue)
        }
    }
    return
}
```


## 思路：

第一步 a  b  c  三个

第二步  ad  af   ag    bd  bf bg   cd cf cg

第三步  adk adv ads afk afv afs agk agv ags bdk bdv bds bfk bfv bfs bgk bgv bgs cdk cdv cds cfk cfv cfs cgk cgv cgs

其实不难理解

1.第一次先拿出第一组数据 和第二组数据组合组合成新的数组 也就是组合成第二步

2.组合成的第二步数据 继续和下一组数据继续组合
