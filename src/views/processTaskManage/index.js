import React, { Component } from 'react'
import { Input, Button, Select, Popconfirm, Tooltip, Icon } from 'antd'
import { throttle } from '../../publicFunction'
import ProcessTaskTable from './processTaskTable'
import AddProcessTask from './addProcessTask'
import EditProcessTask from './editProcessTask'
import DetailProcessTask from './detailProcessTask'
import './processTaskManage.less'

const { Option } = Select
class processTaskManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          pid: '001',
          process_code: '2021103001',
          process_n: '500',
          process_vf: '100',
          process_ap: '0.2',
          process_ae: '4',
          process_state: '1',
          process_time: '2021-10-30',
          process_note: '无'
        }, {
          pid: '002',
          process_code: '2021103002',
          process_n: '600',
          process_vf: '200',
          process_ap: '0.2',
          process_ae: '4',
          process_state: '1',
          process_time: '2021-10-30',
          process_note: '无'
        }, {
          pid: '003',
          process_code: '2021103003',
          process_n: '650',
          process_vf: '150',
          process_ap: '0.2',
          process_ae: '4',
          process_state: '0',
          process_time: '2021-10-30',
          process_note: '无'
        }
      ],
      isLoading: false,
      currentPage: 1,
      size: 10,
      total: 0,
      whetherTest: false, // 是否是测试  true为是 false为否
      search_process_code: '', // 搜索框 加工编号
      search_process_state: '', // 搜索加工状态
      keyValue: '', // 加工状态的keyValue，用于重置
      search: false, // 是否搜索
      addProcessVisible: false, // AddProcessTask是否显示
      editProcessVisible: false, // EditProcessTask是否显示
      editInfo: null, // 存取操作行的数据
      detailProcessVisible: false
    }
  }
  componentDidMount() {
		const params = this.getParams()
		this.getProcessTaskList(params)
	}
  // 分页 搜索用
  getParams(currentPage = 1, pageSize = 10, search_process_code = null, search_process_state = null) {
    let params = {}
    params = {
      currentPage,
      pageSize,
      search_process_code,
      search_process_state
    }
    return params
  }
  getProcessTaskList(params) {
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
  // 把数据存到加工信息表中
  handleData = () => {
    const { data } = this.state
    if (data !== undefined) {
      const tableDate = data.map((item) => ({
          pid: item.pid,
          process_code: item.process_code,
          process_n: item.process_n,
          process_vf: item.process_vf,
          process_ap: item.process_ap,
          process_ae: item.process_ae,
          process_state: item.process_state === '0' ? '未开始' : '已完成',
          process_time: item.process_time,
          process_note: item.process_note
      }))
      // console.log(tableDate)
      return tableDate
    }
  }
  // 输入框的获取
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // 加工状态的获取
  handleStatusSelect = (string) => {
    this.setState({ search_process_state: string })
    // console.log(parseInt(string, 0))
  }
  // 搜索
  searchInfo = throttle(() => {
    this.setState({ search: true })
    const { search_process_code, search_process_state } = this.state
    const params = this.getParams(1, 10, search_process_code, search_process_state) // 1, 10,
    // this.getEquipData(params)
    // console.log(params)
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
    this.getProcessTaskList(params)
    this.setState({
      search_process_code: '',
      search_process_state: '',
      keyValue: new Date(),
      currentPage: 1,
      search: false
    })
  }
  // 添加弹窗显示
  showAddProcess = () => {
    this.setState({
      addProcessVisible: true
    })
  }
  // 打开编辑弹窗
  showEditModal = (record) => {
    this.setState({
      editProcessVisible: true
    })
    if (record !== undefined) {
			this.setState({
				editInfo: record
			})
		}
  }
  // 删除加工任务
  deleteInfo = (key) => {
    console.log('删除：' + key)
  }
  // 打开详情弹窗
  showdetailModal = (record) => {
    this.setState({
      detailProcessVisible: true
    })
    if (record !== undefined) {
			this.setState({
				editInfo: record
			})
		}
    // console.log(record)
  }
  // 关闭弹窗
  closeModal = () => {
    this.setState({
        addProcessVisible: false,
        editProcessVisible: false,
        detailProcessVisible: false
    })
  }
  handleStateColor = (string) => {
    if (string === '未开始') {
      return { color: '#DAA520' }
    } else if (string === '已完成') {
      return { color: 'green' }
    }
  }
  render() {
    const tableData = this.handleData()
    const { isLoading, total, currentPage, size, keyValue, whetherTest, editInfo } = this.state
    const columns = [
      { title: '加工编号', dataIndex: 'process_code', width: '10%', align: 'center' },
      { title: '主轴转速', dataIndex: 'process_n', width: '10%', align: 'center' },
      { title: '进给速度', dataIndex: 'process_vf', width: '10%', align: 'center' },
      { title: '加工深度', dataIndex: 'process_ap', width: '10%', align: 'center' },
      { title: '加工宽度', dataIndex: 'process_ae', width: '10%', align: 'center' },
      { title: '加工状态', dataIndex: 'process_state', width: '10%', align: 'center',
      render: text => <div style={this.handleStateColor(text)}>{text}</div> },
      { title: '加工时间', dataIndex: 'process_time', width: '10%', align: 'center' },
      { title: '备注', dataIndex: 'process_note', width: '10%', align: 'center',
        onCell: () => {
          return {
            style: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 250 }
          }
        }
      }]
      columns.push({
        title: '操作', dataIndex: 'action', width: '20%', align: 'center',
        render: (text, record, index) => {
          const content = []
          switch (record.process_state) {
            case '未开始':
              content.push(
                <div key='未开始' >
                  <Tooltip title='编辑加工数据'>
                    <Icon type='edit' className='edit' theme='twoTone' style={{ fontSize: '20px', marginRight: '15px' }}
                      onClick={() => this.showEditModal(record)}
                    />
                  </Tooltip>
                  <Popconfirm
                    title='确定删除该条记录?'
                    onConfirm={() => this.deleteInfo(record.pid)}
                    okText='是'
                    cancelText='否'
                    key='确定删除该条记录?'
                  >
                    <Tooltip title='删除信息'>
                    <Icon type='delete' theme='filled' style={{ fontSize: '20px', color: 'red', marginRight: '10px' }}/>
                    </Tooltip>
                  </Popconfirm>
                </div>
              )
            break
            case '已完成':
              content.push(
                <div key='已完成' >
                  <Tooltip title='查看加工详情'>
                    <Icon type='profile' theme='twoTone' style={{ fontSize: '20px' }}
                      onClick={() => this.showdetailModal(record)}
                    />
                  </Tooltip>
                </div>
              )
            break
            default:
              break
          }
          return content
        }
      })
    return (
      <div className='process_task_manage_wrapper'>
        <div id='process_task'>
          <div className='header'>
            <div>
              <h2>加工任务管理</h2>
            </div>
            <div className='filter'>
              <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ float: 'left' }} >
                  <div className='input' >加工编号:</div>
                  <Input
                    style={{ width: '220px' }}
                    name='search_process_code'
                    onChange={ this.handleChange }
                    value={ this.state.search_process_code }
                  />
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <div className='titles'>加工状态:</div>
                  <Select
                    style={{ width: '250px' }}
                    allowClear
                    onSelect={ (string) => this.handleStatusSelect(string) }
                    key={ keyValue }
                  >
                    <Option key='0' value='0'>已完成</Option>
                    <Option key='1' value='1'>未开始</Option>
                  </Select>
                </div>
                <Button className='button' type='primary' onClick={this.searchInfo}>搜索</Button>
                <Button className='button' onClick={this.handleReset}>重置</Button>
                <Button className='button' type='primary' onClick={this.showAddProcess}>添加加工任务</Button>
              </div>
            </div>
          </div>
          <AddProcessTask
            whetherTest={whetherTest}
            addProcessVisible={this.state.addProcessVisible} // 这里把state里面的addProcessVisible传递到子组件
            cancel={this.closeModal}
            getParams = {this.getParams.bind(this)}
          />
          <EditProcessTask
            whetherTest={whetherTest}
            editProcessVisible={this.state.editProcessVisible} // 这里把state里面的addProcessVisible传递到子组件
            editInfo = { editInfo }
            cancel={this.closeModal}
            getParams = {this.getParams.bind(this)}
          />
          <DetailProcessTask
            whetherTest={whetherTest}
            detailProcessVisible={this.state.detailProcessVisible} // 这里把state里面的detailProcessVisible传递到子组件
            editInfo = { editInfo }
            cancel={this.closeModal}
          />
          <div className='tableWrapper'>
            <ProcessTaskTable
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

export default processTaskManage
