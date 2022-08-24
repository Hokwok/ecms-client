import { Button } from 'antd'
import React, { Component } from 'react'
import DesignTable from './designTable'
import AddDesign from './addDesign'
import EditDesign from './editDesign'

class ProcessDesignIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data: [
            {
              pdid: '001',
              pd_n: '500',
              pd_vf: '100',
              pd_ap: '0.2',
              pd_ae: '4',
              note: '水平1'
            }, {
              pdid: '002',
              pd_n: '1000',
              pd_vf: '140',
              pd_ap: '0.3',
              pd_ae: '6',
              note: '水平2'
            }, {
              pdid: '003',
              pd_n: '1500',
              pd_vf: '180',
              pd_ap: '0.4',
              pd_ae: '8',
              note: '水平3'
            }
          ], // 表格数据
          isLoading: false, // 是否加载
          addProcessDesignVisible: false,
          editProcessDesignVisible: false,
          editInfo: ''
        }
    }
    showAddDesignModal = () => {
      this.setState({
        addProcessDesignVisible: true
      })
    }
    // 关闭弹窗
    closeModal = () => {
      this.setState({
        addProcessDesignVisible: false,
        editProcessDesignVisible: false
      })
    }
    // 打开修改
    editDesignInfo = (record) => {
      this.setState({
        editProcessDesignVisible: true
      })
      if (record !== undefined) {
        this.setState({
          editInfo: record
        })
      }
      // console.log(record)
    }
    // 删除水平
    deleteDesignInfo = (record) => {
      console.log(record)
    }
    render() {
      const { data, isLoading, addProcessDesignVisible, editProcessDesignVisible, editInfo } = this.state
      const tableDate = []
      if (data !== undefined && data !== []) {
        data.map((item) => {
          tableDate.push({
            key: item.pdid,
            pd_n: item.pd_n,
            pd_vf: item.pd_vf,
            pd_ap: item.pd_ap,
            pd_ae: item.pd_ae,
            note: item.note
          })
        return null
        })
      }
      return (
        <div >
          <div style={{ margin: '0 0 15px 0' }}>
            <Button type='primary' className='but' onClick={this.showAddDesignModal}>添加加工设计</Button>
          </div>
          <AddDesign
            addProcessDesignVisible = { addProcessDesignVisible }
            cancel = { this.closeModal }
          />
          <EditDesign
            editProcessDesignVisible = { editProcessDesignVisible }
            cancel={ this.closeModal }
            editInfo={ editInfo }
            // getParams = {this.getParams.bind(this)}
            // getCurrentPage = {this.getCurrentPage.bind(this)}
          />
          <div>
            <DesignTable
              data={ tableDate }
              isLoading={ isLoading }
              editDesignInfo = { this.editDesignInfo }
              deleteDesignInfo = { this.deleteDesignInfo }
            />
          </div>
        </div>
      )
    }
}

export default ProcessDesignIndex
