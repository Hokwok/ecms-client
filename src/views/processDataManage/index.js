import React, { Component } from 'react'
import { Button, Select } from 'antd'
import './processDataManage.less'

const { Option } = Select
class processDataManage extends Component {
  render() {
    return (
      <div className='process_data_manage_wrapper'>
        <div id='process_data'>
          <div className='header'>
            <div>
              <h2>加工数据管理</h2>
            </div>
            <div className='filter'>
              <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ float: 'left' }} >
                  <div className='input' >加工机床:</div>
                  <Select
                    style={{ width: '250px' }}
                    allowClear
                    onSelect={ (string) => this.handleStatusSelect(string) }
                  >
                    <Option key='0' value='0'>VMC850E-001</Option>
                    <Option key='1' value='1'>VMC850E-002</Option>
                  </Select>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <div className='process_data_titles'>实验时间:</div>
                  <Select
                    style={{ width: '250px' }}
                    allowClear
                    onSelect={ (string) => this.handleStatusSelect(string) }
                  >
                    <Option key='0' value='2021-10-30'>2021-10-30</Option>
                    <Option key='1' value='2022-01-15'>2022-01-15</Option>
                  </Select>
                </div>
                <Button className='button' type='primary' onClick={this.searchInfo}>搜索</Button>
                <Button className='button' onClick={this.handleReset}>重置</Button>
                <Button className='button' type='primary' onClick={this.showAddProcess}>添加加工数据</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default processDataManage
