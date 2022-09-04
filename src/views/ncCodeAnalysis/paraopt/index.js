import React, { Component } from 'react'
import ParetoChart from './paretoChart'
import './paraopt.less'

class ParaOpt extends Component {
  render() {
    return (
      <div className='para_opt_wrapper'>
        参数优化
        <ParetoChart/>
      </div>
    )
  }
}

export default ParaOpt
