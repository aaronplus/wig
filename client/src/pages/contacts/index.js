import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal, Form, Select } from 'antd'
import socketIO from 'socket.io-client'
import ImportContacts from './import'
import ProgressBar from '../../components/contacts/ProgressBar';
import { SERVER_ADDRESS } from '../../config/constants'

const { Option } = Select
// import data from './data.json'

const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
@Form.create()
class ContactsList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
    visibleImportComponent: false,
    visibleImportSkipTracedComponent: false,
    showProgressBar: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'contacts/GET_CONTACTS',
      payload: localStorage.getItem('jwtToken'),
    })
    dispatch({
      type: 'contacts/GET_CAMPAIGN_LIST',
      payload: false,
    })

    const socket = socketIO(SERVER_ADDRESS, { forceNew: true })
    socket.on('import_status', data => {
      this.setState({
        showProgressBar: true,
        progressData: data
      })
      console.log(data, "Import Status");
    });
    socket.on('import_status_success', data => {
      console.log(data, "Import Status");
      this.setState({
        progressData: data
      })
    });
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    })
  }

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    })
  }

  handleOkImportContacts = () => {
    this.handleSubmit()
    this.setState({
      visibleImportComponent: false,
      visibleImportSkipTracedComponent:false
    })
  }

  handleOk = () => {
    const { dispatch, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      const { campaign } = values
      dispatch({
        type: 'contacts/EXPORT_CONTACTS',
        payload: { campaign },
      })
    })

    this.setState({
      visible: false,
    })
  }

  onClickExportFiltered = () => {
    const { dispatch } = this.props
    const { filteredInfo } = this.state
    console.log(filteredInfo);
    if (filteredInfo) {
      const { campaign, propertyState, propertyCity } = filteredInfo
      if (campaign || propertyState || propertyCity) {
        dispatch({
          type: 'contacts/EXPORT_CONTACTS',
          payload: { campaign, propertyState, propertyCity},
        })
      }
    }
  }

  handleUploadFile = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contacts/GET_CONTACTS',
      payload: localStorage.getItem('jwtToken'),
    })
    this.setState({
      visibleImportComponent:false,
      visibleImportSkipTracedComponent: false
    })
  }

  hideModal = () =>{
    this.setState({
      visibleImportComponent:false,
      visibleImportSkipTracedComponent: false
    })
  }

  render() {
    const {
      contacts: { campaignList, list, countObj },
      form,
    } = this.props
    console.log(campaignList, 'campaignList')
    const campainFilterOptions = campaignList
      ? campaignList.map(item => {
          return { text: item.campaign, value: item._id }
        })
      : []
    const statesArr = list ? [...new Set(list.map(x => x.propertyState))] : [];
    const cityArr = list ? [...new Set(list.map(x => x.propertyCity))] : [];
    const stateFilterOptions = statesArr
      ? statesArr.map(item => {
          return { text: item, value: item }
        })
      : [];
      const cityFilterOptions = cityArr
        ? cityArr.map(item => {
            return { text: item, value: item }
          })
        : []
        console.log(cityFilterOptions);
    const data = list;
    let { sortedInfo, filteredInfo } = this.state
    const { progressData, visible, visibleImportComponent, visibleImportSkipTracedComponent, showProgressBar } = this.state
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    console.log(filteredInfo)
    const columns = [
      {
        title: 'Campaign',
        dataIndex: 'campaign_info.campaign',
        key: 'campaign',
        filters: campainFilterOptions,
        filterMultiple: true,
        onFilter: (value, record) => record.campaign_info._id.includes(value),
        filteredValue: filteredInfo.campaign || null,
        // sorter: (a, b) => a.mailingName.length - b.mailingName.length,
        // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'First Name',
        dataIndex: 'firstNameOne',
        key: 'firstName',
        sorter: (a, b) => a.firstNameOne.length - b.firstNameOne.length,
        sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastNameOne',
        key: 'lastName',

        sorter: (a, b) => a.lastNameOne.length - b.lastNameOne.length,
        sortOrder: sortedInfo.columnKey === 'lastName' && sortedInfo.order,
      },
      // {
      //   title: 'Property Address',
      //   dataIndex: 'propertyAddress',
      //   key: 'propertyAddress',
      //   sorter: (a, b) => a.propertyAddress - b.propertyAddress,
      //   sortOrder: sortedInfo.columnKey === 'propertyAddress' && sortedInfo.order,
      // },
      {
        title: 'Property City',
        dataIndex: 'propertyCity',
        key: 'propertyCity',
        sorter: (a, b) => a.propertyCity - b.propertyCity,
        sortOrder: sortedInfo.columnKey === 'propertyCity' && sortedInfo.order,
        filters: cityFilterOptions,
        filterMultiple: true,
        onFilter: (value, record) => record.propertyCity.includes(value),
        filteredValue: filteredInfo.propertyCity || null,
      },
      {
        title: 'Property State',
        dataIndex: 'propertyState',
        key: 'propertyState',
        filters: stateFilterOptions,
        filterMultiple: true,
        onFilter: (value, record) => record.propertyState.includes(value),
        sorter: (a, b) => a.propertyState - b.propertyState,
        sortOrder: sortedInfo.columnKey === 'propertyState' && sortedInfo.order,
        filteredValue: filteredInfo.propertyState || null,
      },
      {
        title: 'Property Zip',
        dataIndex: 'propertyZipCode',
        key: 'propertyZipCode',
        sorter: (a, b) => a.propertyZipCode - b.propertyZipCode,
        sortOrder: sortedInfo.columnKey === 'propertyZipCode' && sortedInfo.order,
      }
    ]

    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';

    return (
      <div>
        {showProgressBar ?
          <div className="card">
            <div className="card-body prgrs-bar">
              <div className="row justify-content-between">
                <div className="col-md-5 prgs-card">
                  <ProgressBar data={progressData} />
                </div>
                <div className="col-auto">
                  <div className="row">
                    <div className="col-md prgs-card">
                      <p className="text-success">{progressData.insertedCount}</p>
                      Inserted
                    </div>
                    <div className="col-md prgs-card">
                      <p className="text-default">{progressData.updatedCount}</p>
                      Updated
                    </div>
                    <div className="col-md prgs-card">
                      <p className="text-danger">{progressData.skippedCount}</p>
                      Skipped
                    </div>
                  </div>
                </div>
                <div className="col-auto d-flex align-items-center justify-content-end">
                  <span className="d-block mr-3">Send To Skip</span>
                  <Button className="mr-2" type="danger" ghost size='small' onClick={() => this.setState({showProgressBar: false})}>
                    No
                  </Button>
                  <Button type="button" className="btn-success text-success" ghost size='small' onClick={() => this.setState({showProgressBar: false})}>
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        :''}
        <div className="row">


          <div className="col-md-3">
            <div className="air__utils__heading">
              <h5>Contacts</h5>
            </div>
          </div>
          <div className="col-md-9 text-right">
            <Button
              className="mr-3 btn-outline-success"
              icon="download"
              onClick={() => this.setState({ visible: true })}
              disabled={data.length === 0}
            >
              Export for Skip Tracing
            </Button>
            <Button
              className="mr-3 btn-outline-success"
              icon="download"
              onClick={this.onClickExportFiltered}
              disabled={Object.keys(filteredInfo).length === 0}
            >
              Export Filtered
            </Button>
            <Button
              className="mr-3"
              type="primary"
              icon="upload"
              onClick={() => this.setState({ visibleImportComponent: true })}
            >
              Import
            </Button>
            <Button
              className="mr-3"
              type="primary"
              icon="upload"
              onClick={() => this.setState({ visibleImportSkipTracedComponent: true })}
            >
              Import Skipped Traced
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="mb-3 text-right">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled row">
                    <li className="text-muted col-md-6 text-left">
                      <div>
                        <div className="text-nowrap d-inline-block">
                          <div className="air__utils__donut air__utils__donut--success" />
                          <span className="font-weight-bold text-gray-6">
                            {countObj.contactCount}
                            <span className="font-weight-light"> contacts in</span>{' '}
                            {countObj.campaignCount}
                            <span className="font-weight-light"> campaigns</span>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="text-muted col-md-6 text-left">
                      <div>
                        <div className="text-nowrap d-inline-block">
                          <div className="air__utils__donut air__utils__donut--error" />
                          <span className="font-weight-bold text-gray-6">
                            {countObj.skipContactCount}
                            <span className="font-weight-light"> to be skipped traced</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <Button onClick={this.clearFilters} className="mr-3">
                    Clear filters
                  </Button>
                  <Button onClick={this.clearAll} className="mr-3">
                    Clear filters and sorters
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-4 air__utils__scrollTable">
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: '100%' }}
                onChange={this.handleChange}
              />
            </div>
            <Modal
              title="Export Contacts"
              visible={visible}
              onOk={this.handleOk}
              onCancel={() => this.setState({ visible: false })}
              closable={false}
            >
              <Form>
                <Form.Item label="Select Campaign">
                  {form.getFieldDecorator('campaign', {
                    required: true,
                    message: 'Please select a campaign',
                  })(
                    <Select placeholder="Please select a campaign" name="campaign">
                      {listData}
                    </Select>,
                  )}
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Import Contacts"
              visible={visibleImportComponent}
              closable={false}
              // onOk={() => this.setState({ visibleImportComponent: false })}
              // onCancel={() => this.setState({ visibleImportComponent: false })}
              footer={[
                <Button onClick={() => this.setState({ visibleImportComponent: false })} className="mr-3">
                Cancel
                </Button>
            ]}
            >
              <ImportContacts skipTraced={false} handleUploadFile={this.handleUploadFile} hideModal={this.hideModal} />
            </Modal>
            <Modal
              title="Import Skip traced Contacts"
              visible={visibleImportSkipTracedComponent}
              closable={false}
              // onOk={this.handleOkImportContacts}
              // onCancel={() => this.setState({ visibleImportSkipTracedComponent: false })}
              footer={[
                <Button onClick={() => this.setState({ visibleImportSkipTracedComponent: false })} className="mr-3">
                Cancel
                </Button>
            ]}
            >
              <ImportContacts skipTraced handleUploadFile={this.handleUploadFile} hideModal={this.hideModal} />
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactsList
