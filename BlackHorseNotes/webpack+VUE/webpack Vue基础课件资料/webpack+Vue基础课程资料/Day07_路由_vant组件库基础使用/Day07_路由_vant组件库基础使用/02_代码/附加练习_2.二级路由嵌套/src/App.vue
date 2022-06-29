<template>
  <div>
    <h5>嵌套路由</h5>
    <div>
      <router-link to="/">主页</router-link>
      <router-link to="/news">新闻</router-link>
      <router-link to="/sports">体育</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.router-link-exact-active{
  color: red;
}
</style>