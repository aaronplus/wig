import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    className: 'bg-transparent text-gray-6',
    render: text => {
      return (
        <div className="text-wrap width-300">
          <div className="text-dark mb-3">{text.title}</div>
          <div>{text.content}</div>
        </div>
      )
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    className: 'text-right bg-transparent',
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
    className: 'text-right bg-transparent  text-gray-6',
    render: text => <span className="font-weight-bold">{text}</span>,
  },
]

class Table2 extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__scrollTable">
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: '100%' }} />
        </div>
        <div className="mt-4 d-flex align-items-center flex-wrap">
          <button type="button" className="btn btn-primary mr-2 mb-2">
            Save
          </button>
          <a href="javascript: void(0);" className="btn btn-link mb-2">
            Cancel
          </a>
        </div>
      </div>
    )
  }
}

export default Table2
