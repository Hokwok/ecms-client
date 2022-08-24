import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

class EditProcessTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false
    }
  }
  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
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
          title='编辑加工数据'
          visible={this.props.editProcessVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
          onOk={this.handleOk} // 点击确定回调
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
          destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='addProcessForm' onSubmit={this.onSubmit}>

              <Form.Item
                label='主轴转速'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  <Input style={{ width: '100px', marginLeft: '2px' }} name='process_n' value={editInfo.process_n} disabled />
                </Form.Item>
                <Form.Item
                  label='进给速度'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  <Input style={{ width: '100px', marginLeft: '2px' }} name='process_vf' value={editInfo.process_vf} disabled />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='切削深度'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  <Input style={{ width: '100px', marginLeft: '2px' }} name='process_ap' value={editInfo.process_ap} disabled />
                </Form.Item>
                <Form.Item
                  label='切削宽度'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  <Input style={{ width: '100px', marginLeft: '2px' }} name='process_ae' value={editInfo.process_ae} disabled />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='切削总功率'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  {getFieldDecorator('data_p', {
                    rules: [{ required: true, message: '请输入切削总功率' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_p' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='SEC'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  {getFieldDecorator('data_sec', {
                    rules: [{ required: true, message: '请输入SEC值' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_sec' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Ra-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  {getFieldDecorator('data_ra_first', {
                    rules: [{ required: true, message: '请输入第一刀粗糙度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_ra_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Ra-2'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  {getFieldDecorator('data_ra_second', {
                    rules: [{ required: true, message: '请输入第二刀粗糙度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_ra_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Fx-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  {getFieldDecorator('data_fx_first', {
                    rules: [{ required: true, message: '请输入第一刀X方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fx_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Fx-2'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  {getFieldDecorator('data_fx_second', {
                    rules: [{ required: true, message: '请输入第二刀X方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fx_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Fy-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  {getFieldDecorator('data_fy_first', {
                    rules: [{ required: true, message: '请输入第一刀Y方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fy_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Fy-2'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  {getFieldDecorator('data_fy_second', {
                    rules: [{ required: true, message: '请输入第二刀Y方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fy_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Fz-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                >
                  {getFieldDecorator('data_fz_first', {
                    rules: [{ required: true, message: '请输入第一刀Z方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fz_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Fz-2'
                  style={{ display: 'inline-flex', width: 'calc(55% - 4px)' }}
                >
                  {getFieldDecorator('data_fz_second', {
                    rules: [{ required: true, message: '请输入第二刀Z方向力' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_fz_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Mx-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(42% - 4px)' }}
                >
                  {getFieldDecorator('data_mx_first', {
                    rules: [{ required: true, message: '请输入第一刀X方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_mx_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Mx-2'
                  style={{ display: 'inline-flex', width: 'calc(58% - 4px)' }}
                >
                  {getFieldDecorator('data_mx_second', {
                    rules: [{ required: true, message: '请输入第二刀X方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_mx_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='My-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(42% - 4px)' }}
                >
                  {getFieldDecorator('data_my_first', {
                    rules: [{ required: true, message: '请输入第一刀Y方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_my_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='My-2'
                  style={{ display: 'inline-flex', width: 'calc(58% - 4px)' }}
                >
                  {getFieldDecorator('data_my_second', {
                    rules: [{ required: true, message: '请输入第二刀Y方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_my_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='Mz-1'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(42% - 4px)' }}
                >
                  {getFieldDecorator('data_mz_first', {
                    rules: [{ required: true, message: '请输入第一刀Z方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_mz_first' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='Mz-2'
                  style={{ display: 'inline-flex', width: 'calc(58% - 4px)' }}
                >
                  {getFieldDecorator('data_mz_second', {
                    rules: [{ required: true, message: '请输入第二刀Z方向力矩' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_mz_second' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='SCE'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(42% - 4px)' }}
                >
                  {getFieldDecorator('data_sce', {
                    rules: [{ required: true, message: '请输入SCE值' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_sce' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='MRR'
                  style={{ display: 'inline-flex', width: 'calc(58% - 4px)' }}
                >
                  {getFieldDecorator('data_mrr', {
                    rules: [{ required: true, message: '请输入MRR值' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_mrr' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item
                label='能量效率'
                style={{ margin: '0px' }}
              >
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(42% - 4px)' }}
                >
                  {getFieldDecorator('data_efficiency', {
                    rules: [{ required: true, message: '请输入能效值' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_efficiency' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
                <Form.Item
                  label='加工时长'
                  style={{ display: 'inline-flex', width: 'calc(58% - 4px)' }}
                >
                  {getFieldDecorator('data_duration', {
                    rules: [{ required: true, message: '请输入加工时长' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                  })(
                    <Input style={{ width: '100px', marginLeft: '2px' }} name='data_duration' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                  )}
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(EditProcessTask)
