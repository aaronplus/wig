import React from 'react'
import{
  Form,
  Input,
  Modal,
  Button
} from 'antd'

const { TextArea } = Input;

const CollectionCreateForm = Form.create({ name: 'add_phone_number' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
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
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter name input' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Message">
              {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please enter message input' }],
              })(<TextArea rows={4} />)}
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  },
);

class AddMessage  extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const {handleSave} = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      handleSave(values);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {visible} = this.state;
    const buttonStyle = {
      right: 0,
      marginBottom: '10px',
      display: 'flex',
    }
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={buttonStyle}>
          Add New
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default AddMessage
