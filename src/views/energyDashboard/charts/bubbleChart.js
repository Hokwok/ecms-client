import React, { Component } from 'react'
import * as echarts from 'echarts'
import { Loading } from '@jiaminghi/data-view-react'

const schema = [
  { name: 'order', index: 0, text: '实验' },
  { name: 'Time(s)', index: 1, text: 'Time' },
  { name: 'Ra(μm)', index: 2, text: 'Ra' },
  { name: 'SEC', index: 4, text: 'SEC' },
  { name: 'P(W)', index: 5, text: 'P' },
  { name: '能效值', index: 3, text: '能效值' },
  { name: 'test2', index: 6, text: '测试2' }
]
const itemStyle = {
  opacity: 0.8,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0,0,0,0.3)'
}
class BubbleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orBubbleChartShow: false,
      myChart: null,
      option: {
        title: {
          text: '能量气泡图',
          left: 'left',
          top: 10,
          textStyle: {
            fontSize: 15
          }
        },
        color: ['#dd4444'],
        grid: {
          left: '10%',
          right: 150,
          top: '18%',
          bottom: '10%'
        },
        backgroundColor: '', // 设置无背景色
        tooltip: {
          // color: 'green',
          backgroundColor: 'rgba(255,255,255,0.7)',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, .2)',
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          borderRadius: 4,
          borderWidth: 1,
          axisPointer: {
            type: 'line',
            axis: 'auto',
            animation: 'auto',
            animationDurationUpdate: 200,
            animationEasingUpdate: 'exponentialOut',
            crossStyle: {
              color: '#999',
              width: 1,
              type: 'dashed'
            }
          },
          textStyle: {
            color: '#666'
          },
          formatter: function(param) {
            var value = param.value
            // prettier-ignore
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
             param.seriesName + ' ' + value[0] + '：' +
             value[7] +
             '</div>' +
             schema[1].text + '：' + value[4] + '(s)<br>' +
             schema[2].text + '：' + value[1] + '(μm)<br>' +
             schema[3].text + '：' + value[2] + '(J/mm³)<br>' +
             schema[4].text + '：' + value[3] + '(W)<br>' +
             schema[5].text + '：' + value[6] + '%<br>'
          }
        },
        xAxis: {
          type: 'value',
          name: 'Order',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 12
          },
          max: 30,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'Ra(μm)',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            fontSize: 12
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '5%',
            dimension: 2,
            min: 0,
            max: 650,
            itemWidth: 30,
            itemHeight: 70,
            calculable: true,
            precision: 1,
            text: ['圆形大小：SEC值(J/mm³)'],
            textGap: 30,
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          },
          {
            left: 'right',
            bottom: '6%',
            dimension: 6,
            min: 0,
            max: 13,
            itemHeight: 120,
            text: ['明暗：能效η值(%)'],
            textGap: 20,
            inRange: {
              colorLightness: [0.9, 0.5]
            },
            outOfRange: {
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          }
        ],
        series: [
          {
            name: '实验',
            type: 'scatter',
            itemStyle: itemStyle,
            data: []
          }
        ]
      }
    }
  }

  componentDidMount() {
    const me = this
    setTimeout(function() {
      const option = me.state.option
      option.series[0].data = me.props.bubbleData
      me.setState({
        orBubbleChartShow: true,
        option
      })
    }, 1000) // 处理异步
    setTimeout(function() {
      if (me.state.orBubbleChartShow === true) {
        var chartDom = document.getElementById('main2')
        var myChart = echarts.init(chartDom, 'dark')
        me.setState({
          myChart: myChart
        })
      }
    }, 1500)
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    if (this.state.orBubbleChartShow === true) {
      return (
        <div id='main2' style={{ width: 340, height: 360 }}></div>
      )
    } else {
      return (
        <Loading style={{ color: 'white' }}>Loading...</Loading>
      )
    }
  }
}
export default BubbleChart
