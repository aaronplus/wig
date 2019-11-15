import React from 'react'
import{
  Form,
  Input,
  Modal,
  Radio
} from 'antd'


const CollectionCreateForm = Form.create({ name: 'edit_phone_number' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, data } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };



      return (
        <Modal
          visible={visible}
          title="Edit Phone Number"
          okText="Update"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="keyword">
              {getFieldDecorator('keyword', {
                rules: [{ transform: (value) => value.trim() },{ required: true, message: 'Please enter keyword input' }],
                initialValue:data.keyword
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Priority">
              {getFieldDecorator('priority',{
                initialValue:data.priority
              })(<Input type="number" />)}
            </Form.Item>
            <Form.Item label="Type">
              {getFieldDecorator('type',{
                initialValue:data.type?1:0
              })(
                <Radio.Group>
                  <Radio value={0}>Fail</Radio>
                  <Radio value={1}>Pass</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="Status">
              {getFieldDecorator('status',{
                initialValue:data.status?1:0
              })(
                <Radio.Group>
                  <Radio value={0}>Inactive</Radio>
                  <Radio value={1}>Active</Radio>
                </Radio.Group>,
              )}
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  },
);

class EditPhoneNumber extends React.Component {
  constructor(props){
    super(props);
    const {visibleEdit} = this.props;
    this.state ={
      visible: visibleEdit
    }
  }

  static getDerivedStateFromProps(props, state){
    const {visibleEdit} = props;
    state.visible = visibleEdit;
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    const {handleCancel} = this.props;
    handleCancel();
    this.setState({ visible: false });
  };

  handleUpdate = () => {
    const { form } = this.formRef.props;
    const {handleUpdate} = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      handleUpdate(values);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {visible} = this.state;
    const {editData} = this.props;
    console.log(editData,"editData","edit.js");
    console.log(this.state);
    return (
      <div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleUpdate}
          data={editData}
        />
      </div>
    );
  }
}

export default EditPhoneNumber
