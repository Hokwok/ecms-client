import React, { Component } from 'react'
import MonitorChart from './chart'
import { Descriptions, Button } from 'antd'
import './monitor.less'

class Monitoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eid: null
    }
  }

  componentDidMount() {
    // let eid = null
    // var reg = new RegExp('-', 'g') // 去掉所有的'-'
    // try {
    //   eid = this.props.location.state
    // } catch (error) {
    //   console.log(error)
    // }
    // if (eid === undefined) {
    //   window.location.href = '/login'
    // }
    // console.log(eid)
    // this.setState({
    //   eid: eid.eid.replace(reg, '')
    // })
    // console.log(eid.eid.replace(reg, ''))
  }
  changeMachine = () => {
    this.props.history.replace('/app/machine_manage')
  }
  render() {
    return (
      <div className='monitor_wrapper'>
        <div className='monitor_top'>
          <div className='machine_photo'></div>
          <div className='power_curve'>
            <MonitorChart/>
          </div>
        </div>
        <div className='monitor_bottom'>
          <div className='monitor_bottom_left'>
            <Descriptions title='设备信息'>
              <Descriptions.Item label='设备编号'>
                <span style={{ color: '#66CDAA' }}>01</span>
              </Descriptions.Item>
              <Descriptions.Item label='设备类型'>
                <span style={{ color: '#436EEE' }}>立式加工中心</span>
              </Descriptions.Item>
              <Descriptions.Item label='设备名称'>
                <span style={{ color: '#436EEE' }}>VMC850E</span>
              </Descriptions.Item>
              <Descriptions.Item label='电源'>
                <span style={{ color: '#436EEE' }}>380V±10%</span>
              </Descriptions.Item>
              <Descriptions.Item label='今日耗电'>
                <span style={{ color: '#436EEE' }}>1000度</span>
              </Descriptions.Item>
              <Descriptions.Item label='今日开工'>
                <span style={{ color: '#436EEE' }}>5小时10分</span>
              </Descriptions.Item>
              <Descriptions.Item label='最大转速'>
                <span style={{ color: '#436EEE' }}>8000r/min</span>
              </Descriptions.Item>
              <Descriptions.Item label='最大进给速度'>
                <span style={{ color: '#436EEE' }}>6000mm/min</span>
              </Descriptions.Item>
              <Descriptions.Item label='允许最大荷重'>
                <span style={{ color: '#436EEE' }}>600kg</span>
              </Descriptions.Item>
              <Descriptions.Item label='当前电流'>
                <span style={{ color: '#66CDAA' }}>10A</span>
              </Descriptions.Item>
              <Descriptions.Item label='当前电压'>
                <span style={{ color: '#66CDAA' }}>380V</span>
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className='monitor_bottom_right'>
            <Button onClick={ () => this.changeMachine()} type='primary'>切换设备</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Monitoring
