<template>
  <div>
      <h5>体育-改变人生</h5>
      <div>
          <router-link to="/sports/home">体育的主页</router-link>
          <router-link to="/sports/in">国内的体育</router-link>
          <router-link to="/sports/out">国外的体育</router-link>
      </div>
      <div>
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>