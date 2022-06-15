var xmlRe = new XMLHttpRequest(); //创建xmlre对象
xmlRe.open('GET', 'https://edu.telking.com/api/?type=week', true); //打开连接
xmlRe.send(); //发送请求
xmlRe.onreadystatechange = function () { //请求完成
  if (xmlRe.status == 200 && xmlRe.readyState == 4) { // 交互成功  &&  响应已完成
    var data = JSON.parse(xmlRe.response); //转换数据
    data = data['data'];
    var res = [];
    for (i = 0; i < data['series'].length; i++) { // 遍历数据
      res.push({
        name: data['xAxis'][i],
        value: data['series'][i]
      });
    }
    // console.log(res);

    var myLeftChart = echarts.init(document.querySelector('.l_data_box'));

    var leftOption = {
      title: {
        text: '饼状图数据展示',
        left: 'center'
      },
      tooltip: {},
      legend: { // 图例
        top: 'bottom'
      },
      series: [{
        type: 'pie',
        radius: '50%',
        data: res
      }]
    };

    myLeftChart.setOption(leftOption);
  }
}