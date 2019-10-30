import React from 'react'
import { connect } from 'react-redux'
// import { Helmet } from 'react-helmet'
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  Select,
  Radio,
  message
} from 'antd'

const { Option } = Select;

// @Form.create()
const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
class ImportContacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaignType: 'new'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeCampaign = this.handleOnChangeCampaign.bind(this);
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'contacts/GET_CAMPAIGN_LIST',
      payload: localStorage.getItem('setAuthToken'),
    })
  }

  handleOnChangeCampaign = (e) =>{
    const {form} = this.props;
    this.setState({ campaignType: e.target.value });
    form.resetFields(['campaign']);
  }

  handleSubmit(ev) {
    const { form } = this.props;
    const { campaignType } = this.state;
    ev.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const data = new FormData();
        data.append('csvData', JSON.stringify(values.import.file.response));
        data.append('campaign', values.campaign);
        data.append('campaignType', campaignType);
        fetch('http://localhost:5000/api/contacts/upload', {
          method: 'POST',
          body: data,
          
        }).then((response) => {
          response.json().then(() => {
             message.success("Uploaded Successfully");
             form.resetFields(['campaign']);
          });
        });
      }
    });
  }

  render() {
    console.log("Render Here");
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {campaignType} = this.state;
    const { form, contacts:{campaignList} } = this.props;
    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item label="Campaign">
          <Radio.Group onChange={this.handleOnChangeCampaign} defaultValue={campaignType}>
            <Radio value="new">New Campaign</Radio>
            <Radio value="existing">Existing Campaign</Radio>
          </Radio.Group>
        </Form.Item>
        {(campaignType === 'new')?
          <Form.Item label="Campaign Name">
            {
              form.getFieldDecorator('campaign',{ required: true, message: 'Please enter a campaign name'})
              (<Input name="campaign" />)
            }

          </Form.Item>:
          <Form.Item label="Select Campaign">
            {
            form.getFieldDecorator('campaign',{ required: true, message: 'Please select a campaign'})
            (
              <Select placeholder="Please select a campaign" name="campaign">
                {listData}
              </Select>
          )
          }

          </Form.Item>
      }


        <Form.Item label="Import">
          {
          form.getFieldDecorator('import',{ required: true, message: 'Please upload a csv file'})
          (
            <Upload name="file" listType="csv" accept="csv" action="http://localhost:5000/api/contacts/uploadFile">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
        )
        }

        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
           Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(ImportContacts)
