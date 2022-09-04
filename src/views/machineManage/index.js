import React, { Component } from 'react'
import { Select, Button } from 'antd'
import { throttle } from '../../publicFunction'
import Equipment from './equipment'
import AddEquipment from './addEquipment'
import './machineManage.less'
import { machineManageUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'

const model = new Model()
const { Option } = Select
class MachineManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      whetherTest: false, // 是否是测试  true为是 false为否
      search: false, // 是否搜索
      addEquipVisible: false, // 添加新设备框
      search_equipment_type: '', // 搜索框 机床类型
      search_equipment_status: '', // 搜索框 设备状态
      keyValue: '' // 类型和设备状态的keyValue，用于重置
    }
  }
  componentDidMount() {
		const params = this.getParams()
		this.getProcessMachineList(params)
	}
  // 分页 搜索用
  getParams(search_equipment_type = null, search_equipment_status = null) {
    let params = {}
    params = {
      search_equipment_type,
      search_equipment_status
    }
    return params
  }
  // 获得机床表
  getProcessMachineList(params) {
    // const me = this // 让this指向不会出错
    model.fetch(
        params,
        machineManageUrl,
        'get',
        function(response) {
          console.log(response.data.data[0])
            // if (me.state.whetherTest === false) {
            //   me.setState({
            //     total: response.data.total,
            //     data: response.data.records,
            //     currentPage: params['currentPage']
            //   })
            // }
        },
        function() {
            message.warning('加载失败，请重试')
        },
        this.state.whetherTest
    )
  }
  // 机床类型搜索的获取
  handlemachinestype = (string) => {
    this.setState({ search_equipment_type: string })
    // console.log(parseInt(string, 0))
  }
  // 设备状态的获取
  handlestatus = (string) => {
    this.setState({ search_equipment_status: string })
    // console.log(parseInt(string, 0))
  }
  // 搜索
  searchInfo = throttle(() => {
    this.setState({ search: true })
    const { search_equipment_type, search_equipment_status } = this.state
    const params = this.getParams(search_equipment_type, search_equipment_status)
    console.log(params)
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
		this.getProcessMachineList(params)
    this.setState({
      search_equipment_type: '',
      search_equipment_status: '',
      keyValue: new Date(),
      search: false
    })
  }
  // 添加新机床
  showAddMachine = () => {
    this.setState({
      addEquipVisible: true
    })
  }
  // 关闭弹窗
  closeModal = () => {
    this.setState({
      addEquipVisible: false
    })
  }
  // 将数据分组
  getGroup = (data, key) => {
    const groups = {}
    data.forEach(c => {
      const value = c[key]
      groups[value] = groups[value] || []
      groups[value].push(c)
    })
    // console.log(groups)
    return groups
  }
  render() {
    const { keyValue, addEquipVisible, whetherTest } = this.state
    const selectData = [
      {
        eid: '1',
        equipment_code: '001',
        equipment_name: 'VMC850E',
        equipment_type: '立式加工中心',
        equipment_status: '1'
      },
      {
        eid: '2',
        equipment_code: '002',
        equipment_name: 'VMC850E',
        equipment_type: '立式加工中心',
        equipment_status: '0'
      },
      {
        eid: '3',
        equipment_code: '003',
        equipment_name: 'VMC850E',
        equipment_type: '立式加工中心',
        equipment_status: '2'
      },
      {
        eid: '4',
        equipment_code: '004',
        equipment_name: 'xk5030',
        equipment_type: '数控铣床',
        equipment_status: '1'
      },
      {
        eid: '5',
        equipment_code: '005',
        equipment_name: 'xk5030',
        equipment_type: '数控铣床',
        equipment_status: '0'
      }
    ]
    const Newdata = this.getGroup(selectData, 'equipment_type')
    return (
      <div>
        <div className='title'>
        机床在线监测及可视化分析系统
        </div>
        <div className='line-bottom-high'></div>
        <div className='Search'>
          <div className='search-machine'>机床类型筛选:</div>
          <Select
            className='machinestyle'
            onSelect={(string) => this.handlemachinestype(string)}
            key={ keyValue }
            allowClear
          >
            <Option key='0' value='0'>立式加工中心</Option>
            <Option key='1' value='1'>数控铣床</Option>
            <Option key='2' value='2'>数控钻床</Option>
          </Select>
          <div className='search-status'>设备状态:</div>
          <div className='status'>
            <Select
              className='machinestatus'
              onSelect={(string) => this.handlestatus(string)}
              key={ keyValue }
              allowClear
            >
              <Option key='0' value='0'>停运</Option>
              <Option key='1' value='1'>在线</Option>
              <Option key='2' value='2'>报修</Option>
            </Select>
          </div>
          <div className='button1'>
            <Button type='primary' onClick={ this.searchInfo }>搜索</Button>
          </div>
          <div className='button2'>
            <Button onClick={ this.handleReset } >重置</Button>
          </div>
          <div className='button3'>
            <Button type='primary' onClick={ this.showAddMachine }>添加机床</Button>
          </div>
        </div>
        <AddEquipment
          whetherTest={whetherTest}
          addEquipVisible = { addEquipVisible }
          cancel={this.closeModal}
          getParams = {this.getParams.bind(this)}
        />
        {/* <div className='machine_content'>
          <div className='machineStyle'>立式加工中心</div>
          <div className='line-bottom'></div>
          <Equipment equipment_code={ 'VMC850E-001' } client_unit={ '立式加工中心' } status={ '1' } />
          <Equipment equipment_code={ 'VMC850E-002' } client_unit={ '立式加工中心' } status={ '0' } />
          <Equipment equipment_code={ 'VMC850E-003' } client_unit={ '立式加工中心' } status={ '2' } />
        </div>
        <div className='machine_content'>
          <div className='machineStyle'>数控铣床</div>
          <div className='line-bottom'></div>
          <Equipment equipment_code={ 'xk5030-004' } client_unit={ '数控铣床' } status={ '1' } />
        </div> */}
        { Object.keys(Newdata).map((key, index) => {
            return <div key={ index } className='machine_content'>
              <div className='machineStyle' >{ key }</div>
              <div className='line-bottom'></div>
              { Newdata[key].map((item, index) => {
                  return <Equipment key={ index } eid={ item.eid } equipment_desc={ item.equipment_name + '-' + item.equipment_code } equipment_type={ item.equipment_type } equipment_status={ item.equipment_status } />
                }) }
            </div>
          })
        }
      </div>
    )
  }
}

export default MachineManage
