import React from 'react'
import { Menu, Dropdown } from 'antd'

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a href="javascript: void(0)">
        <i className="dropdown-icon icmn-pencil mr-1" /> Edit Post
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript: void(0)">
        <i className="dropdown-icon icmn-bin mr-1" /> Delete Post
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="javascript: void(0)">
        <i className="dropdown-icon fa fa-recycle mr-1" /> Mark as Spam
      </a>
    </Menu.Item>
  </Menu>
)

class General15 extends React.Component {
  render() {
    return (
      <div className="d-flex flex-nowrap align-items-start pt-4">
        <div className="air__utils__avatar air__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
          <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
        </div>
        <div className="flex-grow-1">
          <div className="border-bottom">
            <div className="d-flex flex-wrap mb-2">
              <div className="mr-auto">
                <div className="text-gray-6">
                  <span className="text-dark font-weight-bold">Helen maggie</span> posted
                </div>
                <div>Few seconds ago</div>
              </div>
              <div className="nav-item dropdown">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <a className="nav-link dropdown-toggle pt-sm-0" href="javascript: void(0);">
                    Actions
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="mb-3">
              Lorem ipsum dolor sit amit,consectetur eiusmdd tempory
              <br /> incididunt ut labore et dolore magna elit
            </div>
            <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
              <a className="text-blue mr-3" href="javascript: void(0);">
                <i className="icmn-heart mr-1" /> 61 Likes
              </a>
              <a className="text-blue mr-3" href="javascript: void(0);">
                <i className="icmn-bubble mr-1" /> 2 Comments
              </a>
            </div>
          </div>
          <div className="d-flex flex-nowrap align-items-start pt-4">
            <div className="air__utils__avatar air__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
              <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
            </div>
            <div className="flex-grow-1">
              <div className="border-bottom">
                <div className="d-flex flex-wrap mb-2">
                  <div className="mr-auto">
                    <div className="text-gray-6">
                      <span className="text-dark font-weight-bold">Helen maggie</span> posted
                    </div>
                    <div>Few seconds ago</div>
                  </div>
                  <div className="nav-item dropdown">
                    <Dropdown overlay={dropdownMenu} placement="bottomRight">
                      <a className="nav-link dropdown-toggle pt-sm-0" href="javascript: void(0);">
                        Actions
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <div className="mb-3">
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempory
                  <br /> incididunt ut labore et dolore magna elit
                </div>
                <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
                  <a className="text-blue mr-3" href="javascript: void(0);">
                    <i className="icmn-heart mr-1" /> 61 Likes
                  </a>
                  <a className="text-blue mr-3" href="javascript: void(0);">
                    <i className="icmn-bubble mr-1" /> 2 Comments
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-nowrap align-items-start pt-4">
            <div className="air__utils__avatar air__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
              <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
            </div>
            <div className="flex-grow-1">
              <div className="border-bottom">
                <div className="d-flex flex-wrap mb-2">
                  <div className="mr-auto">
                    <div className="text-gray-6">
                      <span className="text-dark font-weight-bold">Helen maggie</span> posted
                    </div>
                    <div>Few seconds ago</div>
                  </div>
                  <div className="nav-item dropdown">
                    <Dropdown overlay={dropdownMenu} placement="bottomRight">
                      <a className="nav-link dropdown-toggle pt-sm-0" href="javascript: void(0);">
                        Actions
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <div className="mb-3">
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempory
                  <br /> incididunt ut labore et dolore magna elit
                </div>
                <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
                  <a className="text-blue mr-3" href="javascript: void(0);">
                    <i className="icmn-heart mr-1" /> 61 Likes
                  </a>
                  <a className="text-blue mr-3" href="javascript: void(0);">
                    <i className="icmn-bubble mr-1" /> 2 Comments
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default General15
