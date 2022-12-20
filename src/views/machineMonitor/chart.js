import React, { Component } from 'react'
import * as echarts from 'echarts'
// import { monitorInfoUrl } from '../../dataModule/UrlList'
import Axios from 'axios'
// import { Model } from '../../dataModule/testBone'

// const model = new Model()
const monitorInfoUrl = 'http://127.0.0.1:8001/api/monitor/'
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
    this.timer = setInterval(function() {
      const data1 = me.state.option.series[0].data
      const id = me.state.id
      data1.shift()
      const tid = id + 1
      // 11
      const url = `${monitorInfoUrl}${tid}/`
      // 方法1：Axios
      Axios.get(url, {}).then(response => {
        const expid = response.data['id']
        const extime = response.data['time']
        const extimell = new Date(extime)
        const exppower = response.data['power']
        const temp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
        data1.push(temp)
      }).catch(response => {
        console.log('加载失败，请重试')
      })
      // 方法2：使用model
      // model.fetch(
      //   {},
      //   url,
      //   'get',
      //   function(response) {
      //     const expid = response.data['id']
      //     const extime = response.data['time']
      //     const extimell = new Date(extime)
      //     const exppower = response.data['power']
      //     const temp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
      //     data1.push(temp)
      //   },
      //   function() {
      //     console.log('加载失败，请重试')
      //   },
      //   false
      // )
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
    // 方法1：Axios
    Axios.get(url, {}).then(response => {
      const data = []
      for (var i = 0; i < response.data.length; i++) {
        const expid = response.data[i]['id']
        const extime = response.data[i]['time']
        const extimell = new Date(extime)
        const exppower = response.data[i]['power']
        const exp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
        data.push(exp)
      }
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
    }).catch(response => {
      console.log('加载失败，请重试')
    })
    // 方法2：使用model
    // model.fetch(
    //   {},
    //   url,
    //   'get',
    //   function(response) {
    //     const data = []
    //     for (var i = 0; i < response.data.length; i++) {
    //       const expid = response.data[i]['id']
    //       const extime = response.data[i]['time']
    //       const extimell = new Date(extime)
    //       const exppower = response.data[i]['power']
    //       const exp = { name: extimell.toString(), value: [expid, parseInt(exppower, 10)] }
    //       data.push(exp)
    //     }
    //     we.setState({
    //       datafirst: data,
    //       option: {
    //         ...we.state.option,
    //         series: [
    //           {
    //             name: 'Fake Data',
    //             type: 'line',
    //             showSymbol: false,
    //             data: data
    //           }
    //         ]
    //       }
    //     })
    //   },
    //   function() {
    //     console.log('加载失败，请重试')
    //   },
    //   false
    // )
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
