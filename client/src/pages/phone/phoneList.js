import React from 'react'
import { Table, Divider } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Voice Forward Number',
    key: 'voice_forward_number',
    dataIndex: 'voice_forward_number',
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit{record._id}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
]

class PhoneList extends React.Component {
  

  render() {
    const {data} = this.props;
    return (
      <div className="mb-4 air__utils__scrollTable">
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default PhoneList
