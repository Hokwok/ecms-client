import React, { Component } from 'react'
import { Modal, Form, Upload, Button, Icon, message } from 'antd'
import Axios from 'axios'
import { uploadExperimentDataUrl } from '../../dataModule/UrlList'
// import { Model } from '../../dataModule/testBone'

// const model = new Model()
class UploadDataModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [], // 实验数据文件
      confirmLoading: false
    }
  }
  // 添加后确定
  handleOk = () => {
    this.setState({
      confirmLoading: true
    })
    this.uploadData()
  }
  // 上传文件
  uploadData() {
    const me = this
    const { fileList } = me.state
    const formData = new FormData()
    formData.append('file_list', fileList[0])
    Axios.put(`${uploadExperimentDataUrl}${me.props.record.expid}/`, formData, {
      'Content-type': 'multipart/form-data'
    }).then(res => {
      me.setState({
        confirmLoading: false
      })
      me.props.afterCreateOrEdit()
      me.handleCancel()
      message.success('上传成功！')
    }).catch(res => {
      message.error('上传失败！请重试')
    })
  }
  // 取消按钮事件
  handleCancel = () => {
    this.props.cancel()
  }
  render() {
    const { confirmLoading, fileList } = this.state
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file)
          const newFileList = state.fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList
          }
        })
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }))
        return false
      },
      fileList
    }
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
          title='上传实验数据'
          visible={this.props.uploadDataVisible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          // destroyOnClose={true}
        >
          <div>      {/* formItemLayout标签布局 */}                                 
            <Form {...formItemLayout} ref='uploadDataForm' onSubmit={this.onSubmit}>
              <Form.Item
                label='上传实验数据'
                colon
              >
                <Upload {...props}>
                  <Button>
                    <Icon type='upload' />选择文件
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(UploadDataModal)
