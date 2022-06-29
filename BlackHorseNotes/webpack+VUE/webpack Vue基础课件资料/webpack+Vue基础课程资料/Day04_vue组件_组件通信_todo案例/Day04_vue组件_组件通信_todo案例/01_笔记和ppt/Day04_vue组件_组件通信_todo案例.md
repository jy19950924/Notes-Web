Day04

## 知识点自测

- [ ] this指向

```js
let obj = {
    fn: function(){
        // this指向此函数的调用者
    },
    fn () {
        // this指向当前函数的调用者 (如果都是在vue里, this指向的都是vue实例对象)
    },
    fn: () => {
        // this指向外层函数作用域this的值
    }
}
obj.fn();

axios().then(res => {
    // 这里的this的值是多少哦?
})
```

- [ ] =作用

```js
let a = 10;
let b = a; 
b = 20; // 基础类型, 单纯的值的赋值

let a = {name: "哈哈"};
let b = a; // a变量的值是引用类型, a里保存的是对象在堆的内存地址, 所以b和a指向同一个对象 (引用类型=是内存地址的赋值)
b.name = "刘总";
```

## 今日学习目标

1. 能够理解vue组件概念和作用
2. 能够掌握封装组件能力
3. 能够使用组件之间通信
4. 能够完成todo案例

## 1. vue组件

### 1.0_为什么用组件

以前做过一个折叠面板

![image-20210115092834016](images/image-20210115092834016.png)

需求: 现在想要多个收起展开的部分

方案1: 复制代码

- 代码重复 冗余
- 不利于维护

1. 案例用less写的样式, 所以下载

```bash
yarn add less less-loader@5.0.0 -D
```

2. 模板标签 - 在这个基础上, 把==要复用的多复制几份==(讲解不好的地方引出解决方案)

```vue
<template>
  <div id="app">
    <h3>案例：折叠面板</h3>
    <div>
      <div class="title">
        <h4>芙蓉楼送辛渐</h4>
        <span class="btn" @click="isShow = !isShow">
          {{ isShow ? '收起' : '展开' }}
        </span>
      </div>
      <div class="container" v-show="isShow">
        <p>寒雨连江夜入吴, </p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #ccc;
  #app {
    width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border: 4px solid blueviolet;
    border-radius: 1em;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 1em 2em 2em;
    h3 {
      text-align: center;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .title h4 {
      line-height: 2;
      margin: 0;
    }
    .container {
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .btn {
      /* 鼠标改成手的形状 */
      cursor: pointer;
    }
  }
}
</style>

```

3. 上面复制3份, 发现变化一起变化

   解决方案: 不同的部分, 用不同的isShow变量

```html
<template>
  <div id="app">
    <h3>案例：折叠面板</h3>
    <div>
      <div class="title">
        <h4>芙蓉楼送辛渐</h4>
        <span class="btn" @click="isShow = !isShow">
          {{ isShow ? '收起' : '展开' }}
        </span>
      </div>
      <div class="container" v-show="isShow">
        <p>寒雨连江夜入吴, </p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
    <div>
      <div class="title">
        <h4>芙蓉楼送辛渐</h4>
        <span class="btn" @click="isShow1 = !isShow1">
          {{ isShow1 ? '收起' : '展开' }}
        </span>
      </div>
      <div class="container" v-show="isShow1">
        <p>寒雨连江夜入吴, </p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
    <div>
      <div class="title">
        <h4>芙蓉楼送辛渐</h4>
        <span class="btn" @click="isShow2 = !isShow2">
          {{ isShow2 ? '收起' : '展开' }}
        </span>
      </div>
      <div class="container" v-show="isShow2">
        <p>寒雨连江夜入吴, </p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isShow1: false,
      isShow2: false
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #ccc;
  #app {
    width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border: 4px solid blueviolet;
    border-radius: 1em;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 1em 2em 2em;
    h3 {
      text-align: center;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .title h4 {
      line-height: 2;
      margin: 0;
    }
    .container {
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .btn {
      /* 鼠标改成手的形状 */
      cursor: pointer;
    }
  }
}
</style>

```

> 总结: 代码非常的冗余和重复吧? 解决方案呢? 就是采用我们的组件化开发的方式, 往下看

### 1.1_vue组件_概念

> 组件是可复用的 Vue 实例, 封装标签, 样式和JS代码

**组件化** ：封装的思想，把页面上 `可重用的部分` 封装为 `组件`，从而方便项目的 开发 和 维护

**一个页面， 可以拆分成一个个组件，一个组件就是一个整体, 每个组件可以有自己独立的 结构 样式 和 行为(html, css和js)**

![image-20210216114452712](images/image-20210216114452712.png)

### 1.2_vue组件_基础使用

> 目标: 每个组件都是一个独立的个体, 代码里体现为一个独立的.vue文件

口诀: 哪部分标签复用, 就把哪部分封装到组件内

==(重要): 组件内template只能有一个根标签==

==(重要): 组件内data必须是一个函数, 独立作用域==

步骤:

1. 创建组件 components/Pannel.vue

> 封装标签+样式+js - 组件都是独立的, 为了复用

```vue
<template>
  <div>
    <div class="title">
      <h4>芙蓉楼送辛渐</h4>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <div class="container" v-show="isShow">
      <p>寒雨连江夜入吴,</p>
      <p>平明送客楚山孤。</p>
      <p>洛阳亲友如相问，</p>
      <p>一片冰心在玉壶。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0 1em;
}
.title h4 {
  line-height: 2;
  margin: 0;
}
.container {
  border: 1px solid #ccc;
  padding: 0 1em;
}
.btn {
  /* 鼠标改成手的形状 */
  cursor: pointer;
}
</style>
```

2. 注册组件: 创建后需要注册后再使用

> ### 全局 - 注册使用

全局入口在main.js, 在new Vue之上注册

语法:

```js
import Vue from 'vue'
import 组件对象 from 'vue文件路径'

Vue.component("组件名", 组件对象)
```

main.js - 立即演示

```js
// 目标: 全局注册 (一处定义到处使用)
// 1. 创建组件 - 文件名.vue
// 2. 引入组件
import Pannel from './components/Pannel'
// 3. 全局 - 注册组件
/*
  语法: 
  Vue.component("组件名", 组件对象)
*/
Vue.component("PannelG", Pannel)
```

全局注册PannelG组件名后, 就可以当做标签在任意Vue文件中template里用

单双标签都可以或者小写加-形式, 运行后, 会把这个自定义标签当做组件解析, 使用==组件里封装的标签替换到这个位置==

```vue
<PannelG></PannelG>
<PannelG/>
<pannel-g></pannel-g>
```

> ### 局部 - 注册使用

语法:

```js
import 组件对象 from 'vue文件路径'

export default {
    components: {
        "组件名": 组件对象
    }
}
```

任意vue文件中中引入, 注册, 使用

```vue
<template>
  <div id="app">
    <h3>案例：折叠面板</h3>
    <!-- 4. 组件名当做标签使用 -->
    <!-- <组件名></组件名> -->
    <PannelG></PannelG>
    <PannelL></PannelL>
  </div>
</template>

<script>
// 目标: 局部注册 (用的多)
// 1. 创建组件 - 文件名.vue
// 2. 引入组件
import Pannel from './components/Pannel_1'
export default {
  // 3. 局部 - 注册组件
  /*
    语法: 
    components: {
      "组件名": 组件对象
    }
  */
  components: {
    PannelL: Pannel
  }
}
</script>
```

组件使用总结:

1. (创建)封装html+css+vue到独立的.vue文件中
2. (引入注册)组件文件 => 得到组件配置对象
3. (使用)当前页面当做标签使用

### 1.3_vue组件-scoped作用

> 目的: 解决多个组件样式名相同, 冲突问题

需求: div标签名选择器, 设置背景色

问题: 发现组件里的div和外面的div都生效了

解决: 给Pannel.vue组件里style标签上加scoped属性即可

```vue
<style scoped>
```

在style上加入scoped属性, 就会在此组件的标签上加上一个随机生成的data-v开头的属性

而且必须是当前组件的元素, 才会有这个自定义属性, 才会被这个样式作用到

![image-20210216122749906](images/image-20210216122749906.png)

> 总结: style上加scoped, 组件内的样式只在当前vue组件生效

## 2. vue组件通信

因为每个组件的变量和值都是独立的

组件通信先暂时关注父传子, 子传父

父: 使用其他组件的vue文件

子: 被引入的组件(嵌入)

例如: App.vue(父)  MyProduct.vue(子)

### 2.0_vue组件通信_父向子-props

> 目的: 从外面给组件内传值, 先学会语法, 练习中在看使用场景

需求: 封装一个商品组件MyProduct.vue - 外部传入具体要显示的数据, 如下图所示

![image-20210305201956669](images/image-20210305201956669.png)

步骤:

1. 创建组件components/MyProduct.vue - 复制下面标签

2. 组件内在props定义变量, 用于接收外部传入的值

3. App.vue中引入注册组件, 使用时, 传入具体数据给组件显示

components/MyProduct.vue - 准备标签

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'price', 'intro']
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

App.vue中使用并传入数据

```vue
<template>
  <div>
    <!-- 
      目标: 父(App.vue) -> 子(MyProduct.vue) 分别传值进入
      需求: 每次组件显示不同的数据信息
      步骤(口诀):
        1. 子组件 - props - 变量 (准备接收)
        2. 父组件 - 传值进去
     -->
    <Product title="好吃的口水鸡" price="50" intro="开业大酬宾, 全场8折"></Product>
    <Product title="好可爱的可爱多" price="20" intro="老板不在家, 全场1折"></Product>
    <Product title="好贵的北京烤鸭" price="290" :intro="str"></Product>
  </div>
</template>

<script>
// 1. 创建组件 (.vue文件)
// 2. 引入组件
import Product from './components/MyProduct'
export default {
  data(){
    return {
      str: "好贵啊, 快来啊, 好吃"
    }
  },
  // 3. 注册组件
  components: {
    // Product: Product // key和value变量名同名 - 简写
    Product
  }
}
</script>

<style>

</style>
```

> 总结: 组件封装复用的标签和样式, 而具体数据要靠外面传入

### 2.1_vue组件通信_父向子-配合循环

> 目的: 把数据循环分别传入给组件内显示

数据

```js
list: [
    { id: 1, proname: "超级好吃的棒棒糖", proprice: 18.8, info: '开业大酬宾, 全场8折' },
    { id: 2, proname: "超级好吃的大鸡腿", proprice: 34.2, info: '好吃不腻, 快来买啊' },
    { id: 3, proname: "超级无敌的冰激凌", proprice: 14.2, info: '炎热的夏天, 来个冰激凌了' },
],
```

正确代码(==不可复制==)`

```vue
<template>
  <div>
    <MyProduct v-for="obj in list" :key="obj.id"
    :title="obj.proname"
    :price="obj.proprice"
    :intro="obj.info"
    ></MyProduct>
  </div>
</template>

<script>
// 目标: 循环使用组件-分别传入数据
// 1. 创建组件
// 2. 引入组件
import MyProduct from './components/MyProduct'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  // 3. 注册组件
  components: {
    // MyProduct: MyProduct
    MyProduct
  }
};
</script>

<style>
</style>
```

> ### 单向数据流

在vue中需要遵循单向数据流原则
  1. 父组件的数据发生了改变，子组件会自动跟着变
  2. 子组件不能直接修改父组件传递过来的props  props是只读的

==父组件传给子组件的是一个对象，子组件修改对象的属性，是不会报错的，对象是引用类型, 互相更新==

![image-20210423161646951](images/image-20210423161646951.png)

> 总结: props的值不能重新赋值, 对象引用关系属性值改变, 互相影响

### 2.2_vue组件通信_单向数据流

> 目标: props变量本身是只读不能重新赋值

目标：从==父到子==的数据流向,叫==单向数据流==

原因: 子组件修改, 不通知父级, 造成数据不一致性

如果第一个MyProduct.vue内自己修改商品价格为5.5, 但是App.vue里原来还记着18.8 - 数据 不一致了

所以: Vue规定==props==里的变量, ==本身是只读==的

![image-20210511143218215](images/image-20210511143218215.png)

> 总结: 所以props变量本身是不能重新赋值的

问题:  那我怎么才能修改子组件接收到的值呢? - 其实要影响父亲, 然后数据响应式来影响儿子们

### 2.3_vue组件通信_子向父

> 目标: 从子组件把值传出来给外面使用

需求: 课上例子, 砍价功能, 子组件点击实现随机砍价-1功能

![image-20210307134253897](images/image-20210307134253897.png)

语法:

* 父: @自定义事件名="父methods函数"
* 子: this.$emit("自定义事件名", 传值) - 执行父methods里函数代码

![image-20210217102551882](images/image-20210217102551882.png)

components/MyProduct_sub.vue

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="subFn">宝刀-砍1元</button>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  props: ['index', 'title', 'price', 'intro'],
  methods: {
    subFn(){
      this.$emit('subprice', this.index, 1) // 子向父
      eventBus.$emit("send", this.index, 1) // 跨组件
    }
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

App.vue

```vue
<template>
  <div>
    <!-- 目标: 子传父 -->
    <!-- 1. 父组件, @自定义事件名="父methods函数" -->
    <MyProduct v-for="(obj, ind) in list" :key="obj.id"
    :title="obj.proname"
    :price="obj.proprice"
    :intro="obj.info"
    :index="ind"
    @subprice="fn"
    ></MyProduct>
  </div>
</template>

<script>

import MyProduct from './components/MyProduct_sub'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折",
        },
        {
          id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",
        },
        {
          id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",
        },
      ],
    };
  },
  components: {
    MyProduct
  },
  methods: {
    fn(inde, price){
      // 逻辑代码
      this.list[inde].proprice > 1 && (this.list[inde].proprice = (this.list[inde].proprice - price).toFixed(2))
    }
  }
};
</script>

<style>
</style>
```

> 总结: 父自定义事件和方法, 等待子组件触发事件给方法传值

### 2.4_阶段小结

> 目标: 总结父子组件关系-通信技术口诀

组件是什么?

* 是一个vue实例, 封装标签, 样式和JS代码

组件好处?

* 便于复用, 易于扩展

组件通信哪几种, 具体如何实现?

* 父 -> 子

* 父 <- 子

### 2.5_vue组件通信-EventBus

> 目标: 常用于跨组件通信时使用

两个组件的关系非常的复杂，通过父子组件通讯是非常麻烦的。这时候可以使用通用的组件通讯方案：事件总线（event-bus)

![image-20210416122123301](images/image-20210416122123301.png)

核心语法

EventBus/index.js- 定义事件总线bus对象

```js
import Vue from 'vue'
// 导出空白vue对象
export default new Vue()
```

List.vue注册事件 - 等待接收要砍价的值 (==直接复制==) - 准备兄弟页面

```vue
<template>
  <ul class="my-product">
      <li v-for="(item, index) in arr" :key="index">
          <span>{{ item.proname }}</span>
          <span>{{ item.proprice }}</span>
      </li>
  </ul>
</template>

<script>
export default {
  props: ['arr'],
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

components/MyProduct_sub.vue(==带学生主要写触发eventBus身上事件==)

```vue
<template>
  <div class="my-product">
    <h3>标题: {{ title }}</h3>
    <p>价格: {{ price }}元</p>
    <p>{{ intro }}</p>
    <button @click="subFn">宝刀-砍1元</button>
  </div>
</template>

<script>
import eventBus from '../EventBus'
export default {
  props: ['index', 'title', 'price', 'intro'],
  methods: {
    subFn(){
      this.$emit('subprice', this.index, 1) // 子向父
      eventBus.$emit("send", this.index, 1) // 跨组件
    }
  }
}
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

List.vue正确代码(==EventBus接收方==)

```vue
<template>
  <ul class="my-product">
    <li v-for="(item, index) in arr" :key="index">
      <span>{{ item.proname }}</span>
      <span>{{ item.proprice }}</span>
    </li>
  </ul>
</template>

<script>
// 目标: 跨组件传值
// 1. 引入空白vue对象(EventBus)
// 2. 接收方 - $on监听事件
import eventBus from "../EventBus";
export default {
  props: ["arr"],
  // 3. 组件创建完毕, 监听send事件
  created() {
    eventBus.$on("send", (index, price) => {
      this.arr[index].proprice > 1 &&
        (this.arr[index].proprice = (this.arr[index].proprice - price).toFixed(2));
    });
  },
};
</script>

<style>
.my-product {
  width: 400px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 5px;
  margin: 10px;
}
</style>
```

> 总结: 空的Vue对象, 只负责$on注册事件, $emit触发事件, 一定要确保$on先执行

## 3. todo案例

完整效果演示

![品牌管理_铺增删](images/品牌管理_铺增删.gif)

### 3.0_todo案例-创建工程和组件

> 目标: 新建工程, 准备好所需的一切

* 需求1: 创建新工程
* 需求2: 分组件创建 – 准备标签和样式(从.md笔记复制)

分析：

​	①：初始化todo工程

​	②：创建３个组件和里面代码(在预习资料.md复制)

​	③：把styles的样式文件准备好(从预习资料复制)

​	④:  App.vue引入注册使用, 最外层容器类名todoapp

预先准备: 把styles的样式文件准备好(从预习资料复制), 在App.vue引入使用

```js
// 1.0 样式引入
import "./styles/base.css"
import "./styles/index.css"
```

根据需求: 我们定义3个组件准备复用

![image-20210423162040577](images/image-20210423162040577.png)

components/TodoHeader.vue - 复制标签和类名

```vue
<template>
  <header class="header">
    <h1>todos</h1>
    <input id="toggle-all" class="toggle-all" type="checkbox" >
    <label for="toggle-all"></label>
    <input
      class="new-todo"
      placeholder="输入任务名称-回车确认"
      autofocus
    />
  </header>
</template>

<script>
export default {
 
}
</script>
```

components/TodoMain.vue - 复制标签和类名

```vue
<template>
  <ul class="todo-list">
    <!-- completed: 完成的类名 -->
    <li class="completed" >
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>任务名</label>
        <button class="destroy"></button>
      </div>
    </li>
  </ul>
  
</template>

<script>
export default {
}
</script>
```

components/TodoFooter.vue - 复制标签和类名

```vue
<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>数量值</strong></span>
    <ul class="filters">
      <li>
        <a class="selected" href="javascript:;" >全部</a>
      </li>
      <li>
        <a href="javascript:;">未完成</a>
      </li>
      <li>
        <a href="javascript:;" >已完成</a>
      </li>
    </ul>
    <button class="clear-completed" >清除已完成</button>
  </footer>
</template>

<script>
export default {

}
</script>
```

App.vue中引入和使用

```vue
<template>
  <section class="todoapp">
    <!-- 除了驼峰, 还可以使用-转换链接 -->
    <TodoHeader></TodoHeader>
    <TodoMain></TodoMain>
    <TodoFooter></TodoFooter>
  </section>
</template>

<script>
// 1.0 样式引入
import "./styles/base.css"
import "./styles/index.css"
    
import TodoHeader from "./components/TodoHeader";
import TodoMain from "./components/TodoMain";
import TodoFooter from "./components/TodoFooter";


export default {
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
};
</script>
```

### 3.1_todo案例-铺设待办任务

> 目的: 把待办任务, 展示到页面TodoMain.vue组件上

* 需求1: 把待办任务, 展示到页面TodoMain.vue组件上
* 需求2: 关联选中状态, 设置相关样式

分析：

​	①: App.vue – 准备数组传入TodoMain.vue内

​	②: v-for循环展示数据

​	③: v-model绑定复选框选中状态

​	④: 根据选中状态, 设置完成划线样式

App.vue

```js
 <TodoMain :arr="showArr"></TodoMain>

export default {
  data() {
    return {
      list: [
        { id: 100, name: "吃饭", isDone: true },
        { id: 201, name: "睡觉", isDone: false },
        { id: 103, name: "打豆豆", isDone: true },
      ],
    };
  }
};
```

TodoMain.vue

```vue
<template>
  <ul class="todo-list">
    <!-- 2.2 循环任务-关联选中状态-铺设数据 -->
    <!-- completed: 完成的类名 -->
    <li :class="{completed: obj.isDone}" v-for="(obj, index) in arr" :key='obj.id'>
      <div class="view">
        <input class="toggle" type="checkbox" v-model="obj.isDone"/>
        <label>{{ obj.name }}</label>
        <!-- 4.0 注册点击事件 -->
        <button @click="delFn(index)" class="destroy"></button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["list"]
};
</script>

<style>
</style>
```

### 3.2_todo案例-添加任务

> 目标: 在顶部输入框输入要完成的任务名, 敲击回车, 完成新增功能

* 需求: 输入任务敲击回车, 新增待办任务

分析：

​	①: TodoHeader.vue – 输入框 – 键盘事件 – 回车按键

​	②: 子传父, 把待办任务 – App.vue中 – 加入数组list里

​	③: 原数组改变, 所有用到的地方都会更新

​	④: 输入框为空, 提示用户必须输入内容

TodoHeader.vue

```vue
<template>
  <header class="header">
    <h1>todos</h1>
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="isAll">
    <label for="toggle-all"></label>
    <!-- 3.0 键盘事件-回车按键
         3.1 输入框 - v-model获取值
     -->
    <input
      class="new-todo"
      placeholder="输入任务名称-回车确认"
      autofocus
      @keydown.enter="downFn"
      v-model="task"
    />
  </header>
</template>

<script>
// 3. 目标 - 新增任务
export default {
  data(){
    return {
      task: ""
    }
  },
  methods: {
    downFn(){
      if (this.task.trim().length === 0) {
        alert("任务名不能为空");
        return;
      }
      // 3.2(重要) - 当前任务名字要加到list数组里
      // 子传父技术
      this.$emit("create", this.task)
      this.task = ""
    }
  }
}
</script>
```

App.vue

```js
<TodoHeader @create="createFn"></TodoHeader>

methods: {
   createFn(taskName){ // 添加任务
      // 3.3 push到数组里
      let id = this.list.length == 0 ? 100 : this.list[this.list.length - 1].id + 1
      this.list.push({
        id: id,
        name: taskName,
        isDone: false
      })
    },
}
```

### 3.3_todo案例-删除任务

> 目标: 实现点x, 删除任务功能

* 需求: 点击任务后的x, 删除当前这条任务

分析：

​	①: x标签 – 点击事件 – 传入id区分

​	②: 子传父, 把id传回– App.vue中 – 删除数组list里某个对应的对象

​	③: 原数组改变, 所有用到的地方都会更新

App.vue - 传入自定义事件等待接收要被删除的序号

```js
<TodoMain :arr="showArr" @del="deleteFn"></TodoMain>

methods: {
    deleteFn(theId){ // 删除任务
      let index = this.list.findIndex(obj => obj.id === theId)
      this.list.splice(index, 1)
    },
},
```

TodoMain.vue - 把id传回去实现删除(想好数据在哪里, 就在哪里删除)

```js
<!-- 4.0 注册点击事件 -->
<button class="destroy" @click="delFn(obj.id)"></button>

methods: {
     delFn(id){
      // 4.1 子传父
      this.$emit('del', id)
    }
}
```

### 3.4_todo案例-底部统计

> 目的: 显示现在任务的总数

* 需求: 统计当前任务的条数

分析：

​	①: App.vue中 – 数组list – 传给TodoFooter.vue

​	②: 直接在标签上显示 / 定义计算属性用于显示都可以

​	③: 原数组只要改变, 所有用到此数组的地方都会更新

TodoFooter.vue - 接收list统计直接显示

```vue
<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>{{ count }}</strong></span>
    <ul class="filters">
      <li>
        <a class="selected" href="javascript:;">全部</a>
      </li>
      <li>
        <a href="javascript:;">未完成</a>
      </li>
      <li>
        <a href="javascript:;">已完成</a>
      </li>
    </ul>
    <button class="clear-completed">清除已完成</button>
  </footer>
</template>

<script>
export default {
  // 5.0 props定义
  props: ['farr'],
  // 5.1 计算属性 - 任务数量
  computed: {
    count(){
      return this.farr.length
    }
  },
}
</script>

<style>

</style>
```

App.vue - 传入数据

```vue
<TodoFooter :farr="showArr"></TodoFooter>
```

### 3.5_todo案例-数据切换

> 目的: 点击底部切换数据

* 需求1: 点击底部切换 – 点谁谁有边框
* 需求2: 对应切换不同数据显示

分析：

​	①: TodoFooter.vue – 定义isSel – 值为all, yes, no其中一种

​	②: 多个class分别判断谁应该有类名selected

​	③: 点击修改isSel的值

​	④: 子传父, 把类型isSel传到App.vue

​	⑤: 定义计算属性showArr, 决定从list里显示哪些数据给TodoMain.vue和TodoFooter.vue

App.vue

```vue
<TodoFooter :farr="showArr" @changeType="typeFn"></TodoFooter>

<script>
    export default{
       data(){
            return {
              // ...其他省略
              getSel: "all" // 默认显示全部
            }
        },
        methods: {
            // ...其他省略
            typeFn(str){ // 'all' 'yes' 'no' // 修改类型
              this.getSel = str
            },
        },
        // 6.5 定义showArr数组 - 通过list配合条件筛选而来
          computed: {
            showArr(){
              if (this.getSel === 'yes') { // 显示已完成
                return this.list.filter(obj => obj.isDone === true)
              } else if (this.getSel === 'no') { // 显示未完成
                return this.list.filter(obj => obj.isDone === false)
              } else {
                return this.list // 全部显示
              }
            }
          },
    }
</script>
```

TodoFooter.vue

```vue
<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>{{ count }}</strong></span>
    <ul class="filters" @click="fn">
      <li>
        <!-- 6.1 判断谁应该有高亮样式: 动态class
            6.2 用户点击要切换isSel里保存的值
         -->
        <a :class="{selected: isSel === 'all'}" href="javascript:;" @click="isSel='all'">全部</a>
      </li>
      <li>
        <a :class="{selected: isSel === 'no'}" href="javascript:;" @click="isSel='no'">未完成</a>
      </li>
      <li>
        <a :class="{selected: isSel === 'yes'}" href="javascript:;" @click="isSel='yes'">已完成</a>
      </li>
    </ul>
    <!-- 7. 目标: 清除已完成 -->
    <!-- 7.0 点击事件 -->
    <button class="clear-completed" >清除已完成</button>
  </footer>
</template>

<script>
// 5. 目标: 数量统计
export default {
  // 5.0 props定义
  props: ['farr'],
  // 5.1 计算属性 - 任务数量
  computed: {
    count(){
      return this.farr.length
    }
  },
  // 6. 目标: 点谁谁亮
  // 6.0 变量isSel
  data(){
    return {
      isSel: 'all' // 全部:'all', 已完成'yes', 未完成'no'
    }
  },
  methods: {
    fn(){ // 切换筛选条件
      // 6.3 子 -> 父 把类型字符串传给App.vue 
      this.$emit("changeType", this.isSel)
    }
  }
}
</script>
```

### 3.6_todo案例-清空已完成

> 目的: 点击右下角按钮- 把已经完成的任务清空了

* 需求: 点击右下角链接标签, 清除已完成任务 

分析：

​	①: 清空标签 – 点击事件

​	②: 子传父 – App.vue – 一个清空方法

​	③: 过滤未完成的覆盖list数组 (不考虑恢复)

App.vue - 先传入一个自定义事件-因为得接收TodoFooter.vue里的点击事件

```vue
<TodoFooter :farr="showArr" @changeType="typeFn" @clear="clearFun"></TodoFooter>

<script>
    methods: {
        // ...省略其他
        clearFun(){ // 清除已完成
          this.list = this.list.filter(obj => obj.isDone == false)
        }
    }
</script>
```

TodoFooter.vue

```vue
<!-- 7. 目标: 清除已完成 -->
<!-- 7.0 点击事件 -->
<button class="clear-completed" @click="clearFn">清除已完成</button>

<script>
	methods: {
        clearFn(){ // 清空已完成任务
          // 7.1 触发App.vue里事件对应clearFun方法
          this.$emit('clear')
        }
    }
</script>
```

### 3.7_todo案例-数据缓存

> 目的: 新增/修改状态/删除 后, 马上把数据同步到浏览器本地存储

* 需求: 无论如何变化 – 都保证刷新后数据还在

分析：

​	①: App.vue – 侦听list数组改变 – 深度

​	②: 覆盖式存入到本地 – 注意本地只能存入JSON字符串

​	③: 刷新页面 – list应该默认从本地取值 – 要考虑无数据情况空数组

App.vue

```vue
<script>
    export default {
        data(){
            return {
                // 8.1 默认从本地取值
                list: JSON.parse(localStorage.getItem('todoList')) || [],
                // 6.4 先中转接收类型字符串
                getSel: "all" // 默认显示全部
            }
        },
        // 8. 目标: 数据缓存
        watch: {
            list: {
                deep: true,
                handler(){
                    // 8.0 只要list变化 - 覆盖式保存到localStorage里
                    localStorage.setItem('todoList', JSON.stringify(this.list))
                }
            }
        }
    };
</script>
```

### 3.8_todo案例-全选功能

> 目标: 点击左上角v号, 可以设置一键完成, 再点一次取消全选

* 需求1: 点击全选 – 小选框受到影响
* 需求2: 小选框都选中(手选) – 全选自动选中状态

分析：

​	①: TodoHeader.vue – 计算属性 - isAll

​	②: App.vue – 传入数组list – 在isAll的set里影响小选框

​	③: isAll的get里统计小选框最后状态, 影响isAll – 影响全选状态

​	④: 考虑无数据情况空数组 – 全选不应该勾选

提示: 就是遍历所有的对象, 修改他们的完成状态属性的值

TodoHeader.vue

```vue
<!-- 9. 目标: 全选状态
9.0 v-model关联全选状态
页面变化(勾选true, 未勾选false) -> v-model -> isAll变量
-->
<input id="toggle-all" class="toggle-all" type="checkbox" v-model="isAll">

<script>
    export default {
        // ...其他省略
        // 9.1 定义计算属性
        computed: {
            isAll: {
                set(checked){ // 只有true / false
                    // 9.3 影响数组里每个小选框绑定的isDone属性
                    this.arr.forEach(obj => obj.isDone = checked)
                },
                get(){
                    // 9.4 小选框统计状态 -> 全选框
                    // 9.5 如果没有数据, 直接返回false-不要让全选勾选状态
                    return this.arr.length !== 0 && this.arr.every(obj => obj.isDone === true)
                }
            }
        },
    }
</script>
```

App.vue

```vue
<TodoHeader :arr="list" @create="createFn"></TodoHeader>
```

## 今日总结

- [ ] 组件概念和作用以及创建和使用方式


- [ ] 掌握组件通信包括父向子, 子向父传值


- [ ] 熟悉EventBus的使用和原理


- [ ] 跟随老师的视频完成todo案例的全部功能


## 面试题

### 1. 请说下封装 vue 组件的过程

​    首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。

* 分析需求：确定业务需求，把页面中可以复用的结构，样式以及功能，单独抽离成一个组件，实现复用

* 具体步骤：Vue.component 或者在new Vue配置项components中, 定义组件名, 可以在props中接受给组件传的参数和值，子组件修改好数据后，想把数据传递给父组件。可以采用$emit方法。

### 2. Vue组件如何进行传值的

父向子 -> props定义变量 -> 父在使用组件用属性给props变量传值

子向父 -> $emit触发父的事件 -> 父在使用组件用@自定义事件名=父的方法 (子把值带出来)

### 3. Vue 组件 data 为什么必须是函数

每个组件都是 Vue 的实例, 为了独立作用域, 不让变量污染别人的变量

### 4. 讲一下组件的命名规范

​    给组件命名有两种方式(在Vue.Component/components时)，一种是使用链式命名"my-component"，一种是使用大驼峰命名"MyComponent"，

​	因为要遵循W3C规范中的自定义组件名 (字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突

## 附加练习_1.喜欢小狗狗吗

> 目标: 封装Dog组件, 用来复用显示图片和标题的

效果:

![image-20210115103545558](images/image-20210115103545558.png)

----

正确答案(==先不要看==)

components/practise/Dog1.vue

```html
<template>
  <div class="my_div">
    <img
      src="https://scpic.chinaz.net/files/pic/pic9/202003/zzpic23514.jpg"
      alt=""
    />
    <p>这是一个孤独可怜的狗</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.my_div {
  width: 200px;
  border: 1px solid black;
  text-align: center;
  float: left;
}

.my_div img {
  width: 100%;
  height: 200px;
}
</style>
```

在App.vue中使用

```vue
<template>
  <div>
    <Dog></Dog>
    <Dog/>
  </div>
</template>

<script>
import Dog from '@/components/practise/Dog1'
export default {
  components: {
    Dog
  }
}
</script>

<style>

</style>
```

> 总结: 重复部分封装成组件, 然后注册使用

## 附加练习_2.点击文字变色

> 目标: 修改Dog组件, 实现组件内点击变色

提示: 文字在组件内, 所以事件和方法都该在组件内-独立

图示:

![10.3.1_组件_事件变量使用](images/10.3.1_组件_事件变量使用.gif)

正确代码(==先不要看==)

components/practise/Dog2.vue

```html
<template>
  <div class="my_div">
    <img
      src="https://scpic.chinaz.net/files/pic/pic9/202003/zzpic23514.jpg"
      alt=""
    />
    <p :style="{backgroundColor: colorStr}" @click="btn">这是一个孤独可怜的狗</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      colorStr: ""
    }
  },
  methods: {
    btn(){
      this.colorStr = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    }
  }
};
</script>

<style>
.my_div {
  width: 200px;
  border: 1px solid black;
  text-align: center;
  float: left;
}

.my_div img {
  width: 100%;
  height: 200px;
}
</style>
```

## 附加练习_3.卖狗啦

> 目标: 把数据循环用组件显示铺设

数据:

```js
[
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
]
```

图示:

![image-20210115112811452](images/image-20210115112811452.png)

正确代码(==不可复制==)

components/practise/Dog3.vue

```vue
<template>
  <div class="my_div">
    <img :src="imgurl" alt="" />
    <p :style="{ backgroundColor: colorStr }" @click="btn">{{ dogname }}</p>
  </div>
</template>

<script>
export default {
  props: ["imgurl", "dogname"],
  data() {
    return {
      colorStr: "",
    };
  },
  methods: {
    btn() {
      this.colorStr = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

      
    },
  },
};
</script>

<style scoped>
.my_div {
  width: 200px;
  border: 1px solid black;
  text-align: center;
  float: left;
}

.my_div img {
  width: 100%;
  height: 200px;
}
</style>
```

App.vue引入使用把数据循环传给组件显示

```vue
<template>
  <div>
    <Dog v-for="(obj, index) in arr"
    :key="index"
    :imgurl="obj.dogImgUrl"
    :dogname="obj.dogName"
    ></Dog>
  </div>
</template>

<script>
import Dog from '@/components/practise/Dog3'
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
    };
  },
  components: {
    Dog
  }
};
</script>
```

## 附加练习_4.选择喜欢的狗

> 目标: 用户点击狗狗的名字, 在右侧列表显示一次名字

效果:

![11.5_喜欢的狗狗](images/11.5_喜欢的狗狗.gif)

正确代码(==不可复制==)

components/practise/Dog4.vue

```vue
<template>
  <div class="my_div">
    <img :src="imgurl" alt="" />
    <p :style="{ backgroundColor: colorStr }" @click="btn">{{ dogname }}</p>
  </div>
</template>

<script>
export default {
  props: ["imgurl", "dogname"],
  data() {
    return {
      colorStr: "",
    };
  },
  methods: {
    btn() {
      this.colorStr = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

      // 补充: 触发父级事件
      this.$emit("love", this.dogname);
    },
  },
};
</script>

<style scoped>
.my_div {
  width: 200px;
  border: 1px solid black;
  text-align: center;
  float: left;
}

.my_div img {
  width: 100%;
  height: 200px;
}
</style>
```

App.vue

```vue
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
```

## 附加练习_5.卖完了

> 目标: 完成图示的卖完了效果

需求: 

* 如果为0了后面显示卖光了!!!
* 如果库存有值, 后面就不显示卖光了!!!
* 如果库存有值, 累计商品总数量

要求: 一行是一个组件进行复用, 这里要求必须用table>tr (也就是封装tr组件)

组件使用注意: html正常解析, table>tr或者select>option, 虽然vue渲染页面可以自定义, 但是还需要遵循浏览器的标签关系

* table>tr中不能直接使用组件, 需要在tr的is属性指定组件名
* select>option 也不能封装options组件, 需要在option的is属性指定组件名

效果演示:

![11.7_课上练习](images/11.7_课上练习.gif)

vue实例data里的数组如下

```js
goodsArr: [
    {
        count: 0,
        goodsName: "Watermelon"
    }, {
        count: 0,
        goodsName: "Banana"
    }, {
        count: 0,
        goodsName: "Orange"
    }, {
        count: 0,
        goodsName: "Pineapple"
    }, {
        count: 0,
        goodsName: "Strawberry"
    }
]
```

正确代码(不可复制)

components/practise/MyTr.vue

```html
<template>
  <tr>
    <td>
      <input type="number" v-model.number="obj['count']"/>
    </td>
    <td>
      <span>{{ obj["goodsName"] }}</span>
    </td>
    <td>
      <span v-show="obj['count'] == 0">卖光了!!!</span>
    </td>
  </tr>
</template>

<script>
export default {
    // 传入对象有风险, 但是如果是一对一关系可以传入对象-直接修改对象里的值影响外部效果
    props: ["obj"]
};
</script>

<style>
</style>
```

App.vue使用

```vue
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
```

## 附加练习_6.买点好吃的

> 目标: 商品列表显示一下, 然后封装组件实现增加减少功能并在最后统计总价

要求: 商品名, 增加 数量, 减少这一条封装成组件使用

效果演示:

![11.6_课上练习](images/11.6_课上练习.gif)

数据:

```js
[
    {
        "shopName": "可比克薯片",
        "price": 5.5,
        "count": 0
    },
    {
        "shopName": "草莓酱",
        "price": 3.5,
        "count": 0
    },
    {
        "shopName": "红烧肉",
        "price": 55,
        "count": 0
    },
    {
        "shopName": "方便面",
        "price": 12,
        "count": 0
    }
]
```

正确代码(==不可复制==)

components/practise/Food.vue

```html
<template>
  <div>
    <span>{{ goodsname }}</span>
    <button @click="add(ind)">+</button>
    <span> {{ count }} </span>
    <button @click="sec(ind)">-</button>
  </div>
</template>

<script>
export default {
    props: ['goodsname', 'ind', 'count'], // 商品名,索引,数量
    methods: {
        add(ind){
            this.$emit('addE', ind)
        },
        sec(ind){
            this.$emit("secE", ind)
        }
    }
};
</script>
```

App.vue

```vue
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
```

## 今日作业

==课上练习和案例主要==

### 购物车

目的: 把一行tr封装成一个组件, 然后v-for循环复用传值

> 提示: 对象类型传入到子组件, 内部修改也会相应外部这个对象 (对象是引用关系哦)

![image-20210115195904519](images/image-20210115195904519.png)

不带vue代码的标签结构(==可以复制==)接着写

```vue
<template>
  <div>
    <table
      border="1"
      width="700"
      style="border-collapse: collapse"
    >
      <caption>
        购物车
      </caption>
      <thead>
        <tr>
          <th>
            <input type="checkbox" /> <span>全选</span>
          </th>
          <th>名称</th>
          <th>价格</th>
          <th>数量</th>
          <th>总价</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
      <tfoot>
        <tr>
          <td>合计:</td>
          <td colspan="5">
            
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList: [
        {
          name: "诸葛亮",
          price: 1000,
          num: 1,
          checked: false,
        },
        {
          name: "蔡文姬",
          price: 1500,
          num: 1,
          checked: false,
        },
        {
          name: "妲己",
          price: 2000,
          num: 1,
          checked: false,
        },
        {
          name: "鲁班",
          price: 2200,
          num: 1,
          checked: false,
        },
      ],
    };
  },
};
</script>

<style>
</style>
```

### 做数学题

目的: 随机产生数学题, 输入答案提交后, 在下面对应序号显示结果

> 数字输入框按钮是一个组件, 下面每个序号和提示是一个组件

图示:

![Day04_作业_数学题](images/Day04_作业_数学题.gif)

Subject.vue - 题目一行组件 (样式和标签)(==可以复制接着写==)

```vue
<template>
  <div class="subject">
    <span></span>
    <span>+</span>
    <span></span>
    <span>=</span>
    <input type="number" />
    <button>提交</button>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.subject {
  margin: 5px;
  padding: 5px;
  font-size: 20px;
}
.subject span {
  display: inline-block;
  text-align: center;
  width: 20px;
}
.subject input {
  width: 50px;
  height: 20px;
}
</style>
```

Flag.vue - 下面结果一条的组件 (复制标签和样式)(==可以复制==)

```vue
<template>
  <span >1: 未完成</span>
</template>

<script>
export default {

};
</script>

<style scoped>
.right {
  color: green;
}
.error {
  color: red;
}
.undo {
  color: #ccc;
}
</style>
```

App.vue - 复制标签和样式

无vue代码的标签(==可以复制==)

```html
<template>
  <div id="app">
    <h2>测试题</h2>
    <subject ></subject>
    <div>
      <flag></flag>
    </div>
  </div>
</template>

<script>

export default {
  
};
</script>

<style>
body {
  background-color: #eee;
}

#app {
  background-color: #fff;
  width: 500px;
  margin: 50px auto;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  padding: 2em;
}
</style>
```
