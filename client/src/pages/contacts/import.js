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
      showModal: false,
      headers: {},
      mapSchema:{
        firstName:{
          key: 'First Name',
          value:'OWNER 1 FIRST NAME'
        },
        lastName:{
          key: 'Last Name',
          value:'OWNER 1 LAST NAME'
        },
        propertyAddress:{
          key: 'Property Address',
          value:'SITUS FULL ADDRESS'
        },
        propertyCity:{
          key: 'Property City',
          value:'SITUS CITY'
        },
        propertyState:{
          key: 'Property State',
          value:'SITUS STATE'
        },
        propertyZip:{
          key: 'Property Zip',
          value:'SITUS ZIP CODE'
        },
        mailingAddress:{
          key: 'Mail Address',
          value:'MAILING FULL ADDRESS'
        },
        mailingCity:{
          key: 'Mail City',
          value:'MAIL CITY'
        },
        mailingState:{
          key: 'Mail State',
          value:'MAIL STATE'
        },
        mailingZip:{
          key: 'Mail Zip',
          value:'MAIL ZIP/ZIP+4'
        },
        apn:{
          key: 'APN',
          value:'APN - FORMATTED'
        },
        market:{
          key: 'Market Value',
          value:'MARKET VALUE'
        },
        equityValue:{
          key: 'Equity Value',
          value:'EQUITY VALUE'
        },
        equityPercentage:{
          key: 'Equity Percentage',
          value:'EQUITY PERCENTAGE'
        },
        recordingDateOT:{
          key: 'Recording Date OT',
          value:'OT-RECORDING DATE'
        },
        deedTypeOT:{
          key: 'Deed Type OT',
          value:'OT-DEED TYPE'
        },
        recordingDateLMS:{
          key: 'Recording Date LMS',
          value:'LMS-RECORDING DATE'
        },
        salePriceLMS:{
          key: 'Sale Price LMS',
          value:'LMS-SALE PRICE'
        }
      }
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
        //  showModal: true
        });
        console.log(headers);
      }
      // message.success(`${info.file.name} file uploaded successfully.`)
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

  handleOnChangeHeader = (mapTo, header) =>{
    const {headers} = this.state;
    headers[mapTo] = header;
  //  this.setState({headers});
  }

  handleOk = () =>{
    const {headers} = this.state;
    console.log(headers);
  }

  // handleSubmitMapAndImport = (e) => {
  //   e.preventDefault();
  //   const {form} = this.props;
  //   form.validateFields((err, values) => {
  //     if (!err) {
  //       const headers = Object.assign({}, values);
  //
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }

  changeImportKeyValue = (key, val) => {
    const {mapSchema} =  this.state;

    const newState = Object.assign({},mapSchema);
    newState[key] = val;
    this.setState({
      mapSchema: newState
    })
  }

  handleSubmit(ev) {
    axios.defaults.headers.common.Authorization = `${localStorage.getItem("jwtToken")}`;
    const { form, skipTraced, handleUploadFile } = this.props;
    console.log(this.props);
    const { campaignType } = this.state;
    ev.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (!skipTraced && !values.campaign ) {
          message.warning("campaign is required");
        }else {
          const headers = Object.assign({}, values);
          delete(headers.import);
          delete(headers.campaign);
          const data = new FormData();
          data.append('csvData', JSON.stringify(values.import.file.response));
          if (!skipTraced) {
            data.append('campaign', values.campaign);
            data.append('campaignType', campaignType);
          }


          data.append('headers', JSON.stringify(headers));
          if (skipTraced) {
            data.append('skipTraced', skipTraced);
          }

           axios
            .post(`http://localhost:5000/api/contacts/upload`, data)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                message.success("Uploaded Successfully");
                form.resetFields(['campaign']);

                handleUploadFile();
                this.setState({
                  showModal: false
                })
              }

            }).catch((error) =>{
              if (error.response.data.code && error.response.data.code === 11000) {
                  message.error("Duplicate entry detected");
              }else if (error.response.data.message) {
                message.error(error.response.data.message);
              }else {
                const errors=  Object.keys(error.response.data.errors).map((er)=>{
                    return error.response.data.errors[er].message;
                  });
                  console.log(errors);
                  message.error(errors[0]);
              }


            });
        }

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
    // schema props will be used
    const { form, contacts:{campaignList}, skipTraced } = this.props;
    console.log(skipTraced);
    // console.log(schema);
    const {mapSchema} = this.state;
    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    const listHeaders = fileHeaders ?fileHeaders.map((item) => <Option key={item} value={item}>{item}</Option>): '';


    const modalData = Object.keys(mapSchema).map((item) =>{
      const headerKey = mapSchema[item] ? mapSchema[item].key : '';
      const selectedHeader = mapSchema[item] ? mapSchema[item].value: '';
        return(
          <div className="row">
            <Form.Item className="col-md-4">
              <Input value={headerKey} disabled name="mapTo" />
            </Form.Item>
            <Form.Item className="col-md-6">
              {form.getFieldDecorator(`${item}`, {
                initialValue: (fileHeaders && fileHeaders.includes(selectedHeader))?selectedHeader:'Select Header' ,
              rules: [{ required: false}]
            })(
              <Select>
                <Option value="">Do Not Import</Option>
                {listHeaders}
              </Select>
              )}
            </Form.Item>
          </div>
        )

        // return null;
    //  }
  });
  if (skipTraced) {
    return(
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={!fileHeaders}>
           Import
            </Button>
            <Button type="primary" htmlType="button" className="ant-btn mr-3" onClick={()=> this.setState({showModal:true})} disabled={!fileHeaders}>
           Import And Map
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="Map Contacts"
          visible={showModal}
          // onOk={()=> this.setState({showModal:false})}
          // onCancel={()=> this.setState({showModal:false})}
          footer={[
            <Button onClick={() => this.setState({ showModal: false })} className="mr-3">
            Cancel
            </Button>
        ]}
        >
          <div className="col-md-12">
            <Form onSubmit={this.handleSubmit}>
              {modalData}

              <Form.Item>
                <Button type="primary" htmlType="submit" className="ant-btn mr-3">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={!fileHeaders}>
           Import
            </Button>
            <Button type="primary" htmlType="button" className="ant-btn mr-3" onClick={()=> this.setState({showModal:true})} disabled={!fileHeaders}>
           Import And Map
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title="Map Contacts"
          visible={showModal}
          // onOk={()=> this.setState({showModal:false})}
          // onCancel={()=> this.setState({showModal:false})}
          footer={[
            <Button onClick={() => this.setState({ showModal: false })} className="mr-3">
            Cancel
            </Button>
        ]}
        >
          <div className="col-md-12">
            <Form onSubmit={this.handleSubmit}>
              {modalData}

              <Form.Item>
                <Button type="primary" htmlType="submit" className="ant-btn mr-3">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(ImportContacts)
