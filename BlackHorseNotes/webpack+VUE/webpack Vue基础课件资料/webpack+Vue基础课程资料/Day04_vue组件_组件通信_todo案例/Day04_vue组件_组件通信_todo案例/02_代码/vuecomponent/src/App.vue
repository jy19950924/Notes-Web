<template>
  <div>
    <p>商品清单如下:</p>
    <div v-for="(obj, index) in shopData" :key="index">
      {{ obj.shopName }} -- {{ obj.price }}元/份
    </div>
    <p>请选择购买数量:</p>
    <Food
      v-for="(obj, index) in shopData"
      :key="index + ' '"
      :goodsname="obj.shopName"
      :ind="index"
      :count="obj.count"
      @addE="addFn"
      @secE="secFn"
    >
    </Food>
    <p>总价为: {{ allPrice }}</p>
  </div>
</template>

<script>
import Food from "@/components/practise/Food";
export default {
  data() {
    return {
      // 商品数据
      shopData: [
        {
          shopName: "可比克薯片",
          price: 5.5,
          count: 0,
        },
        {
          shopName: "草莓酱",
          price: 3.5,
          count: 0,
        },
        {
          shopName: "红烧肉",
          price: 55,
          count: 0,
        },
        {
          shopName: "方便面",
          price: 12,
          count: 0,
        },
      ],
    };
  },
  components: {
    Food,
  },
  methods: {
    addFn(ind){
      this.shopData[ind].count++
    },
    secFn(ind){
      this.shopData[ind].count > 0 && this.shopData[ind].count--
    }
  },
  computed: {
    allPrice(){
      return this.shopData.reduce((sum, obj) => sum += obj.count * obj.price, 0)
    }
  }
};
</script>