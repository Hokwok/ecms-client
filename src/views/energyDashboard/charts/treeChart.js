import React, { Component } from 'react'
import * as echarts from 'echarts'

class TreeChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          show: false
        },
        backgroundColor: '', // 设置无背景色
        series: [
          {
            type: 'tree',
            data: [this.props.data],
            top: '1%',
            left: '30%',
            bottom: '1%',
            right: '32%',
            label: {
              position: 'left',
              verticalAlign: 'middle',
              textStyle: {
                color: '#fff',
                fontSize: 13
              }
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            }
          }
        ]
      }
    }
  }

  componentDidMount() {
    var chartDom = document.getElementById(this.props.treeId)
    var myChart = echarts.init(chartDom, 'dark')
    this.setState({
      myChart: myChart
    })
  }
  render() {
    this.state.myChart && this.state.myChart.setOption(this.state.option)
    return (
      <div id={ this.props.treeId } style={{ width: 300, height: 200 }}></div>
    )
  }
}
export default TreeChart
