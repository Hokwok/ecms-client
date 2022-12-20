import React, { Component } from 'react'
import { message, Button } from 'antd'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { ScrollBoard, Decoration4, BorderBox8, DigitalFlop, Charts, ScrollRankingBoard, Loading } from '@jiaminghi/data-view-react'
import BubbleChart from './charts/bubbleChart'
import CurveChart from './charts/curveChart'
import TreeChart from './charts/treeChart'
import { Model } from '../../dataModule/testBone'
import { processManageUrl, experimentDataManageUrl, machineManageUrl, experimentDesignUrl } from '../../dataModule/UrlList'
import './energyDashboard.less'

const model = new Model()
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
class EnergyDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      power: '',
      sec: '',
      ra: '',
      option: {},
      buttonShowFlag: false,
      orImageShow: false,
      orMachineInfoShow: false,
      orScollTableShow: false,
      orAllExpermentShow: false,
      orCurrentExpermentShow: false,
      orTreeChartShow: false,
      currentId: 1,
      orCurrentDataShow: false,
      machine_type: '',
      machine_name: '',
      cutting_type: '',
      cutting_tool: '',
      code_config: {
        number: [],
        content: '加工编号：{nt}',
        style: {
          fill: '#76EEC6',
          fontSize: 15
        }
      },
      all_experment_config: {
        number: [],
        content: '实验总数：{nt}',
        style: {
          fill: '#76EEC6',
          fontSize: 20
        }
      },
      current_experment_config: {
        number: [],
        content: '当前实验：{nt}',
        style: {
          fill: '#76EEC6',
          fontSize: 20
        }
      },
      bubbleData: [],
      curveData: [],
      scroll_config: {
        header: ['加工编号', '主轴转速', '进给速度', '加工深度', '加工宽度', '加工状态'],
        columnWidth: [150],
        align: ['center'],
        data: []
      },
      energy_config: {
        rowNum: 5,
        data: [],
        unit: '%'
      },
      treeId1: 'tree1',
      treeId2: 'tree2',
      treeId3: 'tree3',
      treeId4: 'tree4',
      treeData1: {},
      treeData2: {},
      treeData3: {},
      treeData4: {},
      record: []
    }
  }
  componentDidMount() {
    let record = null
    try {
      record = this.props.location.state
    } catch (error) {
      console.log(error)
    }
    if (record === undefined) {
      window.location.href = '/login'
    }
    this.setState({
      record: record.record
    })
    this.getProcessDesign(record.record.expid)
    this.getMachineId(record.record)
    this.getExperimentData(record.record)
  }

  getProcessDesign(expid) {
    const me = this // 让this指向不会出错
    model.fetch(
      '',
      `${experimentDesignUrl}${expid}`,
      'get',
      function(res) {
        const treeData1 = {
          name: '主轴转速',
          children: []
        }
        const treeData2 = {
          name: '进给转速',
          children: []
        }
        const treeData3 = {
          name: '加工深度',
          children: []
        }
        const treeData4 = {
          name: '加工宽度',
          children: []
        }
        const treeData1_children = []
        const treeData2_children = []
        const treeData3_children = []
        const treeData4_children = []
        for (var i = 0; i < res.data.data.length; i++) {
          treeData1_children[i] = {
            name: res.data.data[i].pd_n + '(r/min)'
          }
          treeData2_children[i] = {
            name: res.data.data[i].pd_vf + '(mm/min)'
          }
          treeData3_children[i] = {
            name: res.data.data[i].pd_ap + '(mm)'
          }
          treeData4_children[i] = {
            name: res.data.data[i].pd_ae + '(mm)'
          }
        }
        treeData1.children = treeData1_children
        treeData2.children = treeData2_children
        treeData3.children = treeData3_children
        treeData4.children = treeData4_children
        me.setState({
          orTreeChartShow: true,
          treeData1,
          treeData2,
          treeData3,
          treeData4
        })
      },
      function() {
        message.warning('加载失败，请重试')
      },
      false
    )
  }

  getMachineId = (record) => {
    const me = this
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    let params = {}
    params = {
      exp_date: record.exp_date.replace(reg, '')
    }
    model.fetch(
      params,
      experimentDataManageUrl,
      'get',
			function(res) {
        me.getMachineInfo(res.data.data[0].equipment.eid)
        const process_type_id = res.data.data[0].process_method
        me.setState({
          cutting_type: process_type_id === '0' ? '车削' : process_type_id === '1' ? '铣削' : process_type_id === '2' ? '钻削' : '磨削',
          cutting_tool: res.data.data[0].process_tool
        })
      },
      function() {
				message.error('数据获取失败，请刷新页面！')
			},
			false
    )
  }

  getMachineInfo = (eid) => {
    const me = this
    model.fetch(
      '',
      machineManageUrl,
      'get',
			function(res) {
        const machine = res.data.data.find(r => r.eid === eid)
        me.setState({
          machine_type: machine.equipment_type === '0' ? '立式加工中心' : '数控铣床',
          machine_name: machine.equipment_code + '-' + machine.equipment_name
        })
      },
      function() {
				message.error('数据获取失败，请刷新页面！')
			},
			false
    )
  }

  getExperimentData = (record) => {
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    let params = {}
    params = {
      page: 1,
      page_size: 10000,
      process_code: record.exp_date.replace(reg, ''),
      process_statue: ''
    }
    const me = this
		model.fetch(
			params,
			processManageUrl,
			'get',
			function(res) {
        const bubbleData = []
        const curveData = []
        const scroll_config_data = []
        const energy_config_data = []
        for (var i = 0; i < res.data.data.length; i++) {
          bubbleData[i] = [
            i + 1,
            ((parseFloat(res.data.data[i].pdata.data_ra_first) + parseFloat(res.data.data[i].pdata.data_ra_second)) / 2).toFixed(2),
            res.data.data[i].pdata.data_sec,
            res.data.data[i].pdata.data_p,
            ((50 * 60) / parseFloat(res.data.data[i].process_vf)).toFixed(2),
            null,
            (res.data.data[i].pdata.data_efficiency * 100).toFixed(2),
            '' // 能效状态
          ]
          curveData[i] = [
            '实验' + (i + 1),
            res.data.data[i].pdata.data_sec,
            res.data.data[i].pdata.data_efficiency
          ]
          scroll_config_data[i] = [
            res.data.data[i].process_code,
            res.data.data[i].process_n,
            res.data.data[i].process_vf,
            res.data.data[i].process_ap,
            res.data.data[i].process_ae,
            res.data.data[i].process_state === '0' ? '<span style="color:yellow;">未开始</span>' : '<span style="color:green;">已完成</span>'
          ]
          energy_config_data[i] = {
            name: res.data.data[i].process_code,
            value: parseFloat((res.data.data[i].pdata.data_efficiency * 100).toFixed(2))
          }
        }
        const scroll_config = {
          header: ['加工编号', '主轴转速', '进给速度', '加工深度', '加工宽度', '加工状态'],
          columnWidth: [150],
          align: ['center'],
          data: scroll_config_data
        }
        const energy_config = {
          rowNum: 5,
          data: energy_config_data,
          unit: '%'
        }
        const all_experment_config = {
          number: [res.data.data.length],
          content: '实验总数：{nt}',
          style: {
            fill: '#76EEC6',
            fontSize: 20
          }
        }
        const current_number = parseInt(res.data.data[0].process_code.substring(res.data.data[0].process_code.length - 2), 10)
        const current_experment_config = {
          number: [current_number],
          content: '当前实验：{nt}',
          style: {
            fill: '#76EEC6',
            fontSize: 20
          }
        }
        const code_config = {
          number: [parseInt(res.data.data[0].process_code, 10)],
          content: '加工编号：{nt}',
          style: {
            fill: '#76EEC6',
            fontSize: 15
          }
        }
        const ra = ((parseFloat(res.data.data[0].pdata.data_ra_first) + parseFloat(res.data.data[0].pdata.data_ra_second)) / 2).toFixed(2)
        const data_start_efficiency = res.data.data[0].pdata.data_efficiency * 100
        const option = {
          title: {
            text: '能量效率：',
            offset: [0, -30],
            style: {
              fill: '#76EEC6',
              fontSize: 17
            }
          },
          series: [
            {
              type: 'gauge',
              data: [{ name: 'itemA', value: data_start_efficiency }],
              axisLabel: {
                formatter: '{value}%',
                style: {
                  fill: '#fff'
                }
              },
              details: {
                show: true,
                offset: [0, 50],
                style: {
                  fontSize: 15
                },
                valueToFixed: 2,
                formatter: '能效{value}%'
              },
              axisTick: {
                style: {
                  stroke: '#fff'
                }
              },
              grid: {
                left: '10%'
              },
              animationCurve: 'easeInOutBack'
            }
          ]
        }
				me.setState({
          power: res.data.data[0].pdata.data_p,
          sec: res.data.data[0].pdata.data_sec,
          ra,
          option,
          orImageShow: true,
          orScollTableShow: true,
          orMachineInfoShow: true,
          orAllExpermentShow: true,
          orCurrentExpermentShow: true,
          orCurrentDataShow: true,
          bubbleData,
          curveData: curveData.sort(function(a, b) { return b[1] - a[1] }),
          code_config,
          scroll_config,
          energy_config,
          all_experment_config,
          current_experment_config
        })
			},
			function() {
				message.error('数据获取失败，请刷新页面！')
			},
			false
		)
  }
  enterButtonShow = () => {
    this.setState({
      buttonShowFlag: true
    })
  }
  leaveButtonShow = () => {
    this.setState({
      buttonShowFlag: false
    })
  }
  changeCurrentData = () => {
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    const me = this
    const { currentId } = me.state
    me.setState({
      orCurrentExpermentShow: false
    })
    let params = {}
    params = {
      page: 1,
      page_size: 10000,
      process_code: me.state.record.exp_date.replace(reg, ''),
      process_statue: ''
    }
		model.fetch(
			params,
			processManageUrl,
			'get',
			function(res) {
        const current_number = parseInt(res.data.data[currentId].process_code.substring(res.data.data[currentId].process_code.length - 2), 10)
        const current_experment_config = {
          number: [current_number],
          content: '当前实验：{nt}',
          style: {
            fill: '#76EEC6',
            fontSize: 20
          }
        }
        const code_config = {
          number: [parseInt(res.data.data[currentId].process_code, 10)],
          content: '加工编号：{nt}',
          style: {
            fill: '#76EEC6',
            fontSize: 15
          }
        }
        const data_start_efficiency = res.data.data[currentId].pdata.data_efficiency * 100
        const option = {
          title: {
            text: '能量效率：',
            offset: [0, -30],
            style: {
              fill: '#76EEC6',
              fontSize: 17
            }
          },
          series: [
            {
              type: 'gauge',
              data: [{ name: 'itemA', value: data_start_efficiency }],
              axisLabel: {
                formatter: '{value}%',
                style: {
                  fill: '#fff'
                }
              },
              details: {
                show: true,
                offset: [0, 50],
                style: {
                  fontSize: 15
                },
                valueToFixed: 2,
                formatter: '能效{value}%'
              },
              axisTick: {
                style: {
                  stroke: '#fff'
                }
              },
              grid: {
                left: '10%'
              },
              animationCurve: 'easeInOutBack'
            }
          ]
        }
        const ra = ((parseFloat(res.data.data[currentId].pdata.data_ra_first) + parseFloat(res.data.data[currentId].pdata.data_ra_second)) / 2).toFixed(2)
        me.setState({
          power: res.data.data[currentId].pdata.data_p,
          sec: res.data.data[currentId].pdata.data_sec,
          ra,
          option,
          currentId: currentId === res.data.data.length - 1 ? 0 : currentId + 1,
          current_experment_config,
          code_config,
          orCurrentExpermentShow: true
        })
      },
			function() {
				message.error('数据获取失败，请刷新页面！')
			},
			false
		)
  }

  render() {
    const {
      power,
      sec,
      ra,
      option,
      treeId1,
      treeId2,
      treeId3,
      treeId4,
      treeData1,
      treeData2,
      treeData3,
      treeData4,
      code_config,
      scroll_config,
      all_experment_config,
      current_experment_config,
      buttonShowFlag,
      orImageShow,
      orMachineInfoShow,
      orScollTableShow,
      orAllExpermentShow,
      orCurrentExpermentShow,
      orTreeChartShow,
      orCurrentDataShow,
      energy_config,
      machine_type,
      machine_name,
      cutting_type,
      cutting_tool
    } = this.state
    return (
      <div className='dashboard-wrapper'>
        <div className='dashboard-header'>
          <h3 className='dashboard-header-title'>加工能效数据可视化</h3>
        </div>
        <div className='dashboard-wrapper-l'>
          <div className='dashboard-wrapper-l-top'>
            <div className='dashboard-wrapper-l-top-title'>
              加工设备
            </div>
            { orImageShow === false ? <Loading style={{ color: 'white', margin: '-20px 0' }}>Loading...</Loading>
            : <div className='dashboard-wrapper-l-top-machineimg'></div>
            }
          </div>
          <div className='dashboard-wrapper-l-bottom'>
            <div className='dashboard-wrapper-l-bottom-title'>
              加工信息
            </div>
            { orMachineInfoShow === false ? <Loading style={{ color: 'white', margin: '-20px 0' }}>Loading...</Loading>
            : <div className='dashboard-wrapper-l-bottom-content'>
                <div className='first'>
                  <div className='type'>机床类型：{machine_type}</div>
                  <div className='code'>机床名称：{machine_name}</div>
                </div>
                <div className='second'>
                  <div className='cutting_type'>加工方式：{cutting_type}</div>
                  <div className='cutting_tool'>刀具直径：{cutting_tool}</div>
                </div>
                <div className='third'>
                  <div className='third_title'>能效信息：</div>
                  <ScrollRankingBoard config={energy_config} style={{ margin: '15px 0 0 50px', width: '80%', height: '140px' }} />
                </div>
              </div>
            }
          </div>
				</div>
        <div className='dashboard-wrapper-c'>
          <BorderBox8 className='dashboard-wrapper-c-top'>
            <div className='dashboard-wrapper-c-top-title'>
              能效分析
            </div>
            <div className='dashboard-wrapper-c-top-charts'>
              <div className='dashboard-wrapper-c-top-charts-bubble'>
                <BubbleChart bubbleData={this.state.bubbleData}/>
              </div>
              <div className='dashboard-wrapper-c-top-charts-curve'>
                <CurveChart curveData={this.state.curveData}/>
              </div>
            </div>
          </BorderBox8>
          <BorderBox8 className='dashboard-wrapper-c-bottom'>
            <div className='dashboard-wrapper-c-bottom-title'>
              {this.state.record.exp_date} 加工情况
            </div>
            { orScollTableShow === false ? <Loading style={{ color: 'white', margin: '-20px 0' }}>Loading...</Loading> : <ScrollBoard config={ scroll_config } style={{ margin: '5px 40px', width: '600px', height: '210px' }} />}
          </BorderBox8>
				</div>
        <div className='dashboard-wrapper-r'>
          <div className='dashboard-wrapper-r-top'>
            <div className='dashboard-wrapper-r-top-l'>
              { orAllExpermentShow === false ? <Loading style={{ color: 'white', margin: '-10px 0' }}>Loading...</Loading> : <DigitalFlop config={ all_experment_config } style={{ width: '200px', height: '50px' }} /> }
            </div>
            <div className='dashboard-wrapper-r-top-r'>
              <Decoration4 style={{ width: '5px', height: '100%' }}/>
            </div>
            <div className='dashboard-wrapper-r-top-number'>
              { orCurrentExpermentShow === false ? <Loading style={{ color: 'white', margin: '-10px 0' }}>Loading...</Loading> : <DigitalFlop config={ current_experment_config } style={{ width: '200px', height: '50px' }} /> }
            </div>
          </div>
          <div className='dashboard-wrapper-r-middle'>
            <div className='dashboard-wrapper-r-middle-title'>
              水平因素
            </div>
            <div className='dashboard-wrapper-r-middle-chart'>
            { orTreeChartShow === false ? <Loading style={{ color: 'white', margin: '-10px 0' }}>Loading...</Loading>
            : <AutoPlaySwipeableViews>
                <div>
                  <TreeChart treeId = { treeId1 } data = { treeData1 }/>
                </div>
                <div>
                  <TreeChart treeId = { treeId2 } data = { treeData2 }/>
                </div>
                <div>
                  <TreeChart treeId = { treeId3 } data = { treeData3 }/>
                </div>
                <div>
                  <TreeChart treeId = { treeId4 } data = { treeData4 }/>
                </div>
              </AutoPlaySwipeableViews>
              }
            </div>
          </div>
          <div className='dashboard-wrapper-r-bottom'>
            <div className='dashboard-wrapper-r-bottom-title'>
              当前实验
            </div>
            { orCurrentDataShow === false ? <Loading style={{ color: 'white', margin: '-10px 0' }}>Loading...</Loading>
            : <div className='dashboard-wrapper-r-bottom-content' onMouseLeave={ () => this.leaveButtonShow() } onMouseEnter={ () => this.enterButtonShow() }>
                <div className='first'>
                  <div className='code'><DigitalFlop config={ code_config } style={{ width: '200px', height: '50px' }} /></div>
                  <div className='power'>切削总功率：{power}（W）</div>
                </div>
                <div className='second'>
                  <div className='sec'>SEC：{sec}（J/mm³）</div>
                  <div className='ra'>表面质量：{ra}(μm)</div>
                </div>
                <div className='third'>
                  <Charts style={{ height: '220px' }} option={option} />
                </div>
                { buttonShowFlag === false ? <div></div> : <Button type='primary' onClick={ () => this.changeCurrentData() } style={{ background: '#7EC0EE', float: 'right', margin: '-2rem 1rem' }}>切换数据</Button> }
              </div>
            }
          </div>
				</div>
        <footer className='dashboard-footer'></footer>
      </div>
    )
  }
}
export default EnergyDashboard
