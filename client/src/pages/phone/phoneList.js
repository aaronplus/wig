import React from 'react'
import { Table, Divider } from 'antd'
import EditPhoneNumber from './edit'

const { Column } = Table;


class PhoneList extends React.Component {
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
          <Column title="Phone Number" dataIndex="phone_number" key="phone_number" />
          <Column title="Type" dataIndex="type" key="type" />
          <Column title="Voice Forward Number" dataIndex="voice_forward_number" key="voice_forward_number" />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <span>
                <a href="javascript:;" onClick={() => this.handleEdit(record._id)}>Edit</a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={() => this.handleDelete(record._id)}>Delete</a>
              </span>
            )}
          />
        </Table>
        {visibleEdit?<EditPhoneNumber visibleEdit={visibleEdit} editData={editData} handleUpdate={(dataObj) => this.handleUpdate(dataObj)} handleCancel={()=> this.handleCancel()} />:''}
      </div>
    )
  }
}

export default PhoneList
