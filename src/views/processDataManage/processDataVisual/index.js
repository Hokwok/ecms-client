import React, { Component } from 'react'
import { Modal, Form } from 'antd'
import BubbleChart from './bubbleChart'
import CurveChart from './curveChart'

class ProcessDataVisualModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          confirmLoading: false
        }
    }

    // 取消按钮事件
    handleCancel = () => {
        this.props.cancel(false)
    }
    render() {
        const { confirmLoading } = this.state
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
              title='实验数据分析'
              visible={this.props.showProcessDataVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
              destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
              width='90%'
              footer={null}
            >
              <Form {...formItemLayout}>
                <Form.Item
                  label=''
                  style={{ margin: '0px' }}
                >
                  <Form.Item
                    style={{ marginLeft: '5%', display: 'inline-flex', width: 'calc(40% - 4px)' }}
                  >
                    <BubbleChart/>
                  </Form.Item>
                  <Form.Item
                    label=''
                    style={{ marginLeft: '15%', paddingLeft: '5%', borderLeft: '1.5px solid #8B8989', display: 'inline-flex', width: 'calc(35% - 4px)' }}
                  >
                    <CurveChart/>
                  </Form.Item>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        )
    }
}

export default Form.create()(ProcessDataVisualModal)
