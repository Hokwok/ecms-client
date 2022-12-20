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
      data_efficiency: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.detailInfo !== prevProps.detailInfo) {
      const detailInfo = this.props.detailInfo
      this.setState({
        process_n: detailInfo[0].process_n,
        process_vf: detailInfo[0].process_vf,
        process_ap: detailInfo[0].process_ap,
        process_ae: detailInfo[0].process_ae,
        data_p: detailInfo[0].pdata.data_p,
        data_sec: detailInfo[0].pdata.data_sec,
        data_ra_first: detailInfo[0].pdata.data_ra_first,
        data_ra_second: detailInfo[0].pdata.data_ra_second,
        data_fx_first: detailInfo[0].pdata.data_fx_first,
        data_fx_second: detailInfo[0].pdata.data_fx_second,
        data_fy_first: detailInfo[0].pdata.data_fy_first,
        data_fy_second: detailInfo[0].pdata.data_fy_second,
        data_fz_first: detailInfo[0].pdata.data_fz_first,
        data_fz_second: detailInfo[0].pdata.data_fz_second,
        data_mx_first: detailInfo[0].pdata.data_mx_first,
        data_mx_second: detailInfo[0].pdata.data_mx_second,
        data_my_first: detailInfo[0].pdata.data_my_first,
        data_my_second: detailInfo[0].pdata.data_my_second,
        data_mz_first: detailInfo[0].pdata.data_mz_first,
        data_mz_second: detailInfo[0].pdata.data_mz_second,
        data_sce: detailInfo[0].pdata.data_sce,
        data_mrr: detailInfo[0].pdata.data_mrr,
        data_efficiency: detailInfo[0].pdata.data_efficiency
      })
    }
  }
  // 取消按钮事件
  handleCancel = () => {
    this.props.cancel(false)
  }
  // 确认按钮事件
  handleOk = () => {
    this.props.cancel(false)
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
    data_efficiency } = this.state
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
          </Descriptions>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(DetailProcessTask)
