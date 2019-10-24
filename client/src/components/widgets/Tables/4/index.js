import React from 'react'
import { Table } from 'antd'
import data from './data.json'
import style from './style.module.scss'

const columns = [
  {
    title: 'Action name',
    dataIndex: 'actionName',
    key: 'actionName',
    className: 'bg-transparent text-gray-6',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    className: 'bg-transparent',
    render: text => {
      return (
        <a href="javascript: void(0);" className="text-blue">
          {text}
        </a>
      )
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    className: 'text-left text-gray-6 bg-transparent',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    className: 'text-right bg-transparent text-gray-6',
    render: text => <span className="font-weight-bold">{text}</span>,
  },
]

class Table4 extends React.Component {
  render() {
    return (
      <div>
        <div className={style.head}>
          <div className={`${style.headItem} mb-3 pr-3`}>
            <div className={`${style.headIcon} bg-gray-4 text-white mr-3`}>
              <i className="fe fe-menu font-size-18" />
            </div>
            <div>
              <div className="text-uppercase text-muted text-nowrap">Cross Earnings</div>
              <div className="font-weight-bold text-dark">+125,367.36</div>
            </div>
          </div>
          <div className={`${style.headItem} mb-3`}>
            <div className={`${style.headIcon} bg-gray-4 text-white mr-3`}>
              <i className="fe fe-cloud font-size-18" />
            </div>
            <div>
              <div className="text-uppercase text-muted text-nowrap">Tax witheld</div>
              <div className="font-weight-bold text-dark">-$12,350.00</div>
            </div>
          </div>
        </div>
        <div className="air__utils__scrollTable">
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: '100%' }} />
        </div>
      </div>
    )
  }
}

export default Table4
