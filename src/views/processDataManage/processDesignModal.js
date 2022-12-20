import React, { Component } from 'react'
import { Modal, Form } from 'antd'

import ProcessDesignIndex from './processDesign'

class ProcessDesignModal extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    // 取消按钮事件
    handleCancel = () => {
      this.props.cancel(false)
    }
    render() {
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
              title='加工设计详情'
              visible={this.props.addProcessDesignVisible} // 对话框是否可见  这个地方通过this.props.Visible 接收到父组件传过来的Visible
              onCancel={this.handleCancel} // 点击遮罩层或右上角叉或取消按钮的回调
              destroyOnClose={true} // 关闭时销毁 Modal 里的子元素  默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 destroyOnClose
              width='50%'
              bodyStyle={{ height: '20rem' }}
              footer={null}
            >
              <div>      {/* formItemLayout标签布局 */}                                 
                <Form {...formItemLayout} ref='designForm'>
                  <ProcessDesignIndex
                    record={this.props.record}
                  />
                </Form>
              </div>
            </Modal>
        </div>
        )
    }
}

export default Form.create()(ProcessDesignModal)
