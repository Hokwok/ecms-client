import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { machineManageUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'

const model = new Model()
const { Option } = Select
class AddEquipment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      equipment_code: '',
      equipment_name: '',
      equipment_type: '',
      power_supply: '',
      max_rotate: '',
      max_speed: '',
      max_load: '',
      equipment_status: '',
      equipment_pic: '/static/media/machine.7ce6aff5.png'
    }
  }

  // 添加新设备
  createNewEquip(params) {
    // console.log(params)
    const me = this
    model.fetch(
      params,
      machineManageUrl,
      'post',
      function() {
        me.props.cancel(false)
        me.setState({
            confirmLoading: false
        })
        me.props.afterCreateOrEdit()
        message.success('创建成功')
      },
      function(error) {
        console.log(error)
        message.warning('创建失败，请重试')
        setTimeout(() => {
            me.setState({
              confirmLoading: false
            })
          }, 2000)
      },
      this.props.whetherTest
    )
  }
  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
    const params = {
      equipment_code: this.state.equipment_code,
      equipment_name: this.state.equipment_name,
      equipment_type: this.state.equipment_type,
      power_supply: this.state.power_supply,
      max_rotate: this.state.max_rotate,
      max_speed: this.state.max_speed,
      max_load: this.state.max_load,
      equipment_status: this.state.equipment_status,
      equipment_pic: this.state.equipment_pic
    }
    this.setState({
      confirmLoading: true
    })
    this.createNewEquip(params)
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
  // 请选择机床类型
  selectTypeChange = (value) => {
    this.setState({
      equipment_type: value
    })
    // console.log(value)
  }
  // 选择设备状态
  selectStatusChange = (value) => {
    this.setState({
      equipment_status: value
    })
    // console.log(value)
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
          title='添加新机床'
          visible={this.props.addEquipVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
          onOk={this.handleOk} // 点击确定回调
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
          destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='addEquipmentForm' onSubmit={this.onSubmit}>
              <Form.Item
                  label='设备编号'
                  colon
              >
                  {getFieldDecorator('equipment_name', {
                  rules: [{ required: true, message: '请输入设备编号' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                  <Input name='equipment_name' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                  label='设备名称'
                  colon
              >
                  {getFieldDecorator('equipment_code', {
                  rules: [{ required: true, message: '请输入设备名称' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                  <Input name='equipment_code' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                label='机床类型'
                colon
              >
                {getFieldDecorator('equipment_type', {
                  rules: [{ required: true, message: '请选择机床类型' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Select onChange={this.selectTypeChange}>
                    <Option value='0'>立式加工中心</Option>
                    <Option value='1'>数控铣床</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label='电源电压'
                colon
              >
                {getFieldDecorator('power_supply', {
                  rules: [{ required: true, message: '请输入电源电压' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='power_supply' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='最大转速'
                colon
              >
                {getFieldDecorator('max_rotate', {
                  rules: [{ required: true, message: '请输入最大转速' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='max_rotate' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='最大进给速度'
                colon
              >
                {getFieldDecorator('max_speed', {
                  rules: [{ required: true, message: '请输入最大进给速度' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='max_speed' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>

              <Form.Item
                label='允许最大载荷'
                colon
              >
                {getFieldDecorator('max_load', {
                  rules: [{ required: true, message: '请输入允许最大载荷!' }]
                })(
                  <Input name='max_load' onChange={this.handleChange} />
                )}
              </Form.Item>

              <Form.Item
                label='设备状态'
                colon
              >
                {getFieldDecorator('equipment_status', {
                  rules: [{ required: true, message: '请选择设备状态!' }]
                })(
                  <Select onChange={this.selectStatusChange}>
                    <Option value='0'>停运</Option>
                    <Option value='1'>在线</Option>
                    <Option value='2'>报修</Option>
                  </Select>
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(AddEquipment)
