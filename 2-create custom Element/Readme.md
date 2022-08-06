

# 如何使用Javascript创建组件

1. 创建组件类

创建的组件类需要继承于HTMLElement

```js
export class Rating extends HTMLElement {
  constructor() {
    super();
  }
}
```

2. 注册插件到window节点中

   1. 注册自定义插件

      customElements.define命令来注册一个自定义组件。其实用方法如下：

      ```js
      customElements.define('word-count', WordCount, { extends: 'p' });
      ```

      其中，‘word-count’代表自定义组件名（标签名），它的类对象是WordCount，继承于<p>.

      

      通过customElements来创建自定义组件my-rating,类对象为Rating

      ```js
      // module.js
      export class Rating extends HTMLElement {
       ...
      }
      window.customElements.define('my-rating', Rating)
      ```
   
      ```html
      <!-- index.html -->
      <body>
          <my-rating></my-rating>
      </body>
      ```
   
   2. 声明周期回调--connectedCallback函数
   
      connectedCallback函数在首次插入到DOM中时，会被调用。
   
      ```js
      export class Rating extends HTMLElement {
       ...
       connectedCallback(){
         console.log('Rating added to DOM');
       }
      }
      ```
   
   3. 声明周期回调--adoptedCallback函数
   
      当 custom element 被移动到新的文档时，会**调用adoptedCallback。**
   
3. 添加自定义属性

   在自定义组件添加自定义属性。

   1. 在自定义组件中添加属性

      通过get set来设定类属性的读写属性。

      读类中maxRating和rating时，会自动调用get maxRating,get rating.相反，如果需要写类中maxRating和rating时，会自动调用set maxRating 以及 set rating.

      ```js
      // module.js
      export class Rating extends HTMLElement {
          static get observedAttributes() {
              return ['rating', 'max-rating'];
          }
          ...
          get maxRating() {
              console.log("maxRating get")
              return this.getAttribute('max-rating');
          }
          set maxRating(value) {
              console.log("maxRating set")
              this.setAttribute('max-rating', value);
          }
      
          get rating() {
              console.log("rating get func")
              return this.getAttribute('rating');
          }
          set rating(value) {
              console.log("rating set func")
              this.setAttribute('rating', value);
          }
      }
      ...
      ```

   2. 通过 setAttribute 函数来修改标签属性

      在组件插入时，对rating和maxRating属性进行初始化。此时，会使用set和get来获取和设置maxRating,rating属性值.

      ```js
      // module.js
      export class Rating extends HTMLElement {
          ...
          connectedCallback() {
              console.log('Rating added to DOM');
              console.log('rating maxRatin:', this.rating, this.maxRating)
      
              if (!this.rating) {
                  this.rating = 0;
              }
              if (!this.maxRating || this.maxRating < 0) {
                  this.maxRating = 5;
              }
          }
      	...
      }
      ```

      通过setAttribute函数修改标签属性，此时会调用**attributeChangedCallback回调**函数。

      ```js
      <!-- index.html -->
      document.querySelector('my-rating').setAttribute('rating', '3');
      document.querySelector('my-rating').setAttribute('max-rating', '5');
      ```

      其中，attributeChangedCallback函数定义如下：

      ```js
      // module.js
      export class Rating extends HTMLElement {
          ...
          attributeChangedCallback(name, oldVal, newVal) {
              if (oldVal !== newVal) {
                  console.log(`${name} changed from ${oldVal} to ${newVal}`)
                  switch (name) {
                      case 'rating': {
                          this.rating = newVal;
                          break;
                      }
                      case 'max-rating': {
                          this.matRating = newVal;
                          break;
                      }
                  }
              }
          }
      	...
      }
      ```

4. 添加组件至ShadowDOM

   ShadowDOM可以将一个隐藏的、独立的 DOM 附加到一个元素上.

   ![img](https://www.thinktecture.com/storage/2022/06/shadow_building.png)

   1. 将自定义组件的template模板挂在shadow root上

      ```js
      //module.js
      const template = document.createElement('template');
      // ...
      export class Rating extends HTMLElement {
          //...
          constructor() {
              super();
              // attach Shadow DOM to the parent element.
              // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
              // you have no access from outside
              const shadowRoot = this.attachShadow({mode: 'closed'});
              // clone template content nodes to the shadow DOM
              shadowRoot.appendChild(template.content.cloneNode(true));
          }
          //...
      }
      ```

      其中 attachShadow函数中参数mode存在两个值：

      - closed:代表无法通过querySelector来获取元素

        ![img](https://www.thinktecture.com/storage/2022/06/closed_shado_dom-768x723.png)

      - open:代表可以通过querySelector来操作元素

        ![img](https://www.thinktecture.com/storage/2022/06/open_shadow_dom-768x683.png)

