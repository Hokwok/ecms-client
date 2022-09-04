import React, { Component } from 'react'
import * as echarts from 'echarts'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        title: {
          text: '能耗分布情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '能耗分布',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '待机能耗' },
              { value: 580, name: '主轴能耗' },
              { value: 484, name: '进给能耗' },
              { value: 300, name: '切削能耗' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }

  componentDidMount() {
    var chartDom = document.getElementById('main2')
    var myChart = echarts.init(chartDom)
    this.setState({
      myChart: myChart
    })
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    return (
      <div id='main2' style={{ width: 480, height: 300 }}></div>
    )
  }
}
export default PieChart
