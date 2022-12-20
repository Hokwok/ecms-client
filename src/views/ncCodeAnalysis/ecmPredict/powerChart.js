import React, { Component } from 'react'
import * as echarts from 'echarts'

class PowerChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null
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
    this.state.myChart && this.state.myChart.setOption(this.props.option, true)
    return (
      <div id='main' style={{ width: 700, height: 480 }}></div>
    )
  }
}
export default PowerChart
