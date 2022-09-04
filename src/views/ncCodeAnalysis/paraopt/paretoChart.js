import React, { Component } from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'

class ParetoChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        title: {
          text: '3维立体图',
          left: 'center',
          align: 'right'
        },
        grid: {
          top: 0,
          left: 10,
          right: 10,
          bottom: 50
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        legend: {
          data: ['1'],
          show: false
        },
        xAxis3D: {
          name: 'X轴',
          type: 'value',
          min: 0,
          max: 3
        },
        yAxis3D: {
          name: 'Y轴',
          type: 'value',
          min: 0,
          max: 3
        },
        zAxis3D: {
          name: 'Z轴',
          type: 'value',
          min: 0,
          max: 3
        },
        grid3D: {
          viewControl: {
            beta: 45,
            alpha: 18,
            minDistance: 0,
            projection: 'orthographic',
            animation: false, // 这句话 要加，不然动画会卡住，影响展示
            minAlpha: -90, // 垂直旋转正交
            maxAlpha: 90 // 垂直旋转正交
          }
        },
        series: [
          {
            name: '1',
            type: 'scatter3D',
            itemStyle: {
              normal: {
                color: '#4876FF'
              }
            },
            // barSize: 0.3,
            animation: false,
            data: [[1, 2, 3], [1, 1, 1]]
          },
          {
            name: '1',
            type: 'bar3D',
            itemStyle: {
              normal: {
                color: '#4A708B'
              }
            },
            barSize: 0.3,
            animation: false,
            data: [[1, 2, 3], [1, 1, 1]]
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
    this.state.myChart && this.state.myChart.setOption(this.state.option, true)
    return (
      <div id='main' style={{ width: 520, height: 300 }}></div>
    )
  }
}
export default ParetoChart
