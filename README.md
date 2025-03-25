# 机试题

注：
1. 使用 `vue3 setup` 语法
2. 不限制 script 语言，`ts` 更佳
3. 对于`vue、pinia、router`等相关API，无需引入，直接使用即可
4. 仅可使用已经安装的插件，不可安装其他插件
5. 可查阅相关文档，但不能直接拷贝网络代码，不查阅更佳
6. 限时`30`分钟，超时亦可继续完成

可能参考的文档：

[vue3](https://v3.vuejs.org/)、[vue-router](https://router.vuejs.org/)、[pinia](https://pinia.vuejs.org/)、[axios](https://axios-http.com/)、[echarts](https://echarts.apache.org/zh/index.html)、[arcgis](https://developers.arcgis.com/javascript/latest/)

## 1、项目配置

1. axios请求配置
   - [点击前往](./src/utils/request.ts)
   - 完善请求实例
     - 基础请求地址为`/api`
     - 请求超时时间为`10s`
     - 默认请求头：`'Content-Type': 'application/json;charset=UTF-8'`
   - 完善请求拦截器
     - token存在时请求携带token，请求头为`Blade-Auth`，值存在于`会话存储`中，名为`token`
2. 配置请求代理
   - [点击前往](./vite.config.ts)
   - 代理地址为`http://192.168.1.111:8020`
   - 代理路径为`/api`，重写为 ''

## 2、完善index页面

1. 使用`position`，将 header、footer、aside 分布定位在页面的`上、下、左、右`
2. 使用`flex`布局，将`main` 居中展示
3. 使用`grid`布局，将 main 分为`两行两列`

## 3、完善hook

1. [点击前往](./src/hooks/mouse.ts)
2. 获取鼠标实时位置
3. 在[child-one](./src/pages/components/child-one.vue)的中使用并展示

## 4、完善store

1. [点击前往](./src/stores/user.ts)
2. 使用`setup`写法，创建`useUserStore`模块
   - `state`：`userInfo`，初始值为`{name: "小明", age: 18}`
   - `getter`：`userName`，值为`userInfo`的`name`
   - `action`：`setName`，参数为新名字，用于修改`userInfo`的`name`
3. 在[child-two](./src/pages/components/child-two.vue)中
   - input框初始值为[App.vue](./src/App.vue)中提化的`provideVal`
   - 当输入框失去焦点时，修改store中`userInfo`的`name`

## 5、完善echarts图表

1. [点击前往](./src/pages/components/child-three.vue)
2. 完善option，展示折线图与柱状图

## 6. arcgis for js 使用

1. [点击前往](./src/pages/components/child-four.vue)
2. 完善地图的展示
   - 添加地图图层（已创建）
   - 设置地图缩放级别：`10`
   - 设置地图中心点：`120.472771,36.145965`
3. 监听地图`点击`事件，打印点击位置的`经纬度`
4. 在地图上添加一个`点`要素
   - 点要素坐标：`120.472771,36.145965`
   - 点要素的符号类型为图片，图片为`@/src/assets/logo.svg`

## 7、数据处理

1. 树形数据组装
2. 入参为扁平数据，包含 id 和 parentId，及其他属性
3. 根据 parentId 组装成树形数据
4. 例如：

```js
// 初始数据为
const arr = [
  { id: 1, parentId: null, name: 'A' },
  { id: 2, parentId: 1, name: 'B' },
  { id: 3, parentId: 1, name: 'C' },
  { id: 4, parentId: 2, name: 'D' },
  { id: 5, parentId: null, name: 'E' },
];

// 输出数据为
const tree = [
  {
    id: 1,
    parentId: null,
    name: 'A',
    children: [
      {
        id: 2,
        parentId: 1,
        name: 'B',
        children: [
          {
            id: 4,
            parentId: 2,
            name: 'D',
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: 'C',
      },
    ],
  },
  {
    id: 5,
    parentId: null,
    name: 'E',
  },
];
```

```js
// 在此处完成

```
