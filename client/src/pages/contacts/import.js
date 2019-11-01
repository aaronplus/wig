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
  Modal,
  message
} from 'antd'

const { Option } = Select;
const axios = require('axios').default;

// @Form.create()
const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
class ImportContacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaignType: 'new',
      fileHeaders: null,
      showModal: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeCampaign = this.handleOnChangeCampaign.bind(this);
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'contacts/GET_CAMPAIGN_LIST',
      payload: localStorage.getItem('jwtToken'),
    });
    dispatch({
      type: 'contacts/GET_SCHEMA_COLUMNS',
      payload: false,
    })
  }

  onUploadFile = (info)=> {
    const { status, response } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      console.log(response);
      if (response && response.length) {
        const headers = Object.keys(response[0]);
        this.setState({
          fileHeaders: headers,
          showModal: true
        });
        console.log(headers);
      }
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
  // onUploadFile = () =>{
  //   const { form } = this.props;
  //   form.validateFieldsAndScroll((err, values) => {
  //     console.log(values.import.file.response);
  //   });
  // }

  handleOnChangeCampaign = (e) =>{
    const {form} = this.props;
    this.setState({ campaignType: e.target.value });
    form.resetFields(['campaign']);
  }

  handleSubmit(ev) {
    axios.defaults.headers.common.Authorization = `${localStorage.getItem("jwtToken")}`;
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
         axios
          .post(`http://localhost:5000/api/contacts/upload`, data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              message.success("Uploaded Successfully");
              form.resetFields(['campaign']);
            }

          })
        // fetch('http://localhost:5000/api/contacts/upload', {
        //   method: 'POST',
        //   body: data,
        //   headers:{
        //     'Authorization': localStorage.getItem('jwtToken')
        //   }
        //
        // }).then((response) => {
        //   console.log(response);
        //   response.json().then(() => {
        //      message.success("Uploaded Successfully");
        //      form.resetFields(['campaign']);
        //   });
        // });
      }
    });
  }

  render() {
    console.log("Render Here");
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {campaignType, fileHeaders, showModal} = this.state;
    const excludeHeaders = [
      "userId","internal","campaign","_id","_v"
    ];
    console.log(fileHeaders);
    const { form, contacts:{campaignList, schema} } = this.props;
    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    return (
      <div>
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
            <Upload multiple={false} name="file" listType="csv" accept="csv" action="http://localhost:5000/api/contacts/uploadFile" onChange={this.onUploadFile}>
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
        <Modal
          title="Export Contacts"
          visible={showModal}
          onOk={this.handleOk}
          onCancel={()=> this.setState({showModal:false})}
        >
          <div className="col-md-4">
            {schema ?schema.map((item) => <li key={item}>{!excludeHeaders.includes(item)?item:''}</li>): ''}

          </div>
          <div className="col-md-4">
            {fileHeaders ?fileHeaders.map((item) => <li key={item}>{!excludeHeaders.includes(item)?item:''}</li>): ''}
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(ImportContacts)
