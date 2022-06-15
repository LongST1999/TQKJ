var rightXmlRe = new XMLHttpRequest(); //创建xmlre对象
rightXmlRe.open('GET', 'https://edu.telking.com/api/?type=week', true); //打开连接
rightXmlRe.send(); //发送请求
rightXmlRe.onreadystatechange = function () { //请求完成
  if (rightXmlRe.status == 200 && rightXmlRe.readyState == 4) { // 交互成功  &&  响应已完成
    var rightData = JSON.parse(rightXmlRe.response); //转换数据
    rightData = rightData['data'];
    var rightName = [];
    var rightValue = [];
    for (i = 0; i < rightData['series'].length; i++) { // 遍历数据
      rightName.push(rightData['xAxis'][i])
      rightValue.push(rightData['series'][i])
    }
    // console.log(rightName);

    var myRightChart = echarts.init(document.querySelector('.r_data_box'));

    var rightOption = {
      xAxis: {
        type: 'category',
        //x轴数据
        data: []
      },
      yAxis: {
        type: 'value'
      },
      title: {
        text: '柱状图数据展示',
        left: 'center'
      },
      tooltip: {},
      series: [{
        type: 'bar',
        data: []
      }]
    };
    rightOption.xAxis.data = rightName
    rightOption.series[0].data = rightValue
    myRightChart.setOption(rightOption);
  }
}