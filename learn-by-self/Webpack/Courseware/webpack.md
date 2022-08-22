# Webpack





1. 如果文件夹出现嵌套，node_modules安装在最外层文件夹中，此时，无法直接运行webpack。
   (1) 但是，此时可以跳转到webpack.config.js路径后，可以运行../node_modules/.bin/webpack.js来使用webpack
   (2) 或者直接使用npx webpack来使用webpack



### 构建环境

1. 为什么要搭建生产环境？

   生产环境时，会①对文件进行压缩，②调整兼容性，③将css打包到js文件中。

2. 如何搭建生产环境

   1. 由于直接打包时，会将样式文件打包到js文件中，所以需要通过mini-css-extract-plugin插件来分离css文件。



### 提取css成单独文件（仅适用于Webpack4）

1. 为什么要拆分出单独css文件？
   1. 在webpack5时使用样式loader会自动将样式文件分离。
2. 提取js中的css成单独文件？适用于字符串中插入样式情况？

 

