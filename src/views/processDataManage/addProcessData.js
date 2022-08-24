import React, { Component } from 'react'
import { Modal, DatePicker, Form, Input, Select, Icon, Upload, Button, message } from 'antd'

const { Option } = Select
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}
class AddProcessData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      process_machine: '',
      process_method: '',
      process_tool: '',
      expe_time: '',
      note: ''
    }
  }

  // fetch函数进行数据传输,fetch在reactjs中等同于 XMLHttpRequest
  createNewProcessData(params) {
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
      process_machine: this.state.process_machine,
      process_method: this.state.process_method,
      process_tool: this.state.process_tool,
      expe_time: this.state.expe_time,
      note: this.state.note
    }
    this.setState({
      confirmLoading: true
    })
    console.log(params)
    this.createNewProcessData(params)
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
  // 请选择加工机床
  selectMachineChange = (value) => {
    this.setState({
      process_machine: value
    })
    // console.log(value)
  }
  // 往state中存实验日期时间
  handleDataChange = (date, dateString) => {
    this.setState({
      expe_time: dateString
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
            title='添加加工数据'
            visible={this.props.addProcessDataVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
            onOk={this.handleOk} // 点击确定回调
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
            destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='addProcessDataForm' onSubmit={this.onSubmit}>
              <Form.Item
                label='加工机床'
                colon
              >
                {getFieldDecorator('process_machine', {
                  rules: [{ required: true, message: '请选择加工机床' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Select onChange={this.selectMachineChange}>
                    <Option value='VMC850E-001'>VMC850E-001</Option>
                    <Option value='VMC850E-002'>VMC850E-002</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                  label='加工方式'
                  colon
              >
                  {getFieldDecorator('process_method', {
                  rules: [{ required: true, message: '请输入加工方式' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                  <Input name='process_method' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                  label='加工刀具'
                  colon
              >
                {getFieldDecorator('process_tool', {
                  rules: [{ required: true, message: '请输入加工刀具' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='process_tool' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='实验时间'
                colon
              >
                {getFieldDecorator('expe_time', {
                  rules: [{ type: 'object', required: true, message: '请选择实验时间!' }]
                })(
                  <DatePicker onChange={this.handleDataChange} />
                )}
              </Form.Item>

              <Form.Item
                label='上传实验数据'
                colon
              >
                <Upload {...props}>
                  <Button>
                    <Icon type='upload' />点击上传
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label='备注'
                colon
              >
                {getFieldDecorator('note', {
                  rules: [{ required: false }],
                  initialValue: '无'
                })(
                  <Input name='note' onChange={this.handleChange} />
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(AddProcessData)
