import React from 'react'
import{
  Form,
  Input,
  Button
} from 'antd'


class AddPhoneNumber extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }

  handleSubmit = (e) => {
    const {form} = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }else {
        console.log(err);
      }
    });
    e.preventDefault();
  };

  render() {
    const { form:{getFieldDecorator} } = this.props;
    const {isLoading} = this.state;
    console.log(isLoading);
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
      <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
        {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input name' }] })(
              <Form.Item label="Name">
                <Input placeholder="Name" name="name" />
              </Form.Item>,
      )}
        {getFieldDecorator('phone_number', {
          rules: [{ required: true, message: 'Please input phone number' }],
        })(
          <Form.Item label="Phone Number">
            <Input placeholder="Phone Number" />
          </Form.Item>,
    )}
        {getFieldDecorator('type', {
        rules: [{ required: true, message: 'Please input type' }],
      })(
        <Form.Item label="Type">
          <Input placeholder="Type" />
        </Form.Item>,
  )}
        {getFieldDecorator('voice_forward_number', {
  rules: [{ required: true, message: 'Please input voice forward number' }],
})(
  <Form.Item label="Voice Forward Number">
    <Input placeholder="Voice Forward Number" />
  </Form.Item>,
)}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddPhoneNumber);
