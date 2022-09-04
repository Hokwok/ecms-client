import React, { Component } from 'react'
import { Select, Button } from 'antd'
import { throttle } from '../../publicFunction'
import BubbleChart from './bubbleChart'
import CurveChart from './curveChart'
import './machineVisualize.less'

const { Option } = Select
class Visualize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyValue: '', // 用于重置
      search_test_time: '',
      change: false // 是否切换数据
    }
  }
  // 实验时间的获取
  handleDateSelect = (string) => {
    this.setState({ search_test_time: string })
    console.log(string)
  }
  // 切换数据
  searchInfo = throttle(() => {
    this.setState({ change: true })
    console.log('切换数据')
    const { search_test_time } = this.state
    const params = this.getParams(search_test_time)
    this.getTestData(params)
  })
  getTestData(params) {
    // const me = this // 让this指向不会出错
    // me.setState({ isLoading: true })
    // model.fetch(
    //     params,
    //     getProcessTaskListUrl,
    //     'post',
    //     function(response) {
    //       // console.log(response)
    //         if (me.state.whetherTest === false) {
    //             me.setState({
    //                 isLoading: false,
    //                 total: response.data.total,
    //                 data: response.data.records,
    //                 currentPage: params['currentPage']
    //             })
    //         }
    //     },
    //     function() {
    //         message.warning('加载失败，请重试')
    //     },
    //     this.state.whetherTest
    // )
  }
  // 分页 搜索用
  getParams(search_test_time = null) {
    let params = {}
    params = {
      search_test_time
    }
    return params
  }
  //  重置按钮
  handleReset = () => {
    const params = this.getParams()
    this.getTestData(params)
    this.setState({
      search_test_time: '',
      keyValue: new Date(),
      change: false
    })
  }
  render() {
    const { keyValue } = this.state
    return (
      <div className='visualize_wrapper'>
        <div id='machine_visualize'>
          <div className='header'>
            <div>
              <h2>可视化分析</h2>
            </div>
            <div className='filter'>
              <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ float: 'left' }} >
                  <div className='input' >实验时间:</div>
                  <Select
                    style={{ width: '250px' }}
                    allowClear
                    onSelect={ (string) => this.handleDateSelect(string) }
                    key={ keyValue }
                  >
                    <Option key='0' value='2021-10-30'>2021-10-30</Option>
                    <Option key='1' value='2022-01-15'>2022-01-15</Option>
                  </Select>
                </div>
                <Button className='button1' type='primary' onClick={this.searchInfo}>切换数据</Button>
                <Button className='button2' onClick={this.handleReset}>重置</Button>
              </div>
            </div>
          </div>
          <div className='chart_wrapper'>
            <div className='chart_wrapper_left'>
              <BubbleChart/>
            </div>
            <div className='chart_wrapper_right'>
              <CurveChart/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Visualize
