# 机试题

注：
1. 可使用UI组件 [element-plus](https://element-plus.org/zh-CN/component/overview.html)
2. 可使用 [unocss](https://alfred-skyblue.github.io/unocss-docs-cn/) 完成样式
3. 使用 `vue3 setup` 语法
4. 不限制 script 语言，`ts` 更佳
5. 可使用已经安装的插件，也可安装其他插件（开源、稳定）
6. 可查阅相关文档，但不能直接拷贝网络代码，不查阅更佳
7. 限时`30`分钟，1、2、4、7、8 为必做题，其他为选做题

## 1、更改项目配置

1. 配置启动端口为 `8010`
2. 配置`项目启动时打开浏览器窗口`
3. 配置项目代理
    - 代理地址为`http://192.168.1.111:8020`
    - 代理路径为`/api`
    - 代理路径重写为``
4. 启动项目
5. 请求配置，`src/utils/request.ts`
   - 使用`axios`库，创建请求实例
     - 配置请求超时时间为`10s`
     - 基础请求地址为`/api`
     - 添加默认请求头：
       - `Content-Type`：`application/json;charset=UTF-8`
       - `Accept`：`application/json, text/plain, */*`
   - 创建请求拦截器
     - 请求携带token，请求头为`Blade-Auth`，值存在于`cookie`中，名为`token`
   - 创建响应拦截器
     - 如果后台响应数据失败，提示`msg`
     - 如果http请求失败，提示`请求失败`

```json5
// 后台返回数据格式
{
  "code": 200, // 200表示成功，其他表示失败
  "msg": "请求成功",
  "data": {}
}
```

## 2、完善index页面

1. 使用`position`，将 header、footer、aside 分布定位在页面的`上、下、左右`
2. 使用`flex`布局，将`main`、居中展示
3. 使用`grid`布局，将 main 分为`两行三列`，为子元素添加边框，边框不能重复
4. main的所有子元素均使用组件完成（下面4-9）

## 3、完成hook

1. 获取鼠标实时位置
2. 在`src/hooks`目录下完成
3. 鼠标位置展示在 `main` 的`第一个`子元素中
4. 使用eventBus方式完成：当鼠标在的 `main第二个` 子元素内时，当前元素的背景色为`#f00`，否则为`#0f0`

## 4、创建store

1. 在 `/src/store` 目录下完成
2. 使用`setup`写法，创建`user`模块
   - `state`：`userInfo`，初始值为`{name: "小明", age: 18}`
   - `getter`：`userName`，值为`userInfo`的`name`
   - `action`：`setName`，参数为新名字，修改`userInfo`的`name`
3. 在`main`的`第二个`子元素中，创建原生`input`输入框
   - 初始值为store中的`userName`
   - 当输入框失去焦点时，修改`userInfo`的`name`
4. 使用`option`写法，创建`counter`模块
   - `state`：`count`，初始值为`0`
5. 在`main`的`第二个`子元素中，创建`el-input`
  - 通过解构的方式，获取store中`count`值
  - 将`count`值绑定到`el-input`

## 5、编写一个echarts图表

1. 在 main 的`第三个`子元素完成echarts图表展示
2. 类型为`柱状图`与`折线图`并存，
3. x轴为`类目轴`，y轴为`数值轴`
4. 柱状图为`#f00`，折线图为`#0f0`
5. 设置动画：每隔 3s，tooltip 切换位置展示
6. 数据自拟5条

## 6、完成css

1. 在 main 的`第四个`子元素中创建一个宽为100像素，`宽高比为16:9` 的 div
2. 为div添加动画：使用`@keyframes`完成绕中心自动旋转
3. 给div添加任意渐变背景色，添加任意阴影

## 7、组件通讯

1. 在 main 的`第五个`子元素中，接受`App.vue`提供的`provideVal`并展示
2. 为当前组件，创建一个子组件`child-one.vue`
   - 创建一个`ref`变量`text`，值为`父组件值`
   - 与该子组件进行双向绑定，传递`text`值
   - 该子组件可通过`el-input`框修改直接修改`text`的值
3. 为当前组件，创建一个子组件`child-two.vue`
   - 为该子组件提供方法：`setText`，接受一个参数用于修改`text`的值
   - 为该子组件添加`el-button`，点击按钮时，修改父组件`text`的值为`来自子组件2的修改`
4. 为当前组件，创建一个子组件`child-three.vue`
   - 在该子组件中，接受`App.vue`提供的`provideVal`
   - 在该子组件中添加方法`setProvideVal`，修改`provideVal`为`'APP'`
   - 在父组件中，调用该子组件的`setProvideVal`方法

## 8、数据展示路由跳转

1. 在 main 的`第六个`子元素中，使用`v-for`进行数据展示
2. 需要展示的字段（数据见后方）：
   - `index`: 序号
   - `name`：姓名
   - `gender`：性别
   - `详情`按钮：点击后跳往动态路由`/detail/:id`,传递params`id`
   - 样式自定
3. 在`src/detail/[id].vue`文件中，接受params`id`并展示
4. 在`src/detail/[id].vue`文件中，创建一个`el-button`，点击后返回上一路由
5. 在路由`/detail/:id`卸载时，清除`localStorage`中`local`的值

```js
const data = [
  {
    name: '张三',
    gender: 1, // 1男 0女
  },
  {
    name: '李四',
    gender: 0, // 1男 0女
  },
  {
    name: '李四',
    gender: null, // 1男 0女
  },
]
```

## 9、数据处理

1. 树形数据组装
2. 入参为扁平数据，包含 id 和 parentId，及其他属性
3. 根据 parentId 组装成树形数据

```js
// 在此处完成

```

## 10. arcgis for js 基础使用

1. 在`src/pages`目录下创建`arcgis.vue`文件
2. 完成地图的展示
   - 地图中心点：`120.472771,36.145965`
   - 地图缩放级别：`10`
   - 地图图层地址：`https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer`
3. 在右下角添加`缩放`和`比例尺`控件
4. 监听地图点击事件，获取点击位置的经纬度，使用`el-message`提示
5. 在地图上添加一个`点`要素
   - 点要素坐标：`120.472771,36.145965`
   - 点要富豪类型为图片，图片位于`src/assets`目录下的`logo.svg`
