import React from 'react'
import { Helmet } from 'react-helmet'
import { Input, Icon, Tooltip } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import dialogs from './data.json'
import style from './style.module.scss'

class AppsMessaging extends React.Component {
  state = {
    activeIndex: 0,
  }

  changeDialog = (e, index) => {
    e.preventDefault()
    this.setState({
      activeIndex: index,
    })
  }

  render() {
    const { activeIndex } = this.state
    const { name, position, dialog, avatar } = dialogs[activeIndex]
    return (
      <div>
        <Helmet title="Apps: Messaging" />
        <div className="air__utils__heading">
          <h5>Apps: Messaging</h5>
        </div>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="mb-4">
              <Input
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search users..."
              />
            </div>
            <div className={style.dialogs}>
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
                {dialogs.map((item, index) => (
                  <a
                    href="javascript: void(0);"
                    onClick={e => this.changeDialog(e, index)}
                    key={item.name}
                    className={`${style.item} ${
                      index === activeIndex ? style.current : ''
                    } d-flex flex-nowrap align-items-center`}
                  >
                    <div className="air__utils__avatar air__utils__avatar--size46 mr-3 flex-shrink-0">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                    <div className={`${style.info} flex-grow-1`}>
                      <div className="text-uppercase font-size-12 text-truncate text-gray-6">
                        {item.position}
                      </div>
                      <div className="text-dark font-size-18 font-weight-bold text-truncate">
                        {item.name}
                      </div>
                    </div>
                    <div
                      hidden={!item.unread}
                      className={`${style.unread} flex-shrink-0 align-self-start`}
                    >
                      <div className="badge badge-success">{item.unread}</div>
                    </div>
                  </a>
                ))}
              </Scrollbars>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="card">
              <div className="card-header card-header-flex align-items-center">
                <div className="d-flex flex-column justify-content-center mr-auto">
                  <h5 className="mb-0 mr-2 font-size-18">
                    {name} <span className="font-size-14 text-gray-6">({position})</span>
                  </h5>
                </div>
                <div>
                  <Tooltip placement="top" title="Unlock Account">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light mr-2">
                      <i className="fe fe-unlock" />
                    </a>
                  </Tooltip>
                  <Tooltip placement="top" title="Mark as important">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light mr-2">
                      <i className="fe fe-star" />
                    </a>
                  </Tooltip>
                  <Tooltip placement="top" title="Delete user">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light">
                      <i className="fe fe-trash" />
                    </a>
                  </Tooltip>
                </div>
              </div>
              <div className="card-body">
                <div className="height-700">
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
                    <div className="d-flex flex-column justify-content-end height-100p">
                      {dialog.map(message => (
                        <div
                          key={Math.random()}
                          className={`${style.message} ${
                            message.owner !== 'you' ? style.answer : ''
                          }`}
                        >
                          <div className={style.messageContent}>
                            <div className="text-gray-4 font-size-12 text-uppercase">
                              {message.owner}, {message.time}
                            </div>
                            <div>{message.content}</div>
                          </div>
                          <div className={`${style.messageAvatar} air__utils__avatar`}>
                            <img
                              src={`${
                                message.owner !== 'you'
                                  ? avatar
                                  : 'resources/images/avatars/avatar-2.png'
                              }`}
                              alt={name}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Scrollbars>
                </div>
                <div className="pt-2 pb-2">{name} is typing...</div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Send message..." />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fe fe-send align-middle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppsMessaging
