import React, { Component } from 'react'
import { throttle } from '../../publicFunction'
import { Button, Select, Popconfirm, Tooltip, Icon } from 'antd'
import ProcessDataTable from './processDataTable'
import AddProcessData from './addProcessData'
import ProcessDesignModal from './processDesignModal'
import ProcessDataVisualModal from './processDataVisual'
import './processDataManage.less'

const { Option } = Select
class processDataManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          ed_code: '001',
          process_machine: 'VMC850E-002',
          process_method: '铣削',
          process_tool: '8mm合金铣刀',
          expe_time: '2021-10-30',
          note: '测试'
        }, {
          ed_code: '002',
          process_machine: 'VMC850E-002',
          process_method: '铣削',
          process_tool: '8mm合金铣刀',
          expe_time: '2021-01-15',
          note: '测试'
        }
      ],
      search_process_machine: '', // 加工机床获取
      search_expe_time: '', // 实验时间获取
      whetherTest: false, // 是否是测试  true为是 false为否
      search: false,
      keyValue: '', // 用于重置
      isLoading: false,
      currentPage: 1,
      size: 10,
      total: 0,
      addProcessDataVisible: false,
      addProcessDesignVisible: false,
      showProcessDataVisible: false
    }
  }
  componentDidMount() {
		const params = this.getParams()
		this.getProcessDataList(params)
	}
  // 分页 搜索用
  getParams(currentPage = 1, pageSize = 10, search_process_machine = null, search_test_time = null) {
    let params = {}
    params = {
      currentPage,
      pageSize,
      search_process_machine,
      search_test_time
    }
    return params
  }
  getProcessDataList(params) {
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
  // 把数据存到加工数据表中
  handleData = () => {
    const { data } = this.state
    if (data !== undefined) {
      const tableDate = data.map((item) => ({
          ed_code: item.ed_code,
          process_machine: item.process_machine,
          process_method: item.process_method,
          process_tool: item.process_tool,
          expe_time: item.expe_time,
          note: item.note
      }))
      // console.log(tableDate)
      return tableDate
    }
  }
  // 加工状态的获取
  handleProcessMachineSelect = (string) => {
    this.setState({ search_process_machine: string })
    // console.log(string)
  }
  // 实验时间的获取
  handleTimeSelect = (string) => {
    this.setState({ search_expe_time: string })
    // console.log(string)
  }
  // 搜索
  searchInfo = throttle(() => {
    this.setState({ search: true })
    const { search_process_machine, search_expe_time } = this.state
    const params = this.getParams(1, 10, search_process_machine, search_expe_time) // 1, 10,
    this.handleSearch(params)
  })
  // 获取搜索后数据
  handleSearch = (params) => {
    // const me = this
		// model.fetch(
		// 	params,
		// 	getProcessTaskSearchUrl,
		// 	'get',
		// 	function(res) {
		// 		// console.log(res.data)
		// 		me.setState({
		// 			data: res.data
		// 		})
		// 	},
		// 	function() {
		// 		message.error('数据获取失败，请刷新页面！')
		// 	},
		// 	false
		// )
  }
  //  重置按钮
  handleReset = () => {
    const params = this.getParams()
    this.getProcessDataList(params)
    this.setState({
      search_process_machine: '',
      search_test_time: '',
      keyValue: new Date(),
      currentPage: 1,
      search: false
    })
  }
  // 添加弹窗显示
  showAddProcessData = () => {
    this.setState({
      addProcessDataVisible: true
    })
  }
  // 加工设计显示
  showProcessDesignModal = () => {
    this.setState({
      addProcessDesignVisible: true
    })
  }
  // 关闭弹窗
  closeModal = () => {
    this.setState({
      addProcessDataVisible: false,
      addProcessDesignVisible: false,
      showProcessDataVisible: false
    })
  }
  // 下载实验数据
  downLoadExcel = (record) => {
    console.log(record)
    // window.location.href = `${originalUrl}${downLoadPdfUrl}${record.dispatch_list_id}`
  }
  // 可视化分析
  showAnsysModal = (record) => {
    this.setState({
      showProcessDataVisible: true
    })
    // replace跳转+携带params参数
    // this.props.history.replace(`/app/milling_visualize/${record.ed_code}`)
    // window.location.href = `${originalUrl}${downLoadPdfUrl}${record.dispatch_list_id}`
  }
  render() {
    const tableData = this.handleData()
    const { keyValue, isLoading, total, currentPage, size, whetherTest } = this.state
    const columns = [
      { title: '实验编号', dataIndex: 'ed_code', width: '10%', align: 'center' },
      { title: '加工机床', dataIndex: 'process_machine', width: '10%', align: 'center' },
      { title: '加工方式', dataIndex: 'process_method', width: '10%', align: 'center' },
      { title: '加工刀具', dataIndex: 'process_tool', width: '10%', align: 'center' },
      { title: '实验时间', dataIndex: 'expe_time', width: '10%', align: 'center' },
      { title: '备注', dataIndex: 'note', width: '10%', align: 'center',
        onCell: () => {
          return {
            style: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 250 }
          }
        }
      },
      { title: '加工设计', dataIndex: 'process_design', width: '10%', align: 'center',
      render: record => <div>
        <Tooltip title='实验设计详情'>
          <Icon type='profile' theme='twoTone' style={{ fontSize: '20px' }}
            onClick={() => this.showProcessDesignModal(record)}
          />
        </Tooltip></div> }]
      columns.push({
        title: '操作', dataIndex: 'action', width: '20%', align: 'center',
        render: (text, record, index) => {
          const content = []
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
          return content
        }
      })
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
                    onSelect={ (string) => this.handleProcessMachineSelect(string) }
                    key={ keyValue }
                  >
                    <Option key='0' value='VMC850E-001'>VMC850E-001</Option>
                    <Option key='1' value='VMC850E-002'>VMC850E-002</Option>
                  </Select>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <div className='process_data_titles'>实验时间:</div>
                  <Select
                    style={{ width: '250px' }}
                    allowClear
                    onSelect={ (string) => this.handleTimeSelect(string) }
                    key={ keyValue }
                  >
                    <Option key='0' value='2021-10-30'>2021-10-30</Option>
                    <Option key='1' value='2022-01-15'>2022-01-15</Option>
                  </Select>
                </div>
                <Button className='button' type='primary' onClick={this.searchInfo}>搜索</Button>
                <Button className='button' onClick={this.handleReset}>重置</Button>
                <Button className='button' type='primary' onClick={this.showAddProcessData}>添加加工数据</Button>
              </div>
            </div>
          </div>
          <AddProcessData
            whetherTest={whetherTest}
            addProcessDataVisible={this.state.addProcessDataVisible} // 这里把state里面的addProcessVisible传递到子组件
            cancel={this.closeModal}
            getParams = {this.getParams.bind(this)}
          />
          <ProcessDesignModal
            whetherTest={whetherTest}
            addProcessDesignVisible={this.state.addProcessDesignVisible}
            cancel={this.closeModal}
            getParams = {this.getParams.bind(this)}
          />
          <ProcessDataVisualModal
            whetherTest={whetherTest}
            showProcessDataVisible={this.state.showProcessDataVisible}
            cancel={this.closeModal}
          />
          <div className='dataTableWrapper'>
            <ProcessDataTable
              columns = {columns}
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
