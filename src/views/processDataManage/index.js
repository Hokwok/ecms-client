import React, { Component } from 'react'
import { throttle } from '../../publicFunction'
import { Button, Select, Popconfirm, Tooltip, Icon, message, DatePicker } from 'antd'
import ProcessDataTable from './processDataTable'
import AddProcessData from './addProcessData'
import ProcessDesignModal from './processDesignModal'
import ProcessDataVisualModal from './processDataVisual'
import UploadDataModal from './uploadData'
import './processDataManage.less'
import { experimentDataManageUrl, machineManageUrl, processManageUrl, experimentaddtaskUrl } from '../../dataModule/UrlList'
import Axios from 'axios'
import { Model } from '../../dataModule/testBone'

const model = new Model()
const { Option } = Select
class processDataManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      machineList: [],
      search_process_machine: '', // 加工机床获取
      search_expe_time: '', // 实验时间获取
      whetherTest: false, // 是否是测试  true为是 false为否
      search: false,
      keyValue: '', // 用于重置
      isLoading: false,
      currentPage: 1,
      size: 10,
      total: 0,
      record: {},
      addProcessDataVisible: false,
      addProcessDesignVisible: false,
      showProcessDataVisible: false,
      uploadDataVisible: false
    }
  }
  componentDidMount() {
    this.getMachineOption()
		const params = this.getParams()
		this.getProcessDataList(params)
	}
  // 获得设备选项
  getMachineOption() {
    const me = this // 让this指向不会出错
    model.fetch(
      '',
      machineManageUrl,
      'get',
      function(response) {
        // console.log(response.data.data)
        response.data.data.map(item => {
          if (item.equipment_type === '0') {
            item.equipment_type = '立式加工中心'
          } else if (item.equipment_type === '1') {
            item.equipment_type = '数控铣床'
          }
          return item
        })
        me.setState({
          machineList: response.data.data
        })
      },
      function() {
          message.warning('加工机床获取失败')
      },
      false
    )
  }

  // 分页 搜索用
  getParams(currentPage = 1, pageSize = 10, search_process_machine = '', search_test_time = '') {
    let params = {}
    params = {
      page: currentPage,
      page_size: pageSize,
      eid: search_process_machine,
      exp_date: search_test_time
    }
    return params
  }
  getProcessDataList(params) {
    const me = this // 让this指向不会出错
    me.setState({ isLoading: true })
    model.fetch(
        params,
        experimentDataManageUrl,
        'get',
        function(response) {
          // console.log(response.data.data)
          if (me.state.whetherTest === false) {
            me.setState({
              isLoading: false,
              total: response.data.data.length,
              data: response.data.data
            })
          }
        },
        function() {
          message.warning('加载失败，请重试')
        },
        this.state.whetherTest
    )
  }
  // 把数据存到实验数据表中
  handleData = () => {
    const { data } = this.state
    // console.log(data)
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    if (data !== undefined) {
      const tableDate = data.map((item) => ({
          expid: item.expid.replace(reg, ''),
          ed_code: item.ed_code,
          process_machine: item.equipment.equipment_code + '-' + item.equipment.equipment_name,
          process_method: item.process_method,
          process_tool: item.process_tool,
          exp_date: item.exp_date,
          exp_note: item.exp_note,
          equip_data_url: item.equip_data_url
      }))
      tableDate.map(item => {
        if (item.process_method === '0') {
          item.process_method = '车削'
        } else if (item.process_method === '1') {
          item.process_method = '铣削'
        } else if (item.process_method === '2') {
          item.process_method = '钻削'
        } else if (item.process_method === '3') {
          item.process_method = '磨削'
        }
        return item
      })
      // console.log(tableDate)
      return tableDate
    }
  }
  // 加工机床的获取
  handleProcessMachineSelect = (string) => {
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    this.setState({ search_process_machine: string.replace(reg, '') })
  }
  // 实验时间的获取
  handleTimeSelect = (string) => {
    this.setState({ search_expe_time: string.format('YYYYMMDD') })
  }
  // 搜索
  searchInfo = throttle(() => {
    this.setState({ search: true })
    const { search_process_machine, search_expe_time } = this.state
    const params = this.getParams(1, 10, search_process_machine, search_expe_time) // 1, 10,
    // console.log(params)
    this.handleSearch(params)
  })
  // 获取搜索后数据
  handleSearch = (params) => {
    const me = this
		model.fetch(
			params,
			experimentDataManageUrl,
			'get',
			function(res) {
				console.log(res.data)
				me.setState({
          currentPage: 1,
          isLoading: false,
          total: res.data.count,
          data: res.data.data
				})
			},
			function() {
				message.error('数据获取失败，请刷新页面！')
			},
			false
		)
  }
  //  重置按钮
  handleReset = () => {
    const params = this.getParams()
    this.getProcessDataList(params)
    this.setState({
      search_process_machine: '',
      search_expe_time: '',
      keyValue: new Date(),
      currentPage: 1,
      search: false
    })
  }

  // 翻页获取内容
  getPage = (currentPage, pageSize) => {
    this.setState({
      currentPage: currentPage
    })
    let [search_process_machine, search_expe_time] = ['', '']
    if (this.state.search === true) {
      search_process_machine = this.state.search_process_machine
      search_expe_time = this.state.search_expe_time
    }
    const params = this.getParams(currentPage, pageSize, search_process_machine, search_expe_time)
    this.getProcessDataList(params)
  }

  // 改变pageSize获取内容
  getSize = (current, size) => {
    this.setState({
      currentPage: current,
      size: size
    })
    let [search_process_machine, search_expe_time] = ['', '']
    if (this.state.search === true) {
      search_process_machine = this.state.search_process_machine
      search_expe_time = this.state.search_expe_time
    }
    const params = this.getParams(current, size, search_process_machine, search_expe_time)
    this.getProcessDataList(params)
  }

  // 添加弹窗显示
  showAddProcessData = () => {
    this.setState({
      addProcessDataVisible: true
    })
  }
  // 加工设计显示，并关联加工任务
  showProcessDesignModal = (record) => {
    this.setState({
      record,
      addProcessDesignVisible: true
    })
    this.getConnectTaskList(record)
  }

  getConnectTaskList = (record) => {
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    const me = this
    const params = {
      page: 1,
      page_size: 10000,
      process_code: record.exp_date.replace(reg, ''),
      process_statue: ''
    }
    model.fetch(
      params,
      processManageUrl,
      'get',
      function(response) {
        const process_task = response.data.data.map(
          function(item, index) {
            return item.ptid.replace(reg, '')
          }
        )
        // console.log(process_task)
        me.putConnectTaskList(record, process_task)
      },
      function() {
        message.warning('获取关联任务失败')
      },
      false
    )
  }

  putConnectTaskList = (record, process_task) => {
    const params = {
      process_task: process_task
    }
    Axios.put(`${experimentaddtaskUrl}${record.expid}/`, params).then(res => {
      console.log('关联加工任务成功')
    }).catch(res => {
      message.warning('关联加工任务失败')
    })
  }

  // 关闭弹窗
  closeModal = () => {
    this.setState({
      addProcessDataVisible: false,
      addProcessDesignVisible: false,
      showProcessDataVisible: false,
      uploadDataVisible: false
    })
  }
  // 上传实验数据
  upLoadExcel = (record) => {
    // console.log(record)
    this.setState({
      record,
      uploadDataVisible: true
    })
  }
  // 操作后回调
  afterCreateOrEdit = () => {
    let [search_process_machine, search_expe_time] = ['', '']
    if (this.state.search === true) {
      search_process_machine = this.state.search_process_machine
      search_expe_time = this.state.search_expe_time
    }
    const params = this.getParams(1, 10, search_process_machine, search_expe_time)
    this.getProcessDataList(params)
  }

  // 下载实验数据
  downLoadExcel = (record) => {
    window.location.href = `${record.equip_data_url}`
  }
  // 可视化分析
  showAnsysModal = (record) => {
    // this.setState({
    //   showProcessDataVisible: true
    // })
    // replace跳转+携带params参数
    this.props.history.replace('/energy_dashboard', { record })
    // (`/energy_dashboard/${record.ed_code}`)
    // window.location.href = `${originalUrl}${downLoadPdfUrl}${record.dispatch_list_id}`
  }
  render() {
    const tableData = this.handleData()
    const { keyValue, isLoading, total, currentPage, size, whetherTest, machineList, record } = this.state
    const columns = [
      { title: '实验编号', dataIndex: 'ed_code', width: '10%', align: 'center' },
      { title: '加工机床', dataIndex: 'process_machine', width: '10%', align: 'center' },
      { title: '加工方式', dataIndex: 'process_method', width: '10%', align: 'center' },
      { title: '加工刀具', dataIndex: 'process_tool', width: '10%', align: 'center' },
      { title: '实验时间', dataIndex: 'exp_date', width: '10%', align: 'center' },
      { title: '文件接口', dataIndex: 'equip_data_url', width: '10%', align: 'center' },
      { title: '备注', dataIndex: 'exp_note', width: '10%', align: 'center',
        onCell: () => {
          return {
            style: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 250 }
          }
        }
      },
      { title: '加工设计', dataIndex: 'process_design', width: '10%', align: 'center',
      render: (text, record, index) => <div>
        <Tooltip title='实验设计详情'>
          <Icon type='profile' theme='twoTone' style={{ fontSize: '20px' }}
            onClick={() => this.showProcessDesignModal(record)}
          />
        </Tooltip></div> }]
      columns.push({
        title: '操作', dataIndex: 'action', width: '20%', align: 'center',
        render: (text, record, index) => {
          const content = []
          if (record.equip_data_url) {
            content.push(
              <div key='实验数据' >
                <Tooltip title='实验数据分析'>
                  <Icon type='pie-chart' className='edit' theme='twoTone' style={{ fontSize: '20px', marginRight: '15px' }}
                    onClick={() => this.showAnsysModal(record)}
                  />
                </Tooltip>
                <Popconfirm
                  title='确定下载本次实验数据?'
                  onConfirm={() => this.downLoadExcel(record)}
                  okText='是'
                  cancelText='否'
                  key='确定下载本次实验数据?'
                >
                  <Tooltip title='下载实验数据'>
                    <Icon type='download' style={{ fontSize: '20px', color: 'rgb(24, 144, 255)' }}/>
                  </Tooltip>
                </Popconfirm>
              </div>
            )
          } else {
            content.push(
              <div key='实验数据' >
                <Tooltip title='上传实验数据'>
                  <Icon type='upload' style={{ fontSize: '20px', marginRight: '15px', color: 'rgb(24, 144, 255)' }}
                    onClick={() => this.upLoadExcel(record)}
                  />
                </Tooltip>
                <Tooltip title='实验数据分析'>
                  <Icon type='pie-chart' className='edit' theme='twoTone' style={{ fontSize: '20px' }}
                    onClick={() => this.showAnsysModal(record)}
                  />
                </Tooltip>
              </div>
            )
          }
          return content
        }
      })
    return (
      <div className='process_data_manage_wrapper'>
        <div id='process_data'>
          <div className='header'>
            <div>
              <h2>实验数据管理</h2>
            </div>
            <div className='filter'>
              <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ float: 'left' }} >
                  <div className='input' >加工机床:</div>
                  <Select
                    style={{ width: '250px' }}
                    onSelect={ (string) => this.handleProcessMachineSelect(string) }
                    key={ keyValue }
                  >
                      {machineList.map((item, index) => {
                      return <Option key={ index } value={ item.eid }>{ `${item.equipment_type}:\xa0\xa0\xa0${item.equipment_code}-${item.equipment_name}` }</Option>
                    })}
                  </Select>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <div className='process_data_titles'>实验时间:</div>
                  <DatePicker key={ keyValue } allowClear={false} onChange={this.handleTimeSelect} />
                </div>
                <Button className='button' type='primary' onClick={this.searchInfo}>搜索</Button>
                <Button className='button' onClick={this.handleReset}>重置</Button>
                <Button className='button' type='primary' onClick={this.showAddProcessData}>添加实验数据</Button>
              </div>
            </div>
          </div>
          <AddProcessData
            whetherTest={whetherTest}
            machineList={machineList}
            addProcessDataVisible={this.state.addProcessDataVisible} // 这里把state里面的addProcessVisible传递到子组件
            cancel={this.closeModal}
            afterCreateOrEdit={this.afterCreateOrEdit}
            getParams = {this.getParams.bind(this)}
          />
          <ProcessDesignModal
            whetherTest={whetherTest}
            addProcessDesignVisible={this.state.addProcessDesignVisible}
            record={record}
            cancel={this.closeModal}
          />
          <ProcessDataVisualModal
            whetherTest={whetherTest}
            showProcessDataVisible={this.state.showProcessDataVisible}
            cancel={this.closeModal}
          />
          <UploadDataModal
            whetherTest={whetherTest}
            record={record}
            uploadDataVisible={this.state.uploadDataVisible}
            afterCreateOrEdit={this.afterCreateOrEdit}
            cancel={this.closeModal}
          />
          <div className='dataTableWrapper'>
            <ProcessDataTable
              columns = {columns.filter(col => col.dataIndex !== 'equip_data_url')}
              data = {tableData}
              isLoading={isLoading}
              total = {total}
              currentPage = {currentPage}
              size = {size}
              changePage={ this.getPage }
              changeSize={ this.getSize }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default processDataManage
