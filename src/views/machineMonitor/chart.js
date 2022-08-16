import React, { Component } from 'react'
import * as echarts from 'echarts'
// import store from '../../../store/index'
import { monitorInfoUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'

const model = new Model()

class MonitorChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      datafirst: [],
      id: 1000,
      option: {
        title: {
          text: '实时功率曲线',
          x: 'center',
          y: '20px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: [{
          type: 'time',
          // type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            onZero: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }],
        yAxis: {
          name: 'Power(w)',
          nameTextStyle: {
            fontWeight: 'bold'
          },
          type: 'value',
          splitLine: {
            show: false
          },
          min: 0,
          max: 1000,
          scale: true
        },
        series: [
          {
            name: 'power value',
            type: 'line',
            showSymbol: false,
            data: []
          }
        ]
      }
    }
  }
  componentDidMount() {
    const me = this
    me.getMonitorData()
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    me.setState({
      myChart: myChart
    })
    // console.log(me.state.id)
    this.timer = setInterval(function() {
      const data1 = me.state.option.series[0].data
      const id = me.state.id
      data1.shift()
      const tid = id + 1
      // 11
      const url = `${monitorInfoUrl}${tid}/`
      model.fetch(
        {},
        url,
        'get',
        function(response) {
          // console.log(response.data)
          const expid = response.data['id']
          const extime = response.data['time']
          const extimell = new Date(extime)
          const exppower = response.data['power']
          const temp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
          // console.log(temp)
          data1.push(temp)
        },
        function() {
            console.log('加载失败，请重试')
        },
        false
      )
      // 11
      me.setState({
        id: tid,
        option: {
          ...me.state.option,
          series: [
            {
              name: 'power value',
              type: 'line',
              showSymbol: false,
              data: data1
            }
          ]
        }
      })
    }, 1)
  }

  // 获得监控实验的数据
  getMonitorData() {
    const url = `${monitorInfoUrl}${0}/`
    const we = this
    model.fetch(
        {},
        url,
        'get',
        function(response) {
          console.log(response.data)
          const data = []
          for (var i = 0; i < response.data.length; i++) {
            // console.log(data)
            const expid = response.data[i]['id']
            // console.log(expid)
            const extime = response.data[i]['time']
            const extimell = new Date(extime)
            const exppower = response.data[i]['power']
            // parseFloat(exppower)
            const exp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
            // console.log(expid)
            data.push(exp)
            // console.log(data)
          }
          // console.log(data)
          we.setState({
            datafirst: data,
            option: {
              ...we.state.option,
              series: [
                {
                  name: 'Fake Data',
                  type: 'line',
                  showSymbol: false,
                  data: data
                }
              ]
            }
          })
        },
        function() {
            console.log('加载失败，请重试')
        },
        false
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option, true)
    return (
      <div id='main' style={{ width: 900, height: 440 }}></div>
    )
  }
}
export default MonitorChart
