// 1. Vue生命周期-钩子函数
/*
    初始化
        beforeCreate --- 无法获取data/methods
        created      --- Vue实例创建完毕 (data和methods等等)
    挂载
        beforeMount  --- 无法获取"真实"DOM元素
        mounted      --- 组件挂载完毕, 可以获取到真实"DOM"
    更新
        beforeUpdate --- 挂载以后, data更新, 将要更新DOM之前
        updated      --- 获取更新"真实"DOM
    销毁 (组件从真实DOM上移除)
        beforeDestroy -- 手动清除 定时器 / 计时器 / eventBus的事件($off)
        destroyed     --- 已经销毁
*/

// 2. axios 
// 作用: 网路请求库
// 使用:
// (1): 下载axios
// (2): 引入axios
// (3): axios({})
/*
    axios({
        url: "请求地址",
        method: "请求方式",
        params: {
            后端参数名: 前端要传递值
        }, // 参数名和值, 会被axios拼接到url?后面 - 查询字符串
        data: {
            后端参数名: 前端要传递值
        } // 参数名和值, 会被axios拼接到请求体里
    })
*/
// (4): axios()原地返回Promise对象, then接收成功结果, catch接收失败的结果
// axios全局默认配置:
// axios.defaults.baseURL = "基地址http://ip:端口"
// 以后axios发起请求会在每次的url上面拼接这个地址再发起请求