# olymComponents
奥林前端工程组件库

## 奥林大掌柜物理服务有限公司前端规范

### 1.工程目录结构

``` 
// 参考
+-- build
|   +-- build.js
|   +-- check-version.js
|   +-- compress-js.js
|   +-- server.js
|   +-- utils.js
|   +-- webpack.base.conf.js
|   +-- webpack.build.conf.js
|   +-- webpack.dev.conf.js
|   +-- webpack.build.conf.js
|   +-- webpack.prod.conf.js
|   +-- webpack.test.conf.js
+-- config
|   +-- build.env.js
|   +-- dev.env.js
|   +-- index.js
|   +-- prod.env.js
|   +-- test.env.js
+-- src
|   +-- actions
|   +-- components     // 具有一定通用性，被多个containers引用的
|   |   +-- ComponentA      
|   |   |   +-- ComponentA.jsx 
|   |   |   +-- ComponentA.less 
|   |   ...
|   +-- containers     // 各业务页面
|   |   +-- PageA      
|   |   |   +-- PageA.jsx 
|   |   |   +-- PageA.less 
|   |   ...
|   +-- reducers
|   +-- router
|   +-- util           // 统一放工具类
|   +-- app.jsx
|   +-- index.html
|   +-- main.jsx
+-- static
|   +-- assets
|   +-- common
|   +-- style   
+-- .babelrc
+-- .gitignore
+-- package-lock.json
+-- package.json
+-- webpack.config.js
+-- yarn.lock
```