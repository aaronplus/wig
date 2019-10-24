import React from 'react'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="javascript:;">Delete</a>,
  },
]

class TablesAntdExpandableRow extends React.Component {
  render() {
    return (
      <div className="mb-4 air__utils__scrollTable">
        <Table
          columns={columns}
          dataSource={data}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          scroll={{ x: '100%' }}
        />
      </div>
    )
  }
}

export default TablesAntdExpandableRow
