import React, { Component } from 'react'
import { Button, Empty, Icon, message, Statistic } from 'antd'
import PowerChart from './powerChart'
import './ecmPredict.less'

class EcmPredict extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ecm_value: '',
      process_time: '',
      process_length: '',
      option: {
        title: {
          text: '功率曲线',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          axisTick: {
            inside: 'ture'
          },
          type: 'value',
          name: '功率(W)',
          min: 0,
          max: 1400,
          splitLine: { show: false },
          splitNumber: 7
        },
        xAxis: {
          axisTick: {
          inside: 'ture',
          interval: 'auto'
          },
          splitNumber: 10,
          type: 'value',
          name: '时间(S)',
          min: 0,
          max: 220,
          splitLine: { show: false }
        },
        series: []
      },
      text: '',
      changefile: 0,
      uploadcode: 0
    }
  }
  handleCalcPower() {
    this.setState({
      ecm_value: '32',
      process_time: '118',
      process_length: '342',
      option: {
        title: {
          text: '功率曲线',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          axisTick: {
            inside: 'ture'
          },
          type: 'value',
          name: '功率(W)',
          min: 0,
          max: 1400,
          splitLine: { show: false },
          splitNumber: 7
        },
        xAxis: {
          axisTick: {
          inside: 'ture',
          interval: 'auto'
          },
          splitNumber: 10,
          type: 'value',
          name: '时间(S)',
          min: 0,
          max: 220,
          splitLine: { show: false }
        },
        series: [
          {
            data: [
              [0, 342],
              [5, 342],
              [6.1, 959],
              [6.1, 342],
              [6.1, 342],
              [6.1, 766],
              [6.8, 877],
              [8.2, 766],
              [27.3, 871],
              [38.6, 848],
              [47.6, 871],
              [56.6, 871],
              [67.9, 848],
              [71.9, 766],
              [98.0, 871],
              [102.0, 766],
              [108.7, 789],
              [115.4, 848],
              [123.4, 789],
              [128.7, 848],
              [131.4, 789],
              [136.7, 848],
              [139.4, 789],
              [144.7, 848],
              [147.4, 789],
              [152.7, 848],
              [155.4, 789],
              [160.7, 848],
              [163.4, 789],
              [168.7, 848],
              [176.7, 789],
              [183.4, 848],
              [190.0, 789],
              [190.0, 766],
              [190.0, 766],
              [190.0, 766],
              [190.0, 766],
              [200.0, 342]
            ],
            type: 'line',
            step: 'start',
            symbol: 'none'
          }
        ]
      }
    })
    message.success('运行结束', 10)
  }
  render() {
    const { uploadcode, ecm_value, process_time, process_length } = this.state
    return (
      <div className='ecm_predict_wrapper'>
        <div className='wrapleft'>
          <input type='hidden'/>
          <div>
            <input className='file-btn' onClick={ () => this.changeFile() } style={ { width: '50%' } } type='file' id='file'/>
            <button>
              <Icon type='upload' />
              选择文件
            </button>
            <Button style={{ marginLeft: '30px', marginTop: '10px' }} type='primary' onClick={ () => this.handleUpload() }>上传</Button>
          </div>
          { uploadcode === 0
          ? <Empty className='empty' image={Empty.PRESENTED_IMAGE_SIMPLE} />
          : <div>
              <div className='codecontent' dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
            </div>
          }
          <div>
            <Button className='codebutton' type='primary' onClick={ () => this.handleCalcPower() }>运行</Button>
          </div>
        </div>
        <div className='wrapright'>
          <div className='wrapright_top'>
            <PowerChart className='chart' option={this.state.option}/>
          </div>
          <div className='wrapright_bottom'>
            <div className='wrapright_bottom_title'>预测结果</div>
            <div className='resultshow_first'>
              <span style={{ display: 'inline-block', width: '8rem' }}>
                <span style={{ float: 'left', fontSize: '17px' }}>能耗值:</span>
                <span style={{ float: 'right', fontSize: '17px' }}>(KJ)</span>
                <Statistic valueStyle={{ float: 'right', fontSize: '17px' }} value={ecm_value} />
              </span>
              <span style={{ display: 'inline-block', marginLeft: '5rem', width: '8rem' }}>
                <span style={{ float: 'left', fontSize: '17px' }}>加工时间:</span>
                <span style={{ float: 'right', fontSize: '17px' }}>(s)</span>
                <Statistic valueStyle={{ float: 'right', fontSize: '17px' }} value={ process_time } />
              </span>
            </div>
            <div className='resultshow_second'>
              <span style={{ display: 'inline-block', width: '12rem' }}>
                <span style={{ float: 'left', fontSize: '17px' }}>加工路径长度:</span>
                <span style={{ float: 'right', fontSize: '17px' }}>(mm)</span>
                <Statistic valueStyle={{ float: 'right', fontSize: '17px' }} value={ process_length } />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  changeFile = () => {
    this.setState({
      changefile: 1
    })
  }
  handleUpload() {
    const { changefile } = this.state
    if (changefile) {
      const me = this
      var f = document.getElementById('file').files[0]
      var r = new FileReader()
      r.onload = function() {
        const str = this.result
        const temp = str.replace(/\n/g, '<br/>')
        me.setState({
          text: temp,
          uploadcode: 1
        })
      }
      r.readAsText(f, 'UTF-8') // "UTF-8"是读取文件的文件编码，也可以是"GB2312"。
    } else {
      message.error('请先选择代码文件')
    }
  }
}

export default EcmPredict
