import React, { Component } from 'react'
import * as echarts from 'echarts'

const dataBJ = [
  [1, 0.99, 637.5, 850, 34.8, null, 5.1, '低能效'],
  [2, 0.78, 282.7, 848, 34.8, null, 6.9, '低能效'],
  [3, 0.36, 157.5, 840, 34.8, null, 8.4, '高能效'],
  [4, 0.94, 455.3, 850, 24.8, null, 5.7, '低能效'],
  [5, 0.62, 201.9, 848, 24.8, null, 7.6, '中间能效'],
  [6, 0.75, 111.8, 835, 24.8, null, 9.0, '高能效'],
  [7, 1.00, 353.3, 848, 19.3, null, 5.9, '低能效'],
  [8, 0.60, 157.4, 850, 19.3, null, 8.5, '高能效'],
  [9, 0.56, 87.5, 840, 19.3, null, 9.4, '高能效'],
  [10, 0.41, 390.0, 780, 34.8, null, 5.8, '低能效'],
  [11, 0.38, 193.7, 775, 34.8, null, 7.7, '中间能效'],
  [12, 0.47, 288.7, 770, 34.8, null, 6.8, '低能效'],
  [13, 0.65, 276.7, 775, 24.8, null, 7.1, '低能效'],
  [14, 0.37, 137.1, 768, 24.8, null, 8.6, '高能效'],
  [15, 0.38, 207.5, 775, 24.8, null, 7.5, '中间能效'],
  [16, 0.68, 213.6, 769, 19.3, null, 7.3, '中间能效'],
  [17, 0.54, 106.2, 765, 19.3, null, 9.4, '高能效'],
  [18, 0.41, 159.3, 765, 19.3, null, 8.4, '中间能效'],
  [19, 0.40, 273.4, 730, 34.8, null, 7.2, '低能效'],
  [20, 0.46, 366.5, 733, 34.8, null, 6.4, '低能效'],
  [21, 0.55, 182.0, 728, 34.8, null, 8.3, '中间能效'],
  [22, 0.33, 196.7, 734, 24.8, null, 7.6, '中间能效'],
  [23, 0.39, 262.5, 735, 24.8, null, 6.9, '中间能效'],
  [24, 0.41, 129.4, 725, 24.8, null, 9.5, '高能效'],
  [25, 0.59, 151.6, 728, 19.3, null, 8.5, '高能效'],
  [26, 0.58, 204.1, 735, 19.3, null, 7.5, '中间能效'],
  [27, 0.67, 101.3, 730, 19.3, null, 11.7, '高能效']
]
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
      myChart: null,
      option: {
        title: {
          text: '能量气泡图',
          left: 'center',
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
            fontSize: 15
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
            fontSize: 15
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
            max: 12,
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
            data: dataBJ
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
      <div id='main2' style={{ width: 520, height: 400 }}></div>
    )
  }
}
export default BubbleChart
