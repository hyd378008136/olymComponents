# olymComponents
奥林前端工程组件库

## 奥林大掌柜物理服务有限公司前端规范

### 1.工程目录结构

``` 
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

### 2.代码规范

#### 2.1 名称方式

* 组件名称：大驼峰

- 属性名称：小驼峰

- 事件处理函数：handleSomething

- 自定义事件属性名称：onSomething={this.handleSomething}

- key: 不能使用数组 index ，构造或使用唯一的 id

- 组件方法名称：避免使用下划线开头的命名

  

#### 2.2 代码风格


* 缩进
​       2个空格（重点）
* 空格
​       Object的花括号要加1个空格，react的转义不用空格
* 对齐

  ``` jsx
  // bad
  <Foo superLongParam="bar"
       anotherSuperLongParam="baz" />
  
  // good
  <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
  />
  
  // if props fit in one line then keep it on the same line
  <Foo bar="bar" />
  ```

* 返回

  ``` jsx
  // bad
  render() {
    return <MyComponent className="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }
  
  // good
  render() {
    return (
      <MyComponent className="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }
  
  // good, when single line
  render() {
    const body = <div>hello</div>;
    return <MyComponent>{body}</MyComponent>;
  }
  ```

  

#### 2.3 注释

- 行内注释建议换行，并在所指示的语句之前

- 紧跟语句的注释需空两格

- 行内注释双斜杠与注释内容间需空一格

- 注释内容需为完整语句，中英文和数字间需空一格

  ``` jsx
  for ( let i = 0; i < 100; i++ ) {
    // This is a comment.
    console.log( 'Print something.' );  // 这又是一个注释。
    // 中文与 English 相结合的注释，带数字 300166 的例子。
  }
  ```

  

#### 2.4 array遍历

* array

  ``` jsx
  // 不需要 break 的情况下建议使用
  myArray.forEach((value) => {
    console.log(value);
  });
  ```

  ``` jsx
  // 需要 break 情况下使用
  for (let value of myArray) {
    console.log(value);
    if(value == '') {
      // break;
      // continue;
      // return;  
    }
  }
  
  for(let [index, value] of myArray.entries()) { 
    console.log(index, value)
  }
  ```



#### 2.5 function 传参

* 3个及以上， 使用对象封装传参

#### 2.6 包管理器

* 统一使用 yarn

### 3.组件通信处理

#### 3.1 父子组件

* 子调用父，通过props方式传递参数和方法

* 父调用子方法

  * 简单的调用（个数较少，不超过3个），直接ref方式调用

    ``` jsx
    // 用 adForm 的情况下 使用 wrappedComponentRef
    <TemplateInfo 
      dataSource={dataSource} 
      wrappedComponentRef={instance => { this.templateInfo = instance }} 
    />
    
    // 普通情况下 使用 ref
    <TemplateInfo 
      dataSource={dataSource} 
      ref={instance => { this.templateInfo = instance }} 
    />
    
    // 当用 Redux 时，需要 设置 withRef：true
    export default connect(mapStateToProps, null, null, { withRef: true })(CommonInfo)
    
    save = () => {
      // 调用子组件的 saveValidation 方法
      this.templateInfo.saveValidation();
    }
    ```

    

  * 复杂调用（个数超过3个），使用注册方式，使用方式：待完善

#### 3.2 兄弟组件

* 使用Redux

### 4.TODO LIST

#### 4.1 hocform 方案验证

#### 4.2 table 组件重构