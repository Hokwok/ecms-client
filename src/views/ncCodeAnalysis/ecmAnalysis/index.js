import React, { Component } from 'react'
import { Select, Button } from 'antd'
import './ecmAnalysis.less'
import BarChart from './barChart'
import PieChart from './pieChart'
import AnnularPieChart from './annularPieChart'

const { Option } = Select
function handleDataChange(value) {
  console.log(`selected ${value}`)
}
class EcmAnalysis extends Component {
  render() {
    return (
      <div className='ecm_analysis_wrapper'>
        <div className='cm_analysis_top'>
          <div className='cm_analysis_top_left'>
            <div className='cm_analysis_top_left_first'>
              <span style={{ marginRight: '2.5rem', fontSize: 'medium', fontWeight: 'bold' }}>方案选择：</span>
              <Select defaultValue='2' style={{ width: 120 }} onChange={handleDataChange}>
                <Option value='1'>方案一</Option>
                <Option value='2'>方案二</Option>
                <Option value='3'>方案三</Option>
              </Select>
            </div>
            <div>
              <Button style={{ marginTop: '10%', marginLeft: '25%' }}>进行分析</Button>
              <Button style={{ marginTop: '10%', marginLeft: '10%' }} type='primary'>下载结果</Button>
            </div>
          </div>
          <div className='cm_analysis_top_right'>
            <div className='bar_title'>切削功率占比情况</div>
            <BarChart/>
          </div>
        </div>
        <div className='cm_analysis_bottom'>
          <div className='cm_analysis_bottom_left'>
            <PieChart/>
          </div>
          <div className='cm_analysis_bottom_right'>
            <div className='pie_right_title'>机床能效</div>
            <AnnularPieChart/>
          </div>
        </div>
      </div>
    )
  }
}

export default EcmAnalysis
