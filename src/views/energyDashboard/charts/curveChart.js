import React, { Component } from 'react'
import * as echarts from 'echarts'
import { Loading } from '@jiaminghi/data-view-react'

class CurveChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orCurveChartShow: false,
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
            max: 0 // dateList2.length - 1
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
        backgroundColor: '', // 设置无背景色
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: [], // dataList1
            axisLabel: {
              show: true,
              rotate: 65,
              fontSize: 7
            }
          },
          {
            data: [], // dateList2
            axisLabel: {
              show: true,
              rotate: 65,
              fontSize: 7
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
            data: [] // valueList1
          },
          {
            type: 'line',
            showSymbol: false,
            data: [], // valueList2
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ]
      }
    }
  }

  componentDidMount() {
    const me = this
    setTimeout(function() {
      const option = me.state.option
      option.visualMap[1].max = me.props.curveData.length - 1 // dateList2.length - 1
      option.xAxis[0].data = me.props.curveData.map(function(item) {
        return item[0]
      })
      option.series[0].data = me.props.curveData.map(function(item) {
        return item[1]
      })
      option.xAxis[1].data = me.props.curveData.map(function(item) {
        return item[0]
      })
      option.series[1].data = me.props.curveData.map(function(item) {
        return item[2]
      })
      me.setState({
        orCurveChartShow: true,
        option
      })
    }, 1000) // 处理异步
    setTimeout(function() {
      if (me.state.orCurveChartShow === true) {
        var chartDom = document.getElementById('main1')
        var myChart = echarts.init(chartDom, 'dark')
        me.setState({
          myChart: myChart
        })
      }
    }, 1500)
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    if (this.state.orCurveChartShow === true) {
      return (
        <div id='main1' style={{ width: 340, height: 360 }}></div>
      )
    } else {
      return (
        <Loading style={{ color: 'white' }}>Loading...</Loading>
      )
    }
  }
}
export default CurveChart

