# imgLazyLoad
原生JS实现的图片懒加载插件，默认加载首屏图片，滚动防抖(250ms)
+ 给需要懒加载的 img 图片添加 `imgLazyLoad` 类名
+ 图片真正的 src 放置于 `data-original` 标签内
+ 兼容性：ALL
+ 支持动态添加的图片也懒加载
+ 采用了滚动防抖优化(250ms)

### Usage
```javascript
  // 初始化
  var lazyLoad = new imgLazyLoad();
  // 如若动态添加的图片也需要懒加载 , arr 为动态添加的图片数组的 DOM 对象
  lazyLoad.dynamic(arr);
```

## MIT
License
