import React from 'react'
import { connect } from 'react-redux';
import { Table, Button, Modal, Form, Select } from 'antd'
import ImportContacts from './import'

const { Option } = Select;
// import data from './data.json'

const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
@Form.create()
class ContactsList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    visible:false,
    visibleImportComponent: false,
    visibleImportSkipTracedComponent: false
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch({
      type: 'contacts/GET_CONTACTS',
      payload: localStorage.getItem('jwtToken'),
    });
    dispatch({
      type: 'contacts/GET_CAMPAIGN_LIST',
      payload: false,
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

  handleOkImportContacts = () =>{
    this.handleSubmit();
    this.setState({
      visibleImportComponent: false
    })
  }

  handleOk = () =>{
    const { dispatch, form} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const {campaign} = values;
      dispatch({
        type: 'contacts/EXPORT_CONTACTS',
        payload: {campaign},
      })
    });

    this.setState({
      visible: false
    })


  }

  onClickExportFiltered =() => {
    const {dispatch} = this.props;
    const { filteredInfo } = this.state;
    if (filteredInfo) {
      const {campaign, propertyAddress} = filteredInfo;
      if (campaign || propertyAddress) {
        dispatch({
          type: 'contacts/EXPORT_CONTACTS',
          payload: {campaign,propertyAddress},
        })
      }
    }


  }

  render() {
    const { contacts:{campaignList, list, countObj}, form } = this.props;
    console.log(campaignList,"campaignList");
    const campainFilterOptions = campaignList? campaignList.map(item=> {
      return {text:item.campaign, value: item._id}
    }): [];
    const statesArr = list?[... new Set(list.map(x => x.propertyState))]:[];
    const stateFilterOptions = statesArr? statesArr.map(item=> {
      return {text:item, value: item}
    }): [];

    const data = list;
    let { sortedInfo, filteredInfo } = this.state;
    const { visible, visibleImportComponent, visibleImportSkipTracedComponent } = this.state;
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    console.log(filteredInfo);
    const columns = [
      {
        title: 'Campaign',
        dataIndex: 'campaign_info.campaign',
        key: 'campaign',
        filters: campainFilterOptions,
        filterMultiple:true,
        onFilter: (value, record) => record.campaign_info._id.includes(value),
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
      {
        title: 'Property Address',
        dataIndex: 'propertyAddress',
        key: 'propertyAddress',
        filters: stateFilterOptions,
        filterMultiple:true,
        onFilter: (value, record) => record.propertyState.includes(value),
        sorter: (a, b) => a.propertyAddress - b.propertyAddress,
        sortOrder: sortedInfo.columnKey === 'propertyAddress' && sortedInfo.order,
      }
    ];

    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    return (
      <div>
        <div className="air__utils__heading">
          <h5>Contacts List</h5>
        </div>
        <ul className="list-unstyled row">
          <li className="text-muted col-md-4">
            <div className="text-uppercase mb-1">total contacts</div>
            <div>
              <div className="text-nowrap d-inline-block">
                <div className="air__utils__donut air__utils__donut--danger" />
                <span className="font-weight-bold text-gray-6">{countObj.contactCount}</span>
              </div>
            </div>
          </li>
          <li className="text-muted col-md-4">
            <div className="text-uppercase mb-1">total campaign count</div>
            <div>
              <div className="text-nowrap d-inline-block">
                <div className="air__utils__donut air__utils__donut--warning" />
                <span className="font-weight-bold text-gray-6">{countObj.campaignCount}</span>
              </div>
            </div>
          </li>
          <li className="text-muted col-md-4">
            <div className="text-uppercase mb-1">to be skipped traced </div>
            <div>
              <div className="text-nowrap d-inline-block">
                <div className="air__utils__donut air__utils__donut--success" />
                <span className="font-weight-bold text-gray-6">{countObj.skipContactCount}</span>
              </div>
            </div>
          </li>
        </ul>
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <Button onClick={this.clearFilters} className="mr-3">
                Clear filters
              </Button>
              <Button onClick={this.clearAll} className="mr-3">
                Clear filters and sorters
              </Button>
              <Button className="mr-3" type="primary" shape="round" icon="download" onClick={()=> this.setState({visible:true})}>
                Export for Skip Tracing
              </Button>
              <Button className="mr-3" type="primary" shape="round" icon="download" onClick={this.onClickExportFiltered}>
                Export Filter Result
              </Button>
              <Button className="mr-3" type="primary" shape="round" icon="upload" onClick={()=> this.setState({visibleImportComponent:true})}>
                Import
              </Button>
              <Button className="mr-3" type="primary" shape="round" icon="upload" onClick={()=> this.setState({visibleImportSkipTracedComponent:true})}>
                Import Traced
              </Button>
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
              onCancel={()=> this.setState({visible:false})}
            >
              <Form>
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
              </Form>
            </Modal>
            <Modal
              title="Import Contacts"
              visible={visibleImportComponent}
              onOk={this.handleOkImportContacts}
              onCancel={()=> this.setState({visibleImportComponent:false})}
            >
              <ImportContacts skipTraced={false} />
            </Modal>
            <Modal
              title="Import Skip traced Contacts"
              visible={visibleImportSkipTracedComponent}
              onOk={this.handleOkImportContacts}
              onCancel={()=> this.setState({visibleImportSkipTracedComponent:false})}
            >
              <ImportContacts skipTraced />
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactsList
