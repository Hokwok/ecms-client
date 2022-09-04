import React, { Component } from 'react'
import * as echarts from 'echarts'

const data1 = [
  ['实验1', 637.5],
  ['实验4', 455.36],
  ['实验10', 390],
  ['实验20', 366.5],
  ['实验7', 353.33],
  ['实验12', 288.75],
  ['实验2', 282.67],
  ['实验13', 276.79],
  ['实验19', 273.41],
  ['实验23', 262.5],
  ['实验16', 213.61],
  ['实验15', 207.59],
  ['实验26', 204.17],
  ['实验5', 201.9],
  ['实验22', 196.78],
  ['实验11', 193.75],
  ['实验21', 182],
  ['实验18', 159.38],
  ['实验3', 157.5],
  ['实验8', 157.41],
  ['实验25', 151.67],
  ['实验14', 137.14],
  ['实验24', 129.46],
  ['实验6', 111.83],
  ['实验17', 106.25],
  ['实验27', 101.39],
  ['实验9', 87.5]
]
const data2 = [
  ['实验1', 0.051753215],
  ['实验4', 0.057535349],
  ['实验10', 0.058080868],
  ['实验20', 0.064121362],
  ['实验7', 0.059935205],
  ['实验12', 0.068798745],
  ['实验2', 0.068930874],
  ['实验13', 0.071712763],
  ['实验19', 0.072602084],
  ['实验23', 0.069899529],
  ['实验16', 0.073503891],
  ['实验15', 0.075668809],
  ['实验26', 0.07596763],
  ['实验5', 0.076506169],
  ['实验22', 0.076759162],
  ['实验11', 0.077364414],
  ['实验21', 0.083129391],
  ['实验18', 0.0841135],
  ['实验3', 0.084510577],
  ['实验8', 0.085279644],
  ['实验25', 0.08579477],
  ['实验14', 0.086390987],
  ['实验24', 0.095033716],
  ['实验6', 0.090619104],
  ['实验17', 0.094467709],
  ['实验27', 0.11741422],
  ['实验9', 0.094081495]
]
const dateList1 = data1.map(function(item) {
  return item[0]
})
const valueList1 = data1.map(function(item) {
  return item[1]
})
const dateList2 = data2.map(function(item) {
  return item[0]
})
const valueList2 = data2.map(function(item) {
  return item[1]
})
class CurveChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList2.length - 1
          }
        ],
        title: [
          {
            top: '6%',
            left: 'center',
            text: 'SEC曲线图',
            textStyle: {
              fontSize: 15
            }
          },
          {
            top: '52%',
            left: 'center',
            text: '能效曲线图',
            textStyle: {
              fontSize: 15
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: dateList1,
            axisLabel: {
              show: true,
              rotate: 65,
              fontSize: 10
            }
          },
          {
            data: dateList2,
            axisLabel: {
              show: true,
              rotate: 65,
              fontSize: 10
            },
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            axisLabel: {
              fontSize: 10
            }
          },
          {
            gridIndex: 1
          }
        ],
        grid: [
          {
            bottom: '60%'
          },
          {
            top: '60%'
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: valueList1
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList2,
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ]
      }
    }
  }

  componentDidMount() {
    console.log(this.state.option.xAxis.data)
    // this.getChartData()
    var chartDom = document.getElementById('main1')
    var myChart = echarts.init(chartDom)
    this.setState({
      myChart: myChart
    })
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    return (
      <div id='main1' style={{ width: 500, height: 400 }}></div>
    )
  }
}
export default CurveChart
