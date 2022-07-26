1. 如果文件夹出现嵌套，node_modules安装在最外层文件夹中，此时，无法直接运行webpack。
   (1) 但是，此时可以跳转到webpack.config.js路径后，可以运行../node_modules/.bin/webpack.js来使用webpack
   (2) 或者直接使用npx webpack来使用webpack