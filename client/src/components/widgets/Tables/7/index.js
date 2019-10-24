import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Action name',
    dataIndex: 'actionName',
    key: 'actionName',
    className: 'text-gray-6',
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
    className: 'text-gray-6',
    render: text => <span className="font-weight-bold">{text}</span>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    className: 'text-gray-6',
  },
  {
    dataIndex: 'users',
    key: 'users',
    render: users => {
      return (
        <div className={`air__utils__avatarGroup ${users.length ? '' : 'd-none'}`}>
          {users.map(user => (
            <div key={Math.random()} className="air__utils__avatar air__utils__avatar--rounded">
              <img src={user} alt="User Avatar" />
            </div>
          ))}
          <button type="button" className="air__utils__avatarGroupAdd">
            <i className="fe fe-plus" />
          </button>
        </div>
      )
    },
  },
  {
    dataIndex: 'action',
    key: 'action',
    className: 'text-right',
    render: () => {
      return (
        <div className="text-nowrap">
          <button type="button" className="btn btn-outline-success mr-2 mb-2">
            Accept
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

class Table7 extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__textDivider mb-2">
          <h4 className="air__utils__textDivider__content font-size-24 font-weight-bold">
            Active Users
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

export default Table7
