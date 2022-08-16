import React, { Component } from 'react'
import { Modal, Form, Descriptions } from 'antd'

class DetailProcessTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      process_code: '',
      process_n: '',
      process_vf: '',
      process_ap: '',
      process_ae: '',
      data_p: '',
      data_sec: '',
      data_ra_first: '',
      data_ra_second: '',
      data_fx_first: '',
      data_fx_second: '',
      data_fy_first: '',
      data_fy_second: '',
      data_fz_first: '',
      data_fz_second: '',
      data_mx_first: '',
      data_mx_second: '',
      data_my_first: '',
      data_my_second: '',
      data_mz_first: '',
      data_mz_second: '',
      data_sce: '',
      data_mrr: '',
      data_efficiency: '',
      data_duration: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.editInfo !== prevProps.editInfo) {
      const editInfo = this.props.editInfo
      console.log(editInfo)
      this.setState({
        process_n: editInfo.process_n,
        process_vf: editInfo.process_vf,
        process_ap: editInfo.process_ap,
        process_ae: editInfo.process_ae
      })
      this.getProcessData(editInfo.pid)
    }
  }
  // 根据pid获取对应process_data的数据
  getProcessData(pid) {
    console.log(pid)
    // 定义假数据
    const data = {
      data_p: '592',
      data_sec: '444',
      data_ra_first: '1.49',
      data_ra_second: '1.54',
      data_fx_first: '-5.03',
      data_fx_second: '2.74',
      data_fy_first: '2.52',
      data_fy_second: '7.88',
      data_fz_first: '10.77',
      data_fz_second: '8.86',
      data_mx_first: '-0.425',
      data_mx_second: '-1.07',
      data_my_first: '-0.795',
      data_my_second: '1.26',
      data_mz_first: '0.46',
      data_mz_second: '-0.55',
      data_sce: '测试',
      data_mrr: '1.33',
      data_efficiency: '测试',
      data_duration: '测试时长'
    }
    this.setState({
      data_p: data.data_p,
      data_sec: data.data_sec,
      data_ra_first: data.data_ra_first,
      data_ra_second: data.data_ra_second,
      data_fx_first: data.data_fx_first,
      data_fx_second: data.data_fx_second,
      data_fy_first: data.data_fy_first,
      data_fy_second: data.data_fy_second,
      data_fz_first: data.data_fz_first,
      data_fz_second: data.data_fz_second,
      data_mx_first: data.data_mx_first,
      data_mx_second: data.data_mx_second,
      data_my_first: data.data_my_first,
      data_my_second: data.data_my_second,
      data_mz_first: data.data_mz_first,
      data_mz_second: data.data_mz_second,
      data_sce: data.data_sce,
      data_mrr: data.data_mrr,
      data_efficiency: data.data_efficiency,
      data_duration: data.data_duration
    })
  }
  // 取消按钮事件
  handleCancel = () => {
    this.props.cancel()
  }
  // 确认按钮事件
  handleOk = () => {
    this.props.cancel()
  }
  render() {
    const { process_n,
    process_vf,
    process_ap,
    process_ae,
    data_p,
    data_sec,
    data_ra_first,
    data_ra_second,
    data_fx_first,
    data_fx_second,
    data_fy_first,
    data_fy_second,
    data_fz_first,
    data_fz_second,
    data_mx_first,
    data_mx_second,
    data_my_first,
    data_my_second,
    data_mz_first,
    data_mz_second,
    data_sce,
    data_mrr,
    data_efficiency,
    data_duration } = this.state
    return (
      <div>
        <Modal
          title='加工详情'
          visible={this.props.detailProcessVisible}
          onCancel={this.handleCancel}
          onOk={ this.handleOk }
          confirmLoading={ false }
          width={ '600px' }
        >
          <Descriptions title=''>
            <Descriptions.Item label='主轴转速'>{process_n}(r/min)</Descriptions.Item>
            <Descriptions.Item label='进给速度'>{process_vf}(mm/min)</Descriptions.Item>
            <Descriptions.Item label='切削深度'>{process_ap}(mm)</Descriptions.Item>
            <Descriptions.Item label='切削宽度'>{process_ae}(mm)</Descriptions.Item>
            <Descriptions.Item label='切削总功率'>{data_p}(W)</Descriptions.Item>
            <Descriptions.Item label='SEC'>{data_sec}(J/mm³)</Descriptions.Item>
            <Descriptions.Item label='Ra-1'>{data_ra_first}(μm)</Descriptions.Item>
            <Descriptions.Item label='Ra-2'>{data_ra_second}(μm)</Descriptions.Item>
            <Descriptions.Item label='Fx-1'>{data_fx_first}(N)</Descriptions.Item>
            <Descriptions.Item label='Fx-2'>{data_fx_second}(N)</Descriptions.Item>
            <Descriptions.Item label='Fy-1'>{data_fy_first}(N)</Descriptions.Item>
            <Descriptions.Item label='Fy-2'>{data_fy_second}(N)</Descriptions.Item>
            <Descriptions.Item label='Fz-1'>{data_fz_first}(N)</Descriptions.Item>
            <Descriptions.Item label='Fz-2'>{data_fz_second}(N)</Descriptions.Item>
            <Descriptions.Item label='Mx-1'>{data_mx_first}(Nm)</Descriptions.Item>
            <Descriptions.Item label='Mx-2'>{data_mx_second}(Nm)</Descriptions.Item>
            <Descriptions.Item label='My-1'>{data_my_first}(Nm)</Descriptions.Item>
            <Descriptions.Item label='My-2'>{data_my_second}(Nm)</Descriptions.Item>
            <Descriptions.Item label='Mz-1'>{data_mz_first}(Nm)</Descriptions.Item>
            <Descriptions.Item label='Mz-2'>{data_mz_second}(Nm)</Descriptions.Item>
            <Descriptions.Item label='SCE'>{data_sce}(J/mm³)</Descriptions.Item>
            <Descriptions.Item label='MRR'>{data_mrr}(mm³/s)</Descriptions.Item>
            <Descriptions.Item label='能量效率'>{data_efficiency}</Descriptions.Item>
            <Descriptions.Item label='加工时长'>{data_duration}(s)</Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(DetailProcessTask)
