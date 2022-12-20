import { Button, message } from 'antd'
import React, { Component } from 'react'
import DesignTable from './designTable'
import AddDesign from './addDesign'
import EditDesign from './editDesign'
import { experimentDesignUrl } from '../../../dataModule/UrlList'
import { Model } from '../../../dataModule/testBone'
import Axios from 'axios'

const model = new Model()
class ProcessDesignIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
          expid: '', // 该实验的id
          data: [], // 表格数据
          isLoading: false, // 是否加载
          addProcessDesignVisible: false,
          editProcessDesignVisible: false,
          editInfo: ''
        }
    }

    componentDidMount() {
      this.getProcessDesign(this.props.record.expid)
    }

    getProcessDesign(expid) {
      const me = this // 让this指向不会出错
      me.setState({ isLoading: true })
      model.fetch(
        '',
        `${experimentDesignUrl}${expid}`,
        'get',
        function(response) {
          me.setState({
            expid,
            isLoading: false,
            total: response.data.count,
            data: response.data.data.sort((a, b) => a.pd_n - b.pd_n)
          })
        },
        function() {
          message.warning('加载失败，请重试')
        },
        false
      )
    }

    afterOperatDesign = () => {
      this.getProcessDesign(this.state.expid)
      this.closeModal()
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
    }
    // 删除设计水平
    deleteDesignInfo = (pdsid) => {
      const { expid } = this.state
      var reg = new RegExp('-', 'g') // 去掉所有的'-'
      Axios.delete(`${experimentDesignUrl}${expid}/`, {
        data: {
          pdsid: pdsid.replace(reg, '')
        }
      }).then(res => {
        this.getProcessDesign(expid)
        message.success('删除成功！')
      }).catch(res => {
        message.warning('删除失败，请重试')
      })
    }
    render() {
      const { data, isLoading, addProcessDesignVisible, editProcessDesignVisible, editInfo, expid } = this.state
      const tableDate = []
      if (data !== undefined && data !== []) {
        data.map((item) => {
          tableDate.push({
            key: item.pdsid,
            pd_n: item.pd_n,
            pd_vf: item.pd_vf,
            pd_ap: item.pd_ap,
            pd_ae: item.pd_ae,
            note: item.pds_note
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
            expid = { expid }
            afterOperatDesign = { this.afterOperatDesign }
          />
          <EditDesign
            editProcessDesignVisible = { editProcessDesignVisible }
            cancel={ this.closeModal }
            editInfo={ editInfo }
            expid = { expid }
            afterOperatDesign = { this.afterOperatDesign }
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
