import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Action name',
    dataIndex: 'actionName',
    key: 'actionName',
    className: 'bg-transparent text-gray-6',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    className: 'text-right bg-transparent',
    render: text => {
      return (
        <div className="progress">
          <div
            className={`progress-bar ${text.color}`}
            style={{ width: `${text.value}%` }}
            role="progressbar"
          />
        </div>
      )
    },
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    className: 'text-right bg-transparent text-gray-6',
    render: text => <span className="font-weight-bold">{text}</span>,
  },
]

class Table1 extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__scrollTable">
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: '100%' }} />
        </div>
      </div>
    )
  }
}

export default Table1
