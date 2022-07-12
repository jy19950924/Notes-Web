


## Ajax

### 5 Http请求结构和响应结构

**请求报文**：

1. GET /route?param1=utf-8 HTTP/1.1

2. header:

   Host,Cookie,Content-type (dict)

3. space

4. body:

   username=admin&password=admin

**响应报文：**

1. Http/1.1 200 OK

2. header:

   Content-type,content-length,content-encoding

3. space

4. html tag

### 6 调试方式

1. Request Headers -- 请求头

2. Query String Param

   解析请求头中参数

3. Response Headers -- 响应头

   响应体位于Response

4. Preview 

   可以预先查看Response中的html结构

### 7 nodejs配置

查看官方手册即可

### 8 Express框架

1. 初始化包管理工具

   ```she
   npm init --yes
   ```

2. 安装express

   ```shell
   npm i express
   ```

3. 使用步骤

   1. 引入express

   2. 创建应用对象

   3. 创建路由规则

   4. 监听端口启动服务

      ```express
      app.listen(8000)
      ```

4. node + 脚本 启动



### 

### 12 Ajax请求头设置

setRequestHeader

注意：如果设置自定义参数时，需要设置两步骤：

1. 后端需要重新设置Access-Control-Allow-Header
2. get->all

### 16 nodemon工具

### 17 IE缓存问题

界面请求后，如果服务器中代码发生变化，IE浏览器缓存会影响正常结果。

解决方法:入参时可以增加时间戳

### 18 请求超时和网络异常

请求超时：

1. 设置超时时间

2. 设置超时回调

   ```js
   xhr.timeout = 2000
   xhr.ontimeout=funciton(){}
   ```

网络异常：

1. 设置网络错误回调事件 onerror

### 19 取消请求

xhr.abort()

### 20 重复发送请求

请求后，判断是否重复请求，如果重复请求，则取消之前的请求。



### 26 同源策略

Ajax默认支持同源。同源：协议，域名，端口均一致。

显示页面中所有请求操作来自于同一个服务。

### 27 跨域问题解决方案-JSONP

跨域：违背同源策略均为跨域。

触发跨域实例：点击submit按钮后，通过jsonp（json with padding）方法将从后端获取的信息展示在p标签中。

需要增加文件script.js，同时需要借助live serve。

```html
<!-- index.html -->
<body>
    <button>submit</button>
    <p></p>

    <script src="./script.js">
    </script>

</body>
```

```js
// script.js
let p = document.querySelector('p');

let xhr = new XMLHttpRequest();

xhr.open('GET', "http://127.0.0.1:12345/jsonp");

xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('xhr.response', xhr.response);
            p.innerText = xhr.response;
        }
    }
}
```

script.js中通过ajax进行跨域请求。

```js
// server.js
const express = require('express')

const app = express()
const port = 12345

app.get('/jsonp', (request, response) => {
    let resData = "hello jsonp"

    response.send(`fun(${JSON.stringify(resData)})`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

请求结果为：

![image-20220712112802346](C:\Users\j30022312\AppData\Roaming\Typora\typora-user-images\image-20220712112802346.png)

跨域解决方法：JSONP，仅支持get请求 img,link,iframe,script本身具备跨域特性

主要解决思路：通过服务器直接返回js代码，将代码直接直接插入到某些元素中，从而实现跨域交互。该方法也是用了部分标签本身具备跨域特性的特点。修改上述例子后：

```html
<!-- index.html -->
<body>
    <button>submit</button>
    <p></p>

    <script>
        //  1. 通过jsonp
        function fun(jsonString) {
            let p = document.querySelector('p');
            p.innerText = jsonString;
        }

        let btn = document.querySelector('button')
        btn.addEventListener('click', function () {
            let script = document.createElement('script');

            script.src = "http://127.0.0.1:12345/jsonp"
            document.body.appendChild(script)
        }, false)
    </script>
</body>
```

```js
// server.js
const express = require('express')

const app = express()
const port = 12345

app.get('/jsonp', (request, response) => {
    let resData = "hello jsonp"
    response.send(`fun(${JSON.stringify(resData)})`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

此时即使使用file协议也可以获取后端信息。

![image-20220712111939852](C:\Users\j30022312\AppData\Roaming\Typora\typora-user-images\image-20220712111939852.png)

### 30 跨域请求解决方案--CORS

通过在服务端中增加头信息，来增加允许跨域的path



