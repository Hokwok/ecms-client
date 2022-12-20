import React, { Component } from 'react'
import { Modal, DatePicker, Form, Input, Select, message } from 'antd'
import { experimentDataManageUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'

const model = new Model()
const { Option } = Select
class AddProcessData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      process_machine_id: '',
      process_method: '',
      process_tool: '',
      exp_date: '',
      note: '无'
    }
  }

  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
    const params = {
      eid: this.state.process_machine_id,
      process_method: this.state.process_method,
      process_tool: this.state.process_tool,
      exp_date: this.state.exp_date,
      exp_note: this.state.note
    }
    this.setState({
      confirmLoading: true
    })
    // console.log(params)
    this.createNewProcessData(params)
  }

  createNewProcessData(params) {
    const me = this
    model.fetch(
      params,
      experimentDataManageUrl,
      'post',
      function(res) {
        // me.props.changeCurrentPage(1)
        me.props.cancel(false)
        me.setState({
          confirmLoading: false
        })
        me.props.afterCreateOrEdit()
        message.success('添加实验数据成功')
      },
      function(error) {
        console.log(error)
        message.warning('添加实验数据失败，请重试')
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
  // 请选择加工机床
  selectMachineChange = (value) => {
    var reg = new RegExp('-', 'g') // 去掉所有的'-'
    this.setState({
      process_machine_id: value.replace(reg, '')
    })
  }
  // 请选择加工方式
  selectMethodChange = (value) => {
    this.setState({
      process_method: value
    })
  }
  // 往state中存实验日期时间
  handleDataChange = (date, dateString) => {
    this.setState({
      exp_date: dateString
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
            title='添加实验数据'
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
                  <Select
                    style={{ width: '250px' }}
                    onSelect={ (string) => this.selectMachineChange(string) }
                  >
                      {this.props.machineList.map((item, index) => {
                      return <Option key={ index } value={ item.eid }>{ `${item.equipment_type}:\xa0\xa0\xa0${item.equipment_code}-${item.equipment_name}` }</Option>
                    })}
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label='加工方式'
                colon
              >
                {getFieldDecorator('process_method', {
                rules: [{ required: true, message: '请选择加工方式' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                <Select onChange={this.selectMethodChange}>
                  <Option value='0'>车削</Option>
                  <Option value='1'>铣削</Option>
                  <Option value='2'>钻削</Option>
                  <Option value='3'>磨削</Option>
                </Select>
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
                {getFieldDecorator('exp_date', {
                  rules: [{ type: 'object', required: true, message: '请选择实验时间!' }]
                })(
                  <DatePicker onChange={this.handleDataChange} />
                )}
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
