import React from 'react'
import { connect } from 'react-redux';
import { Table, Button, Modal, Form, Select } from 'antd'

const { Option } = Select;
// import data from './data.json'

const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
@Form.create()
class ContactsList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    visible:false
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

  render() {
    const { contacts:{campaignList, list}, form } = this.props;
    const data = list;
    let { sortedInfo, filteredInfo } = this.state;
    const { visible } = this.state;
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    const columns = [
      {
        title: 'Name',
        dataIndex: 'mailingName',
        key: 'name',
        filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.mailingName.length - b.mailingName.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Zip',
        dataIndex: 'propertyZipCode',
        key: 'zip',
        sorter: (a, b) => a.propertyZipCode - b.propertyZipCode,
        sortOrder: sortedInfo.columnKey === 'zip' && sortedInfo.order,
      },
      {
        title: 'State',
        dataIndex: 'propertyState',
        key: 'state',
        filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.propertyState.includes(value),
        sorter: (a, b) => a.propertyState.length - b.propertyState.length,
        sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
      },
    ];

    const listData = campaignList?campaignList.map((item) => <Option key={item._id} value={item._id}>{item.campaign}</Option>):'';
    return (
      <div>
        <div className="mb-3">
          <Button onClick={this.setAgeSort} className="mr-3">
            Sort age
          </Button>
          <Button onClick={this.clearFilters} className="mr-3">
            Clear filters
          </Button>
          <Button onClick={this.clearAll} className="mr-3">
            Clear filters and sorters
          </Button>
          <Button type="primary" shape="round" icon="download" onClick={()=> this.setState({visible:true})}>
            Export for Skip Tracing
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
      </div>
    )
  }
}

export default ContactsList
