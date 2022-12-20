import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { experimentDesignUrl } from '../../../dataModule/UrlList'
import { Model } from '../../../dataModule/testBone'

const model = new Model()
class EditDesign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      pd_n: '',
      pd_vf: '',
      pd_ap: '',
      pd_ae: ''
    }
  }
  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    const params = {
      pdsid: this.props.editInfo.key.replace(reg, ''),
      pd_n: this.state.pd_n,
      pd_vf: this.state.pd_vf,
      pd_ap: this.state.pd_ap,
      pd_ae: this.state.pd_ae
    }
    this.setState({
      confirmLoading: true
    })
    this.EditDesign(params)
  }

  EditDesign(params) {
    const me = this
    model.fetch(
      params,
      `${experimentDesignUrl}${me.props.expid}/`,
      'put',
      function() {
        me.setState({
          confirmLoading: false
        })
        me.props.afterOperatDesign()
        message.success('修改实验设计成功')
      },
      function() {
        message.warning('修改实验设计失败，请重试')
        setTimeout(() => {
          me.setState({
            confirmLoading: false
          })
        }, 2000)
      },
      false
    )
  }
  // 取消按钮事件
  handleCancel = () => {
    this.props.cancel()
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { confirmLoading } = this.state
    const { editInfo } = this.props
    if (editInfo === null) return null
    const formItemLayout = {
      labelCol: {
        span: 4 // 左边留白大小
      },
      wrapperCol: {
        span: 19 // 内容区大小（两者和不能!>24
      }
    }
    return (
      <div>
        <Modal
          title={'编辑' + editInfo.note}
          visible={this.props.editProcessDesignVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
          onOk={this.handleOk} // 点击确定回调
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
          destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='addProcessForm' onSubmit={this.onSubmit}>
              <Form.Item
                label='主轴转速'
                style={{ margin: '10px 0' }}
              >
                {getFieldDecorator('pd_n', {
                  rules: [{ required: true, message: '请输入主轴转速' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input style={{ width: '50%' }} name='pd_n' placeholder={editInfo.pd_n} onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='进给速度'
                style={{ margin: '10px 0' }}
              >
                {getFieldDecorator('pd_vf', {
                  rules: [{ required: true, message: '请输入进给速度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input style={{ width: '50%' }} name='pd_vf' placeholder={editInfo.pd_vf} onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='切削深度'
                style={{ margin: '10px 0' }}
              >
                {getFieldDecorator('pd_ap', {
                  rules: [{ required: true, message: '请输入切削深度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input style={{ width: '50%' }} name='pd_ap' placeholder={editInfo.pd_ap} onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='切削宽度'
                style={{ margin: '10px 0' }}
              >
                {getFieldDecorator('pd_ae', {
                  rules: [{ required: true, message: '请输入切削宽度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input style={{ width: '50%' }} name='pd_ae' placeholder={editInfo.pd_ae} onChange={this.handleChange} /> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(EditDesign)
