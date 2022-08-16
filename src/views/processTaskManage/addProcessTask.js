import React, { Component } from 'react'
import { Modal, DatePicker, Form, Input } from 'antd'

class AddProcessTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      process_code: '',
      process_n: '',
      process_vf: '',
      process_ap: '',
      process_ae: '',
      process_state: '0', // 默认 未开始 状态
      process_time: '',
      process_note: ''
    }
  }

  // fetch函数进行数据传输,fetch在reactjs中等同于 XMLHttpRequest
  createNewProcess(params) {
    // const me = this
    // model.fetch(
    //   params,
    //   ClientUrl,
    //   'post',
    //   function() {
    //     me.props.cancel(false)
    //     me.setState({
    //         confirmLoading: false
    //     })
    //     const item = me.props.getParams()
    //     me.props.getCurrentPage(item)
    //     message.success('创建成功')
    //   },
    //   function() {
    //     message.warning('发送数据失败，请重试')
    //     setTimeout(() => {
    //         me.setState({
    //           confirmLoading: false
    //         })
    //       }, 2000)
    //   },
    //   this.props.whetherTest
    // )
  }
  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
    const params = {
        process_code: this.state.process_code,
        process_n: this.state.process_n,
        process_vf: this.state.process_vf,
        process_ap: this.state.process_ap,
        process_ae: this.state.process_ae,
        process_state: this.state.process_state,
        process_time: this.state.process_time,
        process_note: this.state.process_note
    }
    this.setState({
      confirmLoading: true
    })
    // console.log(params)
    this.createNewProcess(params)
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
  // 往state中存加工日期时间
  handleDataChange = (date, dateString) => {
    this.setState({
      process_time: dateString
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { confirmLoading } = this.state
    const formItemLayout = {
      labelCol: {
        span: 5 // 左边留白大小
      },
      wrapperCol: {
        span: 16 // 内容区大小（两者和不能!>24
      }
    }
    return (
      <div>
        <Modal
            title='新增加工任务'
            visible={this.props.addProcessVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
            onOk={this.handleOk} // 点击确定回调
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
            destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='addProcessForm' onSubmit={this.onSubmit}>
              <Form.Item
                  label='加工编号'
                  colon
              >
                  {getFieldDecorator('process_code', {
                  rules: [{ required: true, message: '请输入加工编号' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                  <Input name='process_code' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                  label='主轴转速'
                  colon
              >
                {getFieldDecorator('process_n', {
                  rules: [{ required: true, message: '请输入主轴转速' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='process_n' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='进给速度'
                colon
              >
                {getFieldDecorator('process_vf', {
                  rules: [{ required: true, message: '请输入进给速度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='process_vf' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='加工深度'
                colon
              >
                {getFieldDecorator('process_ap', {
                  rules: [{ required: true, message: '请输入加工深度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='process_ap' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='加工宽度'
                colon
              >
                {getFieldDecorator('process_ae', {
                  rules: [{ required: true, message: '请输入加工宽度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='process_ae' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='加工时间'
                colon
              >
                {getFieldDecorator('process_time', {
                  rules: [{ type: 'object', required: true, message: '请选择加工时间!' }]
                })(
                  <DatePicker onChange={this.handleDataChange} />
                )}
              </Form.Item>

              <Form.Item
                label='备注'
                colon
              >
                {getFieldDecorator('process_note', {
                  rules: [{ required: false }],
                  initialValue: '无'
                })(
                  <Input name='process_note' onChange={this.handleChange} />
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(AddProcessTask)
