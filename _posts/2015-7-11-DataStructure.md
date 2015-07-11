---
layout: post
title: "二叉树的遍历 "
date: 2015-7-11
categories: 数据结构
tags: [数据结构，二叉树]
---
二叉树的遍历

<!-- more -->

遍历即将树的所有结点访问且仅访问一次。按照根节点位置的不同分为前序遍历，中序遍历，后序遍历。

前序遍历：根节点->左子树->右子树

中序遍历：左子树->根节点->右子树

后序遍历：左子树->右子树->根节点

具体实例如下：


![](http://img-storage.qiniudn.com/15-7-11/45724670.jpg)


![](http://img-storage.qiniudn.com/15-7-11/99941943.jpg)


![](http://img-storage.qiniudn.com/15-7-11/87786522.jpg)


###二叉树遍历的代码实现：
    package com.kiritor;  
  
    
    //Java二叉树的实现 以及遍历 

    public class BinaryTree {  
      
    /** 
       输出结点信息*/  
    public void printNode(TreeNode<String> node)  
    {  
        System.out.print(node.getData()+"  ");  
    }  
    /** 
     定义结点 
     * */  
    class TreeNode<T> {  
        private T data;  
        private TreeNode<T> leftNode;  
        private TreeNode<T> rightNode;  
  
        public TreeNode(T data, TreeNode<T> leftNode, TreeNode<T> rightNode) {  
            this.data = data;  
            this.leftNode = leftNode;  
            this.rightNode = rightNode;  
        }  
          
  
        public T getData() {  
            return data;  
        }  
  
        public void setData(T data) {  
            this.data = data;  
        }  
  
        public TreeNode<T> getLeftNode() {  
            return leftNode;  
        }  
  
        public void setLeftNode(TreeNode<T> leftNode) {  
            this.leftNode = leftNode;  
        }  
  
        public TreeNode<T> getRightNode() {  
            return rightNode;  
        }  
  
        public void setRightNode(TreeNode<T> rightNode) {  
            this.rightNode = rightNode;  
        }  
  
    }  
  
    // 初始化二叉树  
    public TreeNode<String> init() {  
        TreeNode<String> D = new TreeNode<String>("D", null, null);  
        TreeNode<String> H = new TreeNode<String>("H", null, null);  
        TreeNode<String> I = new TreeNode<String>("I", null, null);  
        TreeNode<String> J = new TreeNode<String>("J", null, null);  
        TreeNode<String> P = new TreeNode<String>("P", null, null);  
        TreeNode<String> G = new TreeNode<String>("G", P, null);  
        TreeNode<String> F = new TreeNode<String>("F", null, J);  
        TreeNode<String> E = new TreeNode<String>("E", H, I);  
        TreeNode<String> B = new TreeNode<String>("B", D, E);  
        TreeNode<String> C = new TreeNode<String>("C", F, G);  
        TreeNode<String> A = new TreeNode<String>("A", B, C);  
        return A;  
    }  
    /**先序遍历二叉树 
     *  
    public void xianIterator(TreeNode<String> node)  
    {  
        this.printNode(node);  
        if(node.getLeftNode()!=null)  
        {  
            this.xianIterator(node.getLeftNode());  
        }  
        if(node.getRightNode()!=null)  
        {  
            this.xianIterator(node.getRightNode());  
        }  
    }  
      
    /** 
       中序遍历二叉树*/  
    public void zhongIterator(TreeNode<String> node)  
    {  
        if(node.getLeftNode()!=null)  
        {  
            this.zhongIterator(node.getLeftNode());  
        }  
        this.printNode(node);  
        if(node.getRightNode()!=null)  
        {  
            this.zhongIterator(node.getRightNode());  
        }  
    }  
      
    /**后序遍历二叉树*/  
    public void houIterator(TreeNode<String> node)  
    {  
        if(node.getLeftNode()!=null)  
        {  
            this.houIterator(node.getLeftNode());  
        }  
        if(node.getRightNode()!=null)  
        {  
            this.houIterator(node.getRightNode());  
        }  
        this.printNode(node);  
    }  
      
    public static void main(String[] args) {  
       BinaryTree binaryTree = new BinaryTree();  
       TreeNode<String> node = binaryTree.init();  
       System.out.println("先序遍历的情况");  
       binaryTree.xianIterator(node);  
       System.out.println("\n中序遍历的情况");  
       binaryTree.zhongIterator(node);  
       System.out.println("\n后序遍历的情况");  
       binaryTree.houIterator(node);  
    }  
      
    }  