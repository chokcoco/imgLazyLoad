;/*!/static/js/index.js*/
;/*!/static/js/index.js*/
;/*!/static/js/index.js*/
/**
 * @author Coco
 * QQ:308695699
 * @name  imgLazyLoad 1.0.0
 * @description 原生JS实现的图片懒加载插件，默认加载首屏图片，实现了滚动防抖(250ms)
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 1、给需要懒加载的 img 图片添加 imgLazyLoad 类名
 *
 * 2、图片真正的 src 放置于 data-original 标签内
 *
 * 3、初始化方法 imgLazyLoad();
 *
 * 4、动态添加的图片也需要懒加载 , arr 为动态添加的图片数组的DOM对象
 *    var lazyLoad = new imgLazyLoad();
 *    lazyLoad.dynamic(arr);
 *
 * 5、兼容性：ALL
 *
 */
(function(window, undifined) {
  var
  // 需要 lazyload 的 img 元素集合
    lazyImgs = [],
    // lazyload img 的长度
    imgLength = 0,
    // 视口高度
    innerHeight = window.innerHeight || document.documentElement.clientHeight,
    // 节流阀
    lazyLoadTimerId = null,
    // 初始化方法
    imgLazyLoad = function() {
      return imgLazyLoad.prototype.init();
    }

  /**
   * 设置图片距离页面顶部的距离
   * @param {[Array]} dynamicArr [传入arr表示只设置传入的数组当中的图片]
   */
  function setOffSetTop(dynamicArr) {
    var k = 0,
      // 参数长度
      argLength = arguments.length;

    // 未传参
    if(argLength == 0){
      // 取到所有 class 为 imgLazyLoad 的标签
      if (document.querySelectorAll) {
        lazyImgs = document.querySelectorAll('.imgLazyLoad');
        // 兼容 IE7/8
      } else {
        var imgs = document.getElementsByTagName('img'),
          length = imgs.length,
          i = 0,
          regExp = /^imgLazyLoad$/;

        for (; i < length; i++) {
          var elem = imgs[i],
            // getAttribute('class') 在 IE67 下表现为 getAttribute('className')
            classNames = elem.getAttribute('className'),
            arr = classNames.split(" "),
            classLength = arr.length,
            j = 0;

          for (; j < classLength; j++) {
            if (regExp.test(arr[j])) {
              lazyImgs.push(elem);
              break;
            }
          }
        }
      }
    }else{
      var arrLength = dynamicArr.length,
        k = 0;

      lazyImgs = Array.prototype.slice.call(lazyImgs);
      for(; k<arrLength; k++){
        var newElem = dynamicArr[k];

        lazyImgs.push(newElem);
      }
    }

    imgLength = lazyImgs.length;

    for (; k < imgLength; k++) {
      // console.log(typeof lazyImgs[k])
      var curElem = lazyImgs[k];

      // 是否已经设置了 data-offsetTop
      if(curElem.getAttribute('data-offsetTop') == null){
        var top = curElem.getBoundingClientRect().top;

        lazyImgs[k].setAttribute('data-offsetTop', top);
        lazyImgs[k].setAttribute('isShow', false);
      }else{
        continue;
      }
    }
  }

  // 判断图片是否显示
  function isShow(scrollTop) {

    var scrollTop = scrollTop || 0,
      i = 0;

    for (; i < imgLength; i++) {
      var elem = lazyImgs[i],
        isShow = elem.getAttribute('isShow'),
        top = elem.getAttribute('data-offsetTop') - scrollTop;

      if (isShow === true) {
        continue;
      }

      if (top < innerHeight) {
        var imgSrc = elem.getAttribute('data-original');

        elem.setAttribute('src', imgSrc);
        elem.setAttribute('isShow', true);
      }
    }
  }

  // 设置滚动监听
  // 滚动节流阀
  function scrollThrottle() {
    if (window.addEventListener) {
      window.addEventListener("scroll", srcollSetTimeout, false);
    } else {
      window.attachEvent("onscroll", srcollSetTimeout);
    }

  }

  // 节流函数
  // 250ms 触发一次
  function srcollSetTimeout() {
    clearTimeout(lazyLoadTimerId);

    lazyLoadTimerId = setTimeout(function() {
      var scrollTop = getScrollTop();
      isShow(scrollTop);
    }, 250);
  }


  // 获取滚动条距离顶端的距离
  // 支持 IE6+
  function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
      scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
      scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollPos = document.body.scrollTop;
    }
    return scrollPos;
  }

  // 初始化方法
  imgLazyLoad.prototype.init = function() {
    setOffSetTop();
    isShow();
    scrollThrottle();
  }

  // 动态添加新图片结点
  imgLazyLoad.prototype.dynamic = function(arr){
    setOffSetTop(arr);
    isShow();
  }

  // 暴露对象
  window.imgLazyLoad = imgLazyLoad;
})(window);
