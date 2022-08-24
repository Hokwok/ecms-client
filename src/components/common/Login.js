import React, { Component } from 'react'
import { setCookie } from '../../helpers/cookies'
import '../../style/login.less'
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd'
import RegisterForm from './Register'
import { Model } from '../../dataModule/testBone'
import { userLoginUrl } from '../../dataModule/UrlList'

const model = new Model()
const FormItem = Form.Item
// const users = [{
//     username: 'admin',
//     password: 'admin'
// }, {
//   username: 'reviewer1',
//   password: 'reviewer1'
// }, {
//   username: 'reviewer2',
//   password: 'reviewer2'
// }, {
//   username: 'reviewer3',
//   password: 'reviewer3'
// }, {
//   username: 'rectifier1',
//   password: 'rectifier1'
// }, {
//   username: 'rectifier2',
//   password: 'rectifier2'
// }, {
//   username: 'admin',
//   password: '123'
// }]

// function PatchUser(values) {
//     const { username, password } = values
//     return users.find(user => user.username === username && user.password === password)
// }

class NormalLoginForm extends Component {
  state = {
    isLoding: false,
    registerVisible: false
  }
  handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        // if (!err) {
        //   // console.log('Received values of operation: ', values);
        //   if (PatchUser(values)) {
        //       this.setState({
        //           isLoding: true
        //       })
        //       values['_id'] = values.username

        //       // console.log(values);
        //       setCookie('mspa_user', JSON.stringify(values))

        //       message.success('登录成功!')
        //       const that = this
        //       setTimeout(function() {
        //           that.props.history.push({ pathname: '/app/machine_manage', state: values })
        //       }, 2000)
        //   } else {
        //       message.error('登录失败!')
        //   }
        // }
        if (!err) {
          const me = this
          model.fetch(
            { user_name: values.username, password: values.password },
            userLoginUrl,
            'post',
            function(response) {
              me.setState({
                isLoding: true
              })
              values['_id'] = values.username
              console.log('response', response.data)
              message.success('用户登录成功！')
              setCookie('mspa_user', JSON.stringify(values))
              setTimeout(function() {
                me.props.history.push({ pathname: '/app/machine_manage', state: values })
              }, 2000)
              console.log(values)
            },
            function(error) {
              console.log(error)
              message.warning('登录失败，请确认账号和密码正确！')
            },
            false
          )
        }
      })
  }
  toRegisteForm = () => {
    this.setState({
      registerVisible: true
    })
  }
  // 关闭注册弹窗
  closeModal = () => {
    this.setState({
      registerVisible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      this.state.isLoding ? <Spin size='large' className='loading' /> : <div className='login'>
        <div className='login-form'>
          <div className='login-logo'>
              <div className='login-name' style={{ marginLeft: '30px' }}>机床在线监测及可视化分析系统</div>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
              <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' }]
                })(
                    <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='用户名 (admin)' />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }]
                })(
                    <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码 (admin)' />
                )}
              </FormItem>
              <FormItem style={{ marginBottom: '0' }}>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false
                })(
                    <Checkbox>记住我</Checkbox>
                )}
                <a className='login-form-forgot' href='' style={{ float: 'right' }}>忘记密码?</a>
                <Button type='primary' htmlType='submit' className='login-form-button' style={{ width: '100%' }}>
                    登录
                </Button>
              </FormItem>
          </Form>
          <div style={{ fontSize: '15px', marginTop: '5px', textAlign: 'center' }}>没有账号，点击<a onClick={this.toRegisteForm}>注册</a></div>
          {/* <a className='githubUrl' href={`${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}> </a> */}
        </div>
        <RegisterForm
          registerVisible = { this.state.registerVisible }
          cancel={this.closeModal}
        />
      </div>
    )
  }
}

const Login = Form.create()(NormalLoginForm)
export default Login
