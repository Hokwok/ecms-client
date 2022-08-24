import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { Model } from '../../dataModule/testBone'
import { userRegisterUrl } from '../../dataModule/UrlList'

const model = new Model()
const { Option } = Select
class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmLoading: false,
      phoneValidate: '',
      passwordValidate: '',
      user_name: '',
      password: '',
      valid_password: '',
      user_phone: '',
      user_email: ''
    }
  }

  // fetch函数进行数据传输,fetch在reactjs中等同于 XMLHttpRequest
  registerNewUser(params) {
    const me = this
    model.fetch(
      params,
      userRegisterUrl,
      'post',
      function() {
        me.props.cancel()
        message.success('用户注册成功，请重新登陆！')
      },
      function() {
        console.log(params)
        message.warning('用户注册失败，请检查手机号是否已注册过，再重试')
        setTimeout(() => {
          me.setState({
            confirmLoading: false
          })
        }, 2000)
      },
      false
    )
  }
  // 添加后确定
  handleOk = () => {
    const { validateFields } = this.props.form
    validateFields() // 校验 格式等问题
    const { user_name, password, valid_password, user_phone, user_email } = this.state
    if (password !== valid_password) {
      message.warn('两次密码输入不一致！')
    } else if (user_phone.length !== 11) {
      message.warn('输入的手机号不正确')
    } else {
      const params = {
        user_name: user_name,
        password: password,
        user_phone: user_phone,
        user_email: user_email
      }
      this.setState({
        confirmLoading: true
      })
      // console.log(params)
      this.registerNewUser(params)
    }
  }
  // 取消按钮事件
  handleCancel = () => {
    this.props.cancel()
  }
  handleChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // 密码校验
  handleValidPassword = (e) => {
    const valid_password = e.target.value
    if (valid_password === this.state.password) {
      this.setState({
        passwordValidate: 'success'
      })
    } else {
      this.setState({
        passwordValidate: 'warning'
      })
    }
    this.setState({
      valid_password: e.target.value
    })
  }
  // 手机号校验
  handlePhoneChange = (e) => {
    const inputphone = e.target.value
    if (inputphone.length === 11) {
      this.setState({
        phoneValidate: 'success',
        user_phone: inputphone
      })
    } else {
      this.setState({
        phoneValidate: 'warning',
        user_phone: inputphone
      })
    }
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Option value='86'>+86</Option>
        <Option value='87'>+87</Option>
      </Select>
    )
    return (
      <div>
        <Modal
          title='注册新用户'
          visible={this.props.registerVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
          onOk={this.handleOk} // 点击确定回调
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
          destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='registerForm' onSubmit={this.onSubmit}>
              <Form.Item
                  label='用户名'
                  colon
              >
                  {getFieldDecorator('user_name', {
                  rules: [{ required: true, message: '请输入用户名' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                  <Input name='user_name' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                label='密码'
                colon
              >
                  {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入用户密码' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                <Input name='password' type='password' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                label='确认密码'
                colon
                hasFeedback
                validateStatus={ this.state.passwordValidate }
              >
                  {getFieldDecorator('valid_password', {
                  rules: [{ required: true, message: '请再次输入密码' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
              })(
                <Input name='valid_password' type='password' onChange={this.handleValidPassword}/> // onChange	输入框内容变化时的回调 value	输入框内容
              )}
              </Form.Item>

              <Form.Item
                label='手机号'
                colon
                hasFeedback
                validateStatus={ this.state.phoneValidate }
              >
                {getFieldDecorator('user_phone', {
                  rules: [{ required: true, message: '请输入联系手机号' }]
                })(<Input name='user_phone' addonBefore={prefixSelector} style={{ width: '100%' }} onChange={this.handlePhoneChange} />)}
              </Form.Item>

              <Form.Item
                label='邮箱'
                colon
              >
                {getFieldDecorator('user_email', {
                  rules: [{ required: true, message: '请输入邮箱' }] // getFieldDecorator()  自定义校验方法,设置此项为必填项
                })(
                  <Input name='user_email' onChange={this.handleChange}/> // onChange	输入框内容变化时的回调 value	输入框内容
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(RegisterForm)
