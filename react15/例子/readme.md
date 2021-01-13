## 说明

本demo包含App.jsx、PageA.jsx、PageB.jsx共三个页面。

webpack方面，只进行了development的配置，包括编译jsx语法的`@babel/preset-react`、编译es6的`@babel/preset-env`的babel预设，HMR及简单的bundle输出。

modules文件夹为react项目执行gulp任务之后得到的源代码。

## 执行

首先使用npm 或 yarn 安装依赖

使用yarn start运行demo

使用yarn build生成bundle