window.addEventListener('load', function () {
  // 1. 获取元素
  var border_bottom = document.querySelector('.border_bottom')
  var slide_module = document.querySelector('.slide_module')
  var the_a = slide_module.querySelectorAll('a')
  // 2. 给所有的a绑定事件 
  // 这个current 做为border_bottom的起始位置
  var current = 0
  for (var i = 0; i < the_a.length; i++) {
    // (1) 鼠标经过把当前a 的位置做为目标值
    the_a[i].addEventListener('mouseenter', function () {
      // border_bottom.style.width = the_a.width + 'px'
      animate(border_bottom, this.offsetLeft)
    })

    // (2) 鼠标离开就回到起始的位置 
    the_a[i].addEventListener('mouseleave', function () {
      animate(border_bottom, current)
    })

    // (3) 当鼠标点击，就把当前位置做为目标值
    the_a[i].addEventListener('click', function () {
      current = this.offsetLeft
    })

  }
})