import React, { Component } from 'react'
import { Checkbox, Row, Col, Input, Select, Button, Statistic } from 'antd'
import ParetoChart from './paretoChart'
import './paraopt.less'

function onFirstChange(checkedValues) {
  console.log('checked = ', checkedValues)
}
function onSecondChange(checkedValues) {
  console.log('checked = ', checkedValues)
}
function handleMathChange(value) {
  console.log(`selected ${value}`)
}
const { Option } = Select
class ParaOpt extends Component {
  render() {
    return (
      <div className='para_opt_wrapper'>
        <div className='para_opt_top'>
          <div className='para_opt_top_left'>
            <div className='para_opt_top_left_first'>
              <span style={{ fontSize: 'medium', display: 'table-cell', verticalAlign: 'middle', fontWeight: 'bold' }}>目标决策：</span>
              <Checkbox.Group style={{ width: '50%', marginLeft: '18%' }} onChange={onFirstChange}>
                <Row>
                  <Col span={8}>
                    <Checkbox value='1'>E</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value='2'>T</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value='3'>Ra</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
            <div className='para_opt_top_left_second'>
              <span style={{ fontSize: 'medium', display: 'table-cell', verticalAlign: 'middle', fontWeight: 'bold' }}>优化变量：</span>
              <Checkbox.Group style={{ width: '67%', marginLeft: '18%' }} onChange={onSecondChange}>
                <Row>
                  <Col span={6}>
                    <Checkbox value='4'>n</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value='5'>f</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value='6'>ap</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value='7'>ae</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </div>
          <div className='para_opt_top_right'>
            <div className='para_opt_top_right_first'>
              <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>权重向量W：</span>
              <Input placeholder='0.65; 0.25; 0.10' style={{ width: '30%', marginLeft: '3%' }}/>
            </div>
            <div className='para_opt_top_right_second'>
              <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>决策分析方法：</span>
              <Select defaultValue='3' style={{ width: '30%', marginLeft: '2.5%' }} onChange={handleMathChange}>
                <Option value='1'>蚁群算法</Option>
                <Option value='2'>粒子群算法</Option>
                <Option value='3'>NSGA</Option>
              </Select>
              <Button style={{ marginLeft: '8%' }} type='primary'>开始决策</Button>
            </div>
          </div>
        </div>
        <div className='para_opt_bottom'>
          <div className='para_opt_bottom_left'>
            <ParetoChart/>
          </div>
          <div className='para_opt_bottom_right'>
            <div className='para_opt_bottom_right_first'>
              <span style={{ fontSize: 'medium', fontWeight: 'bold' }}>最优参数组合：</span>
            </div>
            <div className='para_opt_bottom_right_second'>
              <span style={{ fontSize: 'large', color: '#3CB371', fontWeight: 'bold' }}>n=</span>
              <Statistic style={{ margin: '0 1rem', display: 'inline-block' }} value={1300}/>
              <span style={{ fontSize: 'medium' }}>(r/min)</span>
            </div>
            <div className='para_opt_bottom_right_third'>
              <span style={{ fontSize: 'large', color: '#3CB371', fontWeight: 'bold' }}>f=</span>
              <Statistic style={{ margin: '0 1rem', display: 'inline-block' }} value={160}/>
              <span style={{ fontSize: 'medium' }}>(mm/min)</span>
            </div>
            <div className='para_opt_bottom_right_fifth'>
              <span style={{ fontSize: 'large', color: '#3CB371', fontWeight: 'bold' }}>ap=</span>
              <Statistic style={{ margin: '0 1rem', display: 'inline-block' }} value={160}/>
              <span style={{ fontSize: 'medium' }}>(mm)</span>
            </div>
            <div className='para_opt_bottom_right_last'>
              <span style={{ fontSize: 'large', color: '#3CB371', fontWeight: 'bold' }}>ae=</span>
              <Statistic style={{ margin: '0 1rem', display: 'inline-block' }} value={160}/>
              <span style={{ fontSize: 'medium' }}>(mm)</span>
            </div>
          </div>
          <Button style={{ margin: '2.5% 0 0 20%' }} type='primary'>下载报告</Button>
        </div>
      </div>
    )
  }
}

export default ParaOpt
