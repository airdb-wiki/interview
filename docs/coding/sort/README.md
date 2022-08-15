# 排序

[1.0 十大经典排序算法](https://www.runoob.com/w3cnote/ten-sorting-algorithm.html)


## 冒泡
```
func bubbleSort(arr []int) []int {
        length := len(arr)
        for i := 0; i < length; i++ {
                for j := 0; j < length-1-i; j++ {
                        if arr[j] > arr[j+1] {
                                arr[j], arr[j+1] = arr[j+1], arr[j]
                        }
                }
        }
        return arr
}
```

## 快速排序
```go
func quickSort(arr []int) []int {
        return _quickSort(arr, 0, len(arr)-1)
}

func _quickSort(arr []int, left, right int) []int {
        if left < right {
                partitionIndex := partition(arr, left, right)
                _quickSort(arr, left, partitionIndex-1)
                _quickSort(arr, partitionIndex+1, right)
        }
        return arr
}

func partition(arr []int, left, right int) int {
        pivot := left
        index := pivot + 1

        for i := index; i <= right; i++ {
                if arr[i] < arr[pivot] {
                        swap(arr, i, index)
                        index += 1
                }
        }
        swap(arr, pivot, index-1)
        return index - 1
}

func swap(arr []int, i, j int) {
        arr[i], arr[j] = arr[j], arr[i]
}
```
