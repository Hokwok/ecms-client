import React, { Component } from 'react'
import * as echarts from 'echarts'

const efficValue = 0.145
class AnnularPieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        tooltip: {
          trigger: 'item',
          show: false
        },
        color: ['green', '#ccc'],
        series: [
            {
              name: '',
              type: 'pie',
              center: ['50%', '50%'], // 饼图的圆心坐标
              radius: ['60%', '80%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: { //  饼图图形上的文本标签
                normal: { // normal 是图形在默认状态下的样式
                  show: true,
                  position: 'center',
                  fontWeight: 'bold',
                  formatter: ' {a|{d}%}\n{b|{b}}', // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
                  rich: {
                    a: {
                      color: '#03a9f4',
                      padding: [0, 10],
                      fontSize: 40
                    },
                    b: {
                      color: 'red',
                      padding: [0, 10],
                      fontSize: 20
                    }
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: efficValue * 100,
                name: '能效值',
                label: {
                  normal: {
                    show: true
                  }
                }
              },
              {
                value: 100 - (efficValue * 100),
                name: '正常',
                label: {
                  normal: {
                    show: false
                  }
                }
              }]
            }
        ]
      }
    }
  }

  componentDidMount() {
    var chartDom = document.getElementById('main3')
    var myChart = echarts.init(chartDom)
    this.setState({
      myChart: myChart
    })
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    return (
      <div id='main3' style={{ width: 450, height: 280 }}></div>
    )
  }
}
export default AnnularPieChart
