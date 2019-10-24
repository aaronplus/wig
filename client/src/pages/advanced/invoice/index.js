import React from 'react'
import { Helmet } from 'react-helmet'
import { Table } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: text => {
      return (
        <a href="javascript: void(0);" className="text-blue">
          {text}
        </a>
      )
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    className: 'text-right',
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
  {
    title: 'Unit Cost',
    dataIndex: 'cost',
    key: 'cost',
    className: 'text-right',
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
  {
    title: 'Summary',
    dataIndex: 'overall',
    key: 'overall',
    className: 'text-right',
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
]

class SystemInvoice extends React.Component {
  state = {
    selectedRowKeys: ['1', '2', '3'],
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
        <Helmet title="Invoice" />
        <div className="air__utils__heading">
          <h5>Invoice</h5>
        </div>
        <div className="d-flex flex-wrap">
          <div className="flex-grow-1 d-flex flex-column flex-sm-row mb-4">
            <div className="font-size-18 font-weight-bold text-uppercase mb-4">
              <div>From:</div>
              <div className="text-dark mb-3">Amazon delivery</div>
              <img
                className="d-block"
                src="resources/images/content/amazon-logo.jpg"
                alt="Amazon logo"
              />
            </div>
            <div className="ml-sm-auto mr-lg-auto pr-3">
              795 Folsom Ave, Suite 600
              <br />
              San Francisco, CA, 94107
              <br />
              E-mail: example@amazon.com
              <br />
              Phone: (123) 456-7890
              <br />
              Fax: 800-692-7753
            </div>
          </div>
          <div className="flex-grow-1 d-flex flex-column flex-sm-row mb-4">
            <div className="font-size-18 font-weight-bold text-uppercase pb-4">
              <div>To:</div>
              <div className="text-dark mb-3">Invoice info</div>
              <div className="text-dark">W32567-2352-4756</div>
              <div className="text-dark">Artour Arteezy</div>
            </div>
            <div className="mt-auto mt-sm-0 ml-sm-auto pr-3 mr-lg-auto">
              795 Folsom Ave, Suite 600
              <br />
              San Francisco, CA, 94107
              <br />
              P: (123) 456-7890
              <br />
              Invoice Date: January 20, 2016
              <br />
              Due Date: January 22, 2016
            </div>
          </div>
        </div>
        <div className="air__utils__scrollTable mb-4">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowSelection={rowSelection}
            scroll={{ x: '100%' }}
          />
        </div>
        <div className="text-right font-size-18 text-dark">
          <div>
            Sub - Total amount: <span className="font-weight-bold">$406,472.50</span>
          </div>
          <div>
            VAT: <span className="font-weight-bold">$81,294.50</span>
          </div>
          <div>
            Grand Total: <span className="font-weight-bold">$487,767.00</span>
          </div>
          <a href="javascript: void(0);" className="btn btn-outline-success mr-3 mt-3">
            Proceed Payment
          </a>
          <a href="javascript: void(0);" className="btn btn-outline-success mt-3">
            Print
          </a>
        </div>
      </div>
    )
  }
}

export default SystemInvoice
