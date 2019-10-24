import React from 'react'
import { Menu, Dropdown, Tabs } from 'antd'

import style from './style.module.scss'

const { TabPane } = Tabs

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a href="javascript: void(0)">Action</a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript: void(0)">Another action</a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript: void(0)">Something else here</a>
    </Menu.Item>
    <div className="dropdown-divider" />
    <Menu.Item>
      <a href="javascript: void(0)">Separated link</a>
    </Menu.Item>
  </Menu>
)

class General11v1 extends React.Component {
  render() {
    return (
      <div>
        <div className="bg-gray-2 height-200 d-flex flex-column">
          <div className="card-header card-header-flex border-bottom-0">
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-0 text-color-6">Basic Card</h5>
            </div>
            <div className="ml-auto d-flex flex-column justify-content-center">
              <div className="dropdown d-inline-block">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <button
                    type="button"
                    className="btn btn-light dropdown-toggle dropdown-toggle-noarrow"
                  >
                    <i className="fe fe-more-horizontal" />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-dark font-size-36 font-weight-bold">$657,345</div>
          </div>
        </div>
        <div className="card card-borderless">
          <div className={`${style.cardBtn} text-center`}>
            <a href="#" className="btn btn-outline-primary">
              Withdraw
            </a>
          </div>
          <div className="card card-borderless">
            <Tabs className="air-tabs-bordered" defaultActiveKey="1">
              <TabPane tab="History" key="1">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </TabPane>
              <TabPane
                tab={
                  <Dropdown overlay={dropdownMenu} placement="bottomRight">
                    <a
                      className="nav-link dropdown-toggle"
                      href="javascript: void(0);"
                      role="button"
                    >
                      Dropdown
                    </a>
                  </Dropdown>
                }
                key="2"
              >
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </TabPane>
              <TabPane tab="Actions" key="3">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default General11v1
