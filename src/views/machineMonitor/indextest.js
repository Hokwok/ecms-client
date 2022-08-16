import React, { Component } from 'react'
import MonitorChart from './charttest'
import './monitor.less'

class Monitoring extends Component {
  render() {
    return (
      <div className='monitor_wrapper'>
        <MonitorChart/>
      </div>
    )
  }
}

export default Monitoring
