<template>
  <div>
    <van-button type="primary" @click="btn">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <hr />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 方式2: 手动 按需引入
// import Button from 'vant/lib/button'; // button组件
// import 'vant/lib/button/style'; // button样式

// 目标: 使用弹出框
// 1. 找到vant文档
// 2. 引入
// 3. 在恰当时机, 调用此函数 (还可以用组件的用法)
import { Dialog } from "vant";
export default {
  // components: { // 手动注册组件名
  //   // VanButton: Button
  //   // 等价的
  //   [Button.name]: Button
  // }
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) { // 表单提交事件, values收集表单里的值
      console.log('submit', values);
    },
    btn() {
      Dialog({ message: "提示", showCancelButton: true }); // 调用执行时, 页面就会出弹出框
    },
  },
};
</script>

<style>
</style>