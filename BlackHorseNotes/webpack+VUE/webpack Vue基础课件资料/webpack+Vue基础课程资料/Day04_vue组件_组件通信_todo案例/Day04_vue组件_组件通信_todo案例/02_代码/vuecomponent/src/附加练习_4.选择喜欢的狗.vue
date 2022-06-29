<template>
  <div>
    <Dog
      v-for="(obj, index) in arr"
      :key="index"
      :imgurl="obj.dogImgUrl"
      :dogname="obj.dogName"
      @love="fn"
    ></Dog>

    <hr />
    <p>显示喜欢的狗:</p>
    <ul>
      <li v-for="(item, index) in loveArr" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import Dog from "@/components/practise/Dog4";
export default {
  data() {
    return {
      // 1. 准备数据
      arr: [
        {
          dogImgUrl:
            "http://nwzimg.wezhan.cn/contents/sitefiles2029/10146688/images/21129958.jpg",
          dogName: "博美",
        },
        {
          dogImgUrl:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1224576619,1307855467&fm=26&gp=0.jpg",
          dogName: "泰迪",
        },
        {
          dogImgUrl:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2967740259,1518632757&fm=26&gp=0.jpg",
          dogName: "金毛",
        },
        {
          dogImgUrl:
            "https://pic1.zhimg.com/80/v2-7ba4342e6fedb9c5f3726eb0888867da_1440w.jpg?source=1940ef5c",
          dogName: "哈士奇",
        },
        {
          dogImgUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563813435580&di=946902d419c3643e33a0c9113fc8d780&imgtype=0&src=http%3A%2F%2Fvpic.video.qq.com%2F3388556%2Fd0522aynh3x_ori_3.jpg",
          dogName: "阿拉斯加",
        },
        {
          dogImgUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563813454815&di=ecdd2ebf479568453d704dffacdfa12c&imgtype=0&src=http%3A%2F%2Fwww.officedoyen.com%2Fuploads%2Fallimg%2F150408%2F1-15040Q10J5B0.jpg",
          dogName: "萨摩耶",
        },
      ],
      loveArr: []
    };
  },
  components: {
    Dog,
  },
  methods: {
    fn(dogName) {
      this.loveArr.push(dogName)
    },
  },
};
</script>

<style >
</style>