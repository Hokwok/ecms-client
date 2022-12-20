import React, { Component } from 'react'
import { Table, Pagination } from 'antd'

class ProcessDataTable extends Component {
    render() {
        const { data, columns, isLoading, currentPage, total, changeSize, changePage } = this.props
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
                width: '100%',
                wordBreak: 'keep-all',
                whiteSpace: 'nowrap',
                fontSize: '5px'
              }}
              dataSource={ data }
              columns={ columns }
              bordered
              pagination={false}
              size='middle'
              loading={ isLoading }
              rowKey={ (record, index) => index }
            />
             <div style={{ marginTop: 15, position: 'absolute', right: '0%' }}>
              <Pagination
                size='small'
                current={ currentPage }
                total={ total }
                showQuickJumper
                style={{ marginRight: 0 }}
                showSizeChanger
                pageSize={this.props.size}
                pageSizeOptions={['10', '20', '30', '40']}
                onChange={(page, pageSize) => changePage(page, pageSize)}
                onShowSizeChange={(current, size) => changeSize(current, size)}
              />
             </div>
          </div>
        )
    }
}
export default ProcessDataTable
