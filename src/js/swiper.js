window.addEventListener('load', function () {
  // 获取元素
  var arrow_l = document.querySelector('.arrow_l')
  var arrow_r = document.querySelector('.arrow_r')
  var swiper = document.querySelector('.swiper')
  var swiperWidth = swiper.offsetWidth
  // 鼠标经过swiper 就显示/隐藏左右按钮
  swiper.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block'
    arrow_r.style.display = 'block'
    clearInterval(timer)
    timer = null; // 清除定时器变量
  })
  swiper.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none'
    arrow_r.style.display = 'none'
    // 鼠标离开2秒后,系统自动点击右箭头播放轮播图
    timer = setInterval(function () {
      arrow_r.click()
    }, 2000)
  })
  // 生成小圆圈
  var ul = swiper.querySelector('ul')
  var ol = swiper.querySelector('.circle')
  for (var i = 0; i < ul.children.length; i++) {
    // 创建li元素
    var li = document.createElement('li')
    // 给li设置一个名为index的自定义属性
    li.setAttribute('index', i)
    // 将li插入到ol中
    ol.appendChild(li)
    // 给小圆圈绑定点击事件    
    li.addEventListener('click', function () {
      // 清除所有小圆圈的current类名(current是被点击的样式)
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      // 当前点击的li获取current样式
      this.className = 'current'

      // 点击小圆圈,移动图片事件
      // 获得li的自定义属性index
      var index = this.getAttribute('index')

      // 控制按钮
      num = index

      // 控制小圆圈
      circle = index

      // 调用动画函数来处理轮播图效果 图片移动距离为 图片编号*图片宽度
      animate(ul, -index * swiperWidth)
    })
  }
  // 将ol里第一个li设为current
  ol.children[0].className = 'current'


  // 无缝滚动
  // 将第一张图片复制到最后
  var first_img = ul.children[0].cloneNode(true)
  ul.appendChild(first_img)


  // 点击右按钮事件
  var num = 0
  // circle控制小圆圈的播放
  var circle = 0
  // flag 节流阀 (防止疯狂点击导致图片疯狂滚动)
  var flag = true
  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false // 关闭节流阀
      // 判断:如果走到了最后一张图片, ul就要快速复原 left = 0
      if (num == ul.children.length - 1) {
        ul.style.left = 0
        num = 0
      }
      num++
      animate(ul, -num * swiperWidth, function () {
        // 开启节流阀
        flag = true
      })
      // 控制小圆圈的动画
      circle++
      // 如果circle等于ol.children.length  说明图片已经走完,需要复原小圆圈
      if (circle == ol.children.length) {
        circle = 0
      }
      // 调用函数
      circleChange()
    }
  })

  // 左侧按钮事件

  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false
      if (num == 0) {
        num = ul.children.length - 1
        ul.style.left = -num * swiperWidth + 'px'
      }

      num--

      animate(ul, -num * swiperWidth, function () {
        // 开启节流阀
        flag = true
      });
      // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle--
      // 如果circle < 0  说明第一张图片，则小圆圈要改为第6个小圆圈（5）
      // if (circle < 0) {
      //     circle = ol.children.length - 1;
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle
      // 调用函数
      circleChange()
    }
  })

  function circleChange() {
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = 'current';
  }
  //  自动播放轮播图
  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
})