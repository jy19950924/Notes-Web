# React

## 五. 组件的数据挂载
1. 如果在添加DOM时,出现数组类型dom. 类似如下所示：
```html
<ol>
    <li> </li>
    <li> </li>
    ...
    <li> </li>
</ol>
```
   1. 错误方案：可以使用map函数进行映射后，再使用join方法进行拼接成字符串，最后通过{list}方式来进行显示。
   ```js
    var list = ['aa','bb','vv'];
    var newList = list.map(item=>`<li>${item}</li>`)
    //最终将newList以字符串的方式发送给虚拟DOM
   ```
   这样并不会被虚拟DOM拿来解析，而是以字符串的方式输出,字符串在jsx中是不会解析，会被作为字符串进行渲染。
   2. 解决方式：将 错误方案 中"`"符号去掉。jsx会自动解析xml类型格式。


2. state是可以分别进行添加以及覆盖。
   可以通过setState来传入对象，来添加/修改状态变量。 并不需要每次都重复所有的state变量,包括没有发生改变的状态变量。
   1. 如下例所示，两个状态被放入同一个状态对象中。（未测试,可以打印state测试） 
   ```js
    this.setState({
        myShow:!this.state.myShow
    })
    this.setState({
        myname:"xiaomming"
    })
    ```
3. li需要有自己的key属性
    提高列表复用和重排效率，从而提高性能。

4. setState函数为异步函数
    所以在使用setState获取state的值可能会出现错误。
    在异步状态中，为同步执行；而在同步状态中，为异步执行。由于生命周期影响导致。


## 七. 组件间的通信
1. 属性验证
类属性 className.propTypes
```js
import propTypeTip as prop-types
...
Navbar.propTypes={
    title:propTypeTip.string,//验证是不是string,
    leftshow:propTypeTip.bool //验证是不是bool
}
```
**扩展**：类属性 
```js
class Test{
    a =1
    static a =100 //类属性 ES7优化
}
Test.b = 200 //类属性
```

2. 默认属性
类式组件：可以添加defaultProps 来设置默认属性。
函数式组件：可以通过传参来获取属性。

3. 属性vs状态
   1. 属性不可以在子组件中在修改，但是可以在父组件中修改
      1. 但是如果非要在父组件中修改子组件，可以通过通知父组件进行属性修改后，在传给子组件。
   2. 状态只能在子组件中修改
   3. 尽量编写无状态组件，来降低维护难度。
   
