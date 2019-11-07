import React from 'react'
import { Table, Divider, Popconfirm } from 'antd'
import Edit from './edit'

const { Column } = Table;


class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibleEdit: false,
      editData: null,
      editId: false
    }
  }

  handleDelete = (id) =>{
    const { onPressDelete } = this.props;
    onPressDelete(id);
  }

  handleUpdate = (data) =>{
    const {editId} = this.state;
    const { handleUpdateRecord } = this.props;
    handleUpdateRecord(data, editId);
    this.setState({
      visibleEdit: false,
      editData: null,
      editId: false
    })
  }

  handleCancel = () =>{
    this.setState({
      visibleEdit: false,
      editData: null,
      editId: false
    })
  }

  handleEdit = (id) => {
    const{data} = this.props;
    const findObj = data.find(item => item._id === id);
    console.log(findObj,"Edit");
    this.setState({
      visibleEdit: true,
      editData:findObj,
      editId: id
    })
  }

  render() {
    const {visibleEdit, editData} = this.state;
    const {data} = this.props;
    const dataArr = data ? data.map((el)=> {
      const o = Object.assign({}, el);
      o.key = el._id;
      return o;
    }):[];

    return (
      <div className="mb-4 air__utils__scrollTable">
        <Table dataSource={dataArr}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Message" dataIndex="message" key="message" />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <span>
                <a href="javascript:;" onClick={() => this.handleEdit(record._id)}>Edit</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure delete this?"
                  onConfirm={() => this.handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="javascript:;">Delete</a>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
        {visibleEdit?<Edit visibleEdit={visibleEdit} editData={editData} handleUpdate={(dataObj) => this.handleUpdate(dataObj)} handleCancel={()=> this.handleCancel()} />:''}
      </div>
    )
  }
}

export default MessageList
