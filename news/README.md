
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## 制作首页中的App组件
1. 制作header区域用的是mint-ui的header组件
2. 底部的Tabbar区域使用的是mui的tabbar.html 
  + 在制作购物车小图标的时候步骤多一点，
  + 先把 扩展图标的css样式，拷贝到 项目中，
  + 还要拷贝我们的扩展字体库 ttf文件
  + 为购物车小图标 添加如下样式mui-icon mui-icon-extra mui-icon-extra-cart
3. 在中间区域放置一个router-view来展示路由组件
## 改造tabbar 为router—link

## 设置路由高亮

## 点击tabbar中的路由连接，展示各自路由组件

## 新闻资讯页面的制作
1. 绘制页面，使用的是mui的media-list
2. 使用vue-resource获取数据
3. 渲染真实数据