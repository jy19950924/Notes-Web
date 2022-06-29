<template>
  <div>
    <table>
      <!-- 2. 使用tr组件, 传入需要的数据 -->
      <tr
        is="myTr"
        v-for="(item, index) in goodsArr"
        :key="index"
        :obj="item"
        :index="index"
      ></tr>
    </table>
    <p>All Number:{{ sumNumber }}</p>
  </div>
</template>

<script>
import MyTr from '@/components/practise/MyTr'
export default {
  data() {
    return {
      goodsArr: [
        {
          count: 0,
          goodsName: "Watermelon",
        },
        {
          count: 0,
          goodsName: "Banana",
        },
        {
          count: 0,
          goodsName: "Orange",
        },
        {
          count: 0,
          goodsName: "Pineapple",
        },
        {
          count: 0,
          goodsName: "Strawberry",
        },
      ],
    };
  },
  components: {
    MyTr
  },
  computed: {
    sumNumber(){
      return this.goodsArr.reduce((sum, obj) => sum += obj.count * 1, 0)
    }
  }
};
</script>

<style>
</style>