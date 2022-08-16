import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'
import * as constants from './constants'
// import Index from '../../index'
import MachineManage from '../../../views/machineManage'
import MachineMonitor from '../../../views/machineMonitor'
import ProcessTaskManage from '../../../views/processTaskManage'
import ProcessDataManage from '../../../views/processDataManage'
import Visualize from '../../../views/machineVisualize'
import EcmAnalysis from '../../../views/ncCodeAnalysis/ecmAnalysis'
import EcmPredict from '../../../views/ncCodeAnalysis/ecmPredict'
import PathOpt from '../../../views/ncCodeAnalysis/pathopt'
import ParaOpt from '../../../views/ncCodeAnalysis/paraopt'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  routers: [
    {
      routerDom: <Route key={'/app/machine_manage'} exact path={'/app/machine_manage'} component={ (props) => <MachineManage { ...props }/> } />,
      link: '/app/machine_manage',
      title: '首页',
      key: '/app/machine_manage',
      child: []
    }, {
      routerDom: <Route key={'/app/monitoring'} exact path={'/app/monitoring'} component={ (props) => <MachineMonitor { ...props }/> } />,
      link: '/app/monitoring',
      title: '机床监控',
      key: '/app/monitoring',
      child: []
    }, {
      routerDom: null,
      link: '',
      title: '加工管理',
      key: 'app2',
      child: [{
        routerDom: <Route key={'/app/process_task_manage'} exact path={'/app/process_task_manage'} component={ (props) => <ProcessTaskManage { ...props }/> } />,
        link: '/app/process_task_manage',
        title: '加工任务管理',
        key: '/app/process_task_manage',
        child: []
      }, {
        routerDom: <Route key={'/app/process_data_manage'} exact path={'/app/process_data_manage'} component={ (props) => <ProcessDataManage { ...props }/> } />,
        link: '/app/process_data_manage',
        title: '加工数据管理',
        key: '/app/process_data_manage',
        child: []
      }]
    }, {
      routerDom: null,
      link: '',
      title: '可视化分析',
      key: 'app3',
      child: [{
        routerDom: <Route key={'/app/milling_visualize'} exact path={'/app/milling_visualize'} component={ (props) => <Visualize { ...props }/> } />,
        link: '/app/milling_visualize',
        title: '铣削数据可视化',
        key: '/app/milling_visualize',
        child: []
      }]
    }, {
      routerDom: null,
      link: '',
      title: 'NC代码分析',
      key: 'app4',
      child: [{
        routerDom: <Route key={'/app/ecm_analysis'} exact path={'/app/ecm_analysis'} component={ (props) => <EcmAnalysis { ...props }/> } />,
        link: '/app/ecm_analysis',
        title: '能耗分析',
        key: '/app/ecm_analysis',
        child: []
      }, {
        routerDom: <Route key={'/app/ecm_predict'} exact path={'/app/ecm_predict'} component={ (props) => <EcmPredict { ...props }/> } />,
        link: '/app/ecm_predict',
        title: '能耗预测',
        key: '/app/ecm_predict',
        child: []
      }, {
        routerDom: <Route key={'/app/pathopt'} exact path={'/app/pathopt'} component={ (props) => <PathOpt { ...props }/> } />,
        link: '/app/pathopt',
        title: '路径优化',
        key: '/app/pathopt',
        child: []
      }, {
        routerDom: <Route key={'/app/paraopt'} exact path={'/app/paraopt'} component={ (props) => <ParaOpt { ...props }/> } />,
        link: '/app/paraopt',
        title: '参数优化',
        key: '/app/paraopt',
        child: []
      }]
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    default:
      return state
  }
}
