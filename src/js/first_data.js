var firstXmlRe = new XMLHttpRequest(); //创建xmlre对象
firstXmlRe.open('GET', 'https://edu.telking.com/api/?type=month', true); //打开连接
firstXmlRe.send(); //发送请求
firstXmlRe.onreadystatechange = function () { //请求完成
  if (firstXmlRe.status == 200 && firstXmlRe.readyState == 4) { // 交互成功  &&  响应已完成
    var firstData = JSON.parse(firstXmlRe.response); //转换数据
    firstData = firstData['data'];

    var firstName = [];
    var firstValue = [];
    for (i = 0; i < firstData['series'].length; i++) { // 遍历数据
      firstName.push(firstData['xAxis'][i]);
      firstValue.push(firstData['series'][i]);
    }
    console.log(firstName);
    // console.log(firstRes[Object.keys(firstRes)[0]]);

    var myFirstChart = echarts.init(document.querySelector('.first_data_box'));

    var firstOption = {
      title: {
        text: '折线图数据展示',
        left: 'center'
      },
      tooltip: {},
      legend: { // 图例
        top: 'bottom'
      },
      xAxis: {
        type: 'category',
        //x轴数据
        data: []
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {},
      series: [{
        type: 'line',
        smooth: true,
        data: []
      }]
    };
    firstOption.xAxis.data = firstName
    firstOption.series[0].data = firstValue

    myFirstChart.setOption(firstOption);
  }
}