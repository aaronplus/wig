import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'antd'
// import data from './data.json'

const mapStateToProps = ({ contacts }) => ({ contacts })
@connect(mapStateToProps)
class ContactsList extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch({
      type: 'contacts/GET_CONTACTS',
      payload: localStorage.getItem('setAuthToken'),
    })
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

  render() {
    const { contacts } = this.props;
    const data = contacts.list;
    let { sortedInfo, filteredInfo } = this.state
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
    ]

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
        </div>
        <div className="mb-4 air__utils__scrollTable">
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: '100%' }}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

export default ContactsList
