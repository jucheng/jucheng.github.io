---
layout: post
title:  "排序算法"
date:   2014-12-23
categories: 算法练习
tags: [排序,java]
---
排序算法
<!-- 使用“highlight java linenos”时，显示行数-->

<!-- more -->
	{% highlight java %}
    package Algorithm;

	/**
 	* Created by ZhengQinyu on 2014/12/23 0023.
 	* 排序算法
 	*/
	public class Sort {

    //选择排序
    public static void selectSort(int[] nums){
        int len = nums.length,min,t;
        for(int i=0;i<len;++i){
            min = i;
            //找到最小的值
            for(int j=i+1;j<len;++j){
                if(nums[j]<nums[min])min=j;
            }
            //如果找到，将当前值与最小的值交换
            if(min != i){
                t = nums[i];
                nums[i] = nums[min];
                nums[min] = t;
            }
        }
    }

    //冒泡排序
    public static void bubbleSort(int[] nums){
        int len = nums.length,t;
        for(int i=0;i<len;++i){
            for(int j=i+1;j<len;j++){
                //交换
                if(nums[i]>nums[j]){
                    t = nums[i];
                    nums[i] = nums[j];
                    nums[j] = t;
                }
            }
        }
    }

    //插入排序
    public static void insertSort(int[] nums){
        int len = nums.length,t;
        for(int i=1;i<len;++i){
            for(int j=i;j>0;--j){
                if(nums[j]<nums[j-1]){
                    t = nums[j];
                    nums[j] = nums[j-1];
                    nums[j-1] = t;
                }else{
                    break;
                }
            }
        }
    }

    //-----------快速排序----------------------
    //找到第一个数排好序之后在哪个位置
    public static int Partition(int[] nums,int p,int r){
        int t;
        int i=p,j=r;
        while(true){
            while(nums[i]<nums[p]&&i<r)i++;
            while(nums[j]>=nums[p]&&j>p)j--;
            if(i>=j)
            {
                t = nums[p];
                nums[p] = nums[j];
                nums[j] = t;
                return j;
            }
            else {
                t = nums[i];
                nums[i] = nums[j];
                nums[j] = t;
            }
        }
    }

    //开始快速排序
    private static void quickSort(int[] A,int p,int r){
        int q;
        if(p<r){
            q=Partition(A,p,r);
            quickSort(A, p, q - 1);
            quickSort(A, q + 1, r);
        }
    }

    //-----------快速排序End-------------------

    //-----------归并排序----------------------
    //将A数组和B数组合并后返回
    public static int[] mergeArray(int[] A,int[] B){
        int la = 0,lb = 0;
        if(A != null)la = A.length;
        if(B != null)lb = B.length;
        int[] C = new int[la+lb];
        int i = 0,j = 0,k = 0;
        while (i<la && j<lb) {
            if (A[i] > B[j]) {
                C[k++] = B[j++];
            } else {
                C[k++] = A[i++];
            }
        }
        while (i < la)C[k++] = A[i++];
        while (j < lb)C[k++] = B[j++];

        return C;
    }
    public static int[] mergeSort(int[] A,int p,int r){
        if(p<r) {
            int mid = (p+r)/2;
            int[] A1 = mergeSort(A,p,mid);
            int[] B1 = mergeSort(A,mid+1,r);
            return mergeArray(A1,B1);
        }
        return new int[]{A[p]};
    }
    //----------归并排序End--------------------

	//----------堆排序-------------------------
    //调整堆
    public static void sift(int[] A,int low,int hight){
        int i=low,j=i*2+1;
        int tmp = A[i];
        while(j<=hight){
            //判断左右孩子的大小,指向大孩子
            if(j<hight && A[j]<A[j+1])j++;
            if(tmp<A[j]){
                A[i]=A[j];
                i = j;
                j = 2*i+1;
            }
            else break;
        }
        A[i]=tmp;
    }

    public static void heapSort(int[] A){
        int len = A.length,tmp;
        //建立初始堆
        for(int i=len/2;i>=0;--i)sift(A,i,len-1);
        for(int i=len-1;i>=1;i--){
            tmp = A[0];
            A[0] = A[i];
            A[i] = tmp;
            sift(A,0,i-1);
        }
    }
    //----------堆排序End----------------------

    public static void main(String[] args) {
        int nums[] = new int[20];
        for(int i=0;i<20;++i){
            nums[i]= (int) (Math.random()*1000);
        }
        selectSort(nums);
        bubbleSort(nums);
        insertSort(nums);
        quickSort(nums,0,nums.length-1);
        heapSort(nums);
        //返回的结果放在result中
        int result[] = mergeSort(nums,0,nums.length-1);
        System.out.println(result.length);

    }
	}
	{% endhighlight %}



