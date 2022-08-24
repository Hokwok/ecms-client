import React, { Component } from 'react'
import { Table, Icon, Popconfirm, Tooltip } from 'antd'

class DesignTable extends Component {
  render() {
    const { isLoading, data } = this.props
    const columns = [
      {
        title: '水平',
        dataIndex: 'note',
        align: 'center',
        width: '10%'
      },
      {
        title: '主轴转速',
        dataIndex: 'pd_n',
        align: 'center',
        width: '20%'
      },
      {
        title: '进给速度',
        dataIndex: 'pd_vf',
        align: 'center',
        width: '20%'
      },
      {
        title: '切削深度',
        dataIndex: 'pd_ap',
        align: 'center',
        width: '20%'
      },
      {
        title: '切削宽度',
        dataIndex: 'pd_ae',
        align: 'center',
        width: '20%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: '10%',
        render: (text, record, index) => {
          // <icon 图标
          return (
          <div>
            <Tooltip title='编辑信息'>
              <Icon type='edit' className = 'edit' theme = 'twoTone' style={{ fontSize: '20px', marginRight: '20px' }}
                onClick={() => this.props.editDesignInfo(record)}
              />
            </Tooltip>
            <Popconfirm
              title='确定删除该条记录?'
              onConfirm={() => this.props.deleteDesignInfo(record.key)}
              okText='是'
              cancelText='否'
            >
              <Tooltip title='删除信息'>
                <Icon type='delete' theme='filled' style={{ fontSize: '20px', color: 'red' }}/>
              </Tooltip>
            </Popconfirm>
          </div>
          )
        }
      }
    ]

    return (
      <div
        style={{
          width: '100%',
          position: 'relative',
          marginBottom: '30px'
        }}
      >
        <Table
          style={{
            overflow: 'auto',
            width: '80%',
            wordBreak: 'keep-all',
            whiteSpace: 'nowrap'
          }}
          classname='design-table'
          dataSource={data}
          columns = {columns}
          bordered
          size='middle'
          loading={isLoading}
          pagination = { false }
        />
      </div>
    )
  }
}

export default DesignTable
