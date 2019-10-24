import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'User Name',
    dataIndex: 'userName',
    key: 'userName',
    render: text => {
      return (
        <div>
          <div>{text.name}</div>
          <div className="text-gray-4">{text.position}</div>
        </div>
      )
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: text => {
      return (
        <a href="javascript: void(0);" className="text-blue">
          {text}
        </a>
      )
    },
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    className: 'text-right text-gray-6',
    render: text => <span className="font-weight-bold">{text}</span>,
  },
  {
    dataIndex: 'action',
    key: 'action',
    className: 'text-right',
    render: () => {
      return (
        <div className="text-nowrap">
          <button type="button" className="btn btn-outline-danger mr-2 mb-2">
            Decline
          </button>
        </div>
      )
    },
  },
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
}

class Table6 extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__textDivider mb-2">
          <h4 className="air__utils__textDivider__content font-size-24 font-weight-bold">
            Waiting actions
          </h4>
        </div>
        <div className="air__utils__scrollTable">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowSelection={rowSelection}
            scroll={{ x: '100%' }}
          />
        </div>
      </div>
    )
  }
}

export default Table6
