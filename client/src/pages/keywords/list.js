import React from 'react'
import { Table, Popconfirm } from 'antd'
import EditPhoneNumber from './edit'

const { Column } = Table;


class List extends React.Component {
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
          <Column title="Keyword" dataIndex="keyword" key="keyword" />
          <Column title="Priority" dataIndex="priority" key="priority" />
          <Column title="Type" dataIndex="type" key="type" render={(text) => (<span>{text?'Pass':'Fail'}</span>)} />
          <Column title="Status" dataIndex="status" key="status" render={(text) => (<span>{text?'Active':'InActive'}</span>)} />

          <Column
            title="Action"
            key="action"
            render={(record) => (
              <span>
                <a href="javascript: void(0);" className="btn btn-sm btn-light mr-2" onClick={() => this.handleEdit(record._id)}>
                  <i className="fe fe-edit mr-2" />
                  Edit
                </a>
                <Popconfirm
                  title="Are you sure delete this?"
                  onConfirm={() => this.handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="javascript: void(0);" className="btn btn-sm btn-light">
                    <small>
                      <i className="fe fe-trash mr-2" />
                    </small>
                    Remove
                  </a>
                </Popconfirm>
              </span>

            )}
          />
        </Table>
        {visibleEdit?<EditPhoneNumber visibleEdit={visibleEdit} editData={editData} handleUpdate={(dataObj) => this.handleUpdate(dataObj)} handleCancel={()=> this.handleCancel()} />:''}
      </div>
    )
  }
}

export default List
