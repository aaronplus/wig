import React from 'react'
import { Helmet } from 'react-helmet'
import { Table, Checkbox } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree'
import General2 from 'components/widgets/General/2'
import General2v1 from 'components/widgets/General/2v1'
import General2v2 from 'components/widgets/General/2v2'
import Table7 from 'components/widgets/Tables/7'
import data from './data.json'

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    className: 'bg-transparent text-gray-6',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    className: 'bg-transparent text-gray-6',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'bg-transparent',
    render: text => {
      return (
        <a href="javascript: void(0);" className="text-blue">
          {text}
        </a>
      )
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    className: 'text-right bg-transparent text-gray-6',
    render: () => (
      <button type="button" className="btn btn-outline-success">
        Resolve
      </button>
    ),
  },
]

class ExtraAppsHelpdeskDashboard extends React.Component {
  state = {
    treeData: [
      { name: 'IT Manager', checked: true },
      {
        name: 'Regional Managers',
        expanded: true,
        children: [
          { name: 'Branch Manager', checked: true },
          { name: 'QA Engineer', checked: true },
          { name: 'Network Administrator', checked: false },
          { name: 'Project Manager', checked: false },
          { name: 'Team Leader', checked: true },
        ],
      },
    ],
  }

  render() {
    const { treeData } = this.state
    const getNodeKey = ({ treeIndex }) => treeIndex

    return (
      <div>
        <Helmet title="Helpdesk Dashboard" />
        <div className="air__utils__heading">
          <h5>Helpdesk Dashboard</h5>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <General2 />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <General2v1 />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <General2v2 />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <h6 className="text-uppercase text-dark font-weight-bold mb-3">To Do</h6>
                <p className="mb-3">
                  Welcome to Todoist! Let&apos;s get you started with a few tips
                </p>
                <div className="height-300">
                  <Scrollbars
                    autoHide
                    renderThumbVertical={({ ...props }) => (
                      <div
                        {...props}
                        style={{
                          width: '5px',
                          borderRadius: 'inherit',
                          backgroundColor: 'rgba(195, 190, 220, 0.4)',
                          left: '1px',
                        }}
                      />
                    )}
                  >
                    <SortableTree
                      treeData={treeData}
                      onChange={tree => this.setState({ treeData: tree })}
                      generateNodeProps={({ node, path }) => ({
                        title: !node.children ? (
                          <Checkbox
                            checked={node.checked}
                            onChange={event => {
                              const { checked } = event.target

                              this.setState(state => ({
                                treeData: changeNodeAtPath({
                                  treeData: state.treeData,
                                  path,
                                  getNodeKey,
                                  newNode: { ...node, checked },
                                }),
                              }))
                            }}
                          >
                            {node.name}
                          </Checkbox>
                        ) : (
                          <span>{node.name}:</span>
                        ),
                      })}
                    />
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <h6 className="text-uppercase text-dark font-weight-bold mb-3">
                  Recent help requests
                </h6>
                <div className="air__utils__scrollTable">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <Table7 />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExtraAppsHelpdeskDashboard
