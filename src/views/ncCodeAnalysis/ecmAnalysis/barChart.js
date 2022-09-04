import React, { Component } from 'react'
import * as echarts from 'echarts'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '功率(W)',
          nameLocation: 'middle'
        },
        yAxis: {
          type: 'category',
          data: ['X轴切削', 'Y轴切削', 'X-Y轴切削', '圆弧切削']
        },
        series: [
          {
            name: '待机功率',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134]
          },
          {
            name: '主轴功率',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234]
          },
          {
            name: '进给功率',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154]
          },
          {
            name: '切削功率',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934]
          }
        ]
      }
    }
  }

  componentDidMount() {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    this.setState({
      myChart: myChart
    })
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    return (
      <div id='main' style={{ width: 480, height: 250 }}></div>
    )
  }
}
export default BarChart
