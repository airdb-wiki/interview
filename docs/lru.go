package main

import "container/list"

type LRUCache struct {
	cap int
	l   *list.List
	m   map[int]*list.Element
}

func New(cap int) LRUCache {
	return LRUCache{
		cap: cap,
		l:   new(list.List),
		m:   make(map[int]*list.Element, cap),
	}
}


func (c *LRUCache) get(key int) int {
	if node, ok := c.m[key]; ok {
		val := node.Value.(*list.Element).Value

		c.l.MoveToFront(node)
		ret val
	}
}
