import React from 'react'
import { connect } from 'react-redux'
// import { Helmet } from 'react-helmet'
import { Form, Input, Upload, Button, Icon, Select, Radio, Modal, Spin,  message } from 'antd'
import { SERVER_ADDRESS } from '../../config/constants'

const { Option } = Select
const axios = require('axios').default

// @Form.create()
const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
class ImportContacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      campaignType: 'new',
      fileHeaders: null,
      showModal: false,
      showImportButton: false,
      headers: {},
      fileObj:{},
      spinner: false,
      mapSchema: {
        firstName: {
          key: 'First Name',
          value:'OWNER 1 FIRST NAME',
          skip:'INPUT_FIRST_NAME',
        },
        lastName: {
          key: 'Last Name',
          value:'OWNER 1 LAST NAME',
          skip:'INPUT_LAST_NAME',
        },
        propertyAddress: {
          key: 'Property Address',
          value:'SITUS STREET ADDRESS',
          skip:'INPUT_ADDRESS_LINE1',
        },
        propertyCity: {
          key: 'Property City',
          value:'SITUS CITY',
          skip:'INPUT_ADDRESS_CITY',
        },
        propertyState: {
          key: 'Property State',
          value:'SITUS STATE',
          skip:'INPUT_ADDRESS_STATE',
        },
        propertyZip: {
          key: 'Property Zip',
          value:'SITUS ZIP CODE',
          skip:'INPUT_ADDRESS_ZIP',
        },
        mailingAddress: {
          key: 'Mail Address',
          value:'MAILING FULL ADDRESS',
          skip:'INPUT_DEDUP_ADDRESS1_LINE',
        },
        mailingCity: {
          key: 'Mail City',
          value:'MAIL CITY',
          skip:'INPUT_DEDUP_ADDRESS1_CITY',
        },
        mailingState: {
          key: 'Mail State',
          value:'MAIL STATE',
          skip:'INPUT_DEDUP_ADDRESS1_STATE',
        },
        mailingZip: {
          key: 'Mail Zip',
          value:'MAIL ZIP/ZIP+4',
          skip:'INPUT_DEDUP_ADDRESS1_ZIP',
        },
        apn: {
          key: 'APN',
          value:'APN - FORMATTED',
          skip:'',
        },
        market: {
          key: 'Market Value',
          value:'MARKET VALUE',
          skip:'',
        },
        equityValue: {
          key: 'Equity Value',
          value:'EQUITY VALUE',
          skip:'',
        },
        equityPercentage: {
          key: 'Equity Percentage',
          value:'EQUITY PERCENTAGE',
          skip:'',
        },
        recordingDateOT: {
          key: 'Recording Date OT',
          value:'OT-RECORDING DATE',
          skip:'',
        },
        deedTypeOT: {
          key: 'Deed Type OT',
          value:'OT-DEED TYPE',
          skip:'',
        },
        recordingDateLMS: {
          key: 'Recording Date LMS',
          value:'LMS-RECORDING DATE',
          skip:'',
        },
        salePriceLMS: {
          key: 'Sale Price LMS',
          value:'LMS-SALE PRICE',
          skip:''
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChangeCampaign = this.handleOnChangeCampaign.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'contacts/GET_CAMPAIGN_LIST',
      payload: localStorage.getItem('jwtToken'),
    })
    dispatch({
      type: 'contacts/GET_SCHEMA_COLUMNS',
      payload: false,
    })
  }

  onUploadFile = info => {
    const { status, response } = info.file
    const {skipTraced} = this.props;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      if (response && response.headers && response.headers.length) {
        const {headers, fileObj} = response;
        if (skipTraced) {
          if ((headers.includes('INPUT_LAST_NAME') || headers.includes('LAST NAME'))
              && (headers.includes('INPUT_ADDRESS_LINE1'))
              && (headers.includes('INPUT_ADDRESS_CITY'))
              && (headers.includes('INPUT_ADDRESS_STATE'))
              && (headers.includes('INPUT_ADDRESS_ZIP'))) {
                this.setState({
                  fileHeaders: headers,
                  showImportButton: true,
                  fileObj
                //  showModal: true
                });
          }else {
                this.setState({
                  fileHeaders: headers,
                  showImportButton: false,
                  fileObj
                });
          }
        }else if ((headers.includes('OWNER 1 LAST NAME') || headers.includes('LAST NAME'))
              && (headers.includes('SITUS STREET ADDRESS'))
              && (headers.includes('SITUS CITY'))
              && (headers.includes('SITUS STATE'))
              && (headers.includes('SITUS ZIP CODE'))) {
                this.setState({
                  fileHeaders: headers,
                  showImportButton: true,
                  fileObj
                //  showModal: true
                });
          }else {
                this.setState({
                  fileHeaders: headers,
                  showImportButton: false,
                  fileObj
                });
          }
        // Match Headers with static Headers
        console.log(headers);
      }else {
        message.error(`You have uploaded the empty file, Please upload a valid file.`);
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

  handleOnChangeCampaign = e => {
    const { form } = this.props
    this.setState({ campaignType: e.target.value })
    form.resetFields(['campaign'])
  }

  handleOnChangeHeader = (mapTo, header) => {
    const { headers } = this.state
    headers[mapTo] = header
    //  this.setState({headers});
  }

  handleOk = () => {
    const { headers } = this.state
    console.log(headers)
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
    const { mapSchema } = this.state

    const newState = Object.assign({}, mapSchema)
    newState[key] = val
    this.setState({
      mapSchema: newState,
    })
  }

  onChangeCampaignName = (e) =>{
    const campaign = e.target.value;
    axios.defaults.headers.common.Authorization = `${localStorage.getItem("jwtToken")}`;

    axios
     .post(`${SERVER_ADDRESS}/campaigns/verify`, {campaign})
     .then((res) => {
       console.log(res);
       if (res.status === 200) {
         console.log(res);
       }

     }).catch((err)=>{
       message.error(err.response.data.message);
       console.log(err.response.data.message);
     })
  }

  handleSubmit(ev) {
    axios.defaults.headers.common.Authorization = `${localStorage.getItem("jwtToken")}`;
    const { form, skipTraced, handleUploadFile } = this.props;
    console.log(this.props);
    const { campaignType, fileObj } = this.state;

    ev.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (!skipTraced && !values.campaign ) {
          message.warning("campaign is required");
        }else {
          const headers = Object.assign({}, values);
          const {lastName, propertyAddress, propertyCity,propertyState,propertyZip} = headers;
          if (!lastName || !propertyAddress || !propertyCity || !propertyState || !propertyZip) {
            if (!lastName) {
              message.error("Last Name is required");
            }else if (!propertyAddress) {
              message.error("Property Address is required");
            }else if (!propertyCity) {
              message.error("Property City is required");
            }else if (!propertyState) {
              message.error("Property State is required");
            }else if (!propertyZip) {
              message.error("Property Zip is required");
            }


            message.error("Please enter all the required fields");
            return;
          }
          delete(headers.import);
          delete(headers.campaign);
          const data = new FormData();
          // data.append('csvData', JSON.stringify(values.import.file.response));
          if (!skipTraced) {
            data.append('campaign', values.campaign);
            data.append('campaignType', campaignType);
          }
          data.append('headers', JSON.stringify(headers));
          data.append('fileObj', JSON.stringify(fileObj));
          if (skipTraced) {
            data.append('skipTraced', skipTraced);
          }
          this.setState({
            spinner: true
          })
           axios
            .post(`${SERVER_ADDRESS}/contacts/upload`, data)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                message.success("Uploaded Successfully");
                form.resetFields(['campaign']);

                handleUploadFile();
                this.setState({
                  showModal: false,
                  spinner: false
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

              this.setState({
                spinner: false
              })
            });
        }
      }
    })
  }

  render() {
    console.log('Render Here')
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {campaignType, fileHeaders, showModal, showImportButton} = this.state;

    // schema props will be used
    const {
      form,
      contacts: { campaignList },
      skipTraced,
    } = this.props
    console.log(skipTraced)
    // console.log(schema);
    const {mapSchema, spinner} = this.state;
    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    const listHeaders = fileHeaders ?fileHeaders.map((item) => <Option key={item} value={item}>{item}</Option>): '';


    const modalData = Object.keys(mapSchema).map((item) =>{
      const headerKey = mapSchema[item] ? mapSchema[item].key : '';
      let selectedHeader;
      if (!skipTraced) {
        selectedHeader = mapSchema[item] ? mapSchema[item].value: '';
      }else {
        selectedHeader = mapSchema[item] ? mapSchema[item].skip: '';
      }

        return(
          <div className="row">
            <Form.Item className="col-md-4">
              <Input value={headerKey} disabled name="mapTo" />
            </Form.Item>
            <Form.Item className="col-md-6">
              {form.getFieldDecorator(`${item}`, {
                initialValue: (fileHeaders && fileHeaders.includes(selectedHeader))?selectedHeader:0 ,
              rules: [{ required: false}]
            })(
              <Select>
                <Option value={0}>Select Headers</Option>
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
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  if (skipTraced) {
    return(
      <div>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Import">
            {
          form.getFieldDecorator('import',{ required: true, message: 'Please upload a csv file'})
          (
            <Upload multiple={false} name="file" listType="csv" accept="csv" action={`${SERVER_ADDRESS}/contacts/uploadFile`} onChange={this.onUploadFile}>
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
        )
        }

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={!fileHeaders || !showImportButton || spinner}>
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
          closable={false}
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
                <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={spinner}>Submit</Button>
                {spinner?<Spin indicator={antIcon} />:''}
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
          {spinner?<Spin indicator={antIcon} />:''}
          <Form.Item label="Campaign">
            <Radio.Group onChange={this.handleOnChangeCampaign} defaultValue={campaignType}>
              <Radio value="new">New Campaign</Radio>
              <Radio value="existing">Existing Campaign</Radio>
            </Radio.Group>
          </Form.Item>
          {campaignType === 'new' ?
            <Form.Item label="Campaign Name">
              {
              form.getFieldDecorator('campaign',{ rules:[{required: true, message: 'Please enter a campaign name'}] })
              (<Input name="campaign" onBlur={(e)=> this.onChangeCampaignName(e)} />)
            }

            </Form.Item>:
            <Form.Item label="Select Campaign">
              {form.getFieldDecorator('campaign', {
                required: true,
                message: 'Please select a campaign',
              })(
                <Select placeholder="Please select a campaign" name="campaign">
                  {listData}
                </Select>
              )}
            </Form.Item>

          }

          <Form.Item label="Import">
            {form.getFieldDecorator('import', {
              required: true,
              message: 'Please upload a csv file',
            })(
              <Upload
                multiple={false}
                name="file"
                listType="csv"
                accept="csv"
                action={`${SERVER_ADDRESS}/contacts/uploadFile`}
                onChange={this.onUploadFile}
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={!fileHeaders || !showImportButton || spinner}>
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
          closable={false}
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
                <Button type="primary" htmlType="submit" className="ant-btn mr-3" disabled={spinner}>
                  Submit
                </Button>
                {spinner?<Spin indicator={antIcon} />:''}
              </Form.Item>

            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(ImportContacts)
