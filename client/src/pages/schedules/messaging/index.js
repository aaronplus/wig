import React from 'react'
import { Helmet } from 'react-helmet'
import { Input, Icon, Tooltip } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import moment from 'moment'

// import dialogs from './data.json'
import style from './style.module.scss'

class Messaging extends React.Component {
  state = {
    activeId: 0,
    conversations: [],
    conversation: {
      messages: [],
    },
    msg: '',
  }

  componentDidMount() {
    this.getConversations()
  }

  formatConversation = conv => {
    const result = {
      id: conv._id,
      name: conv.from_name,
      from: conv.from,
      to: conv.to,
      avatar: 'resources/images/avatars/1.jpg',
      unread: conv.messages.filter(x => !x.read).length,
      position: '',
    }
    result.messages = conv.messages.map(msg => {
      const r = {
        owner: msg.received ? conv.from_name : 'you',
        time: moment(msg.createdAt).format('HH:mm'),
        content: msg.message,
      }
      return r
    })
    return result
  }

  getConversations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/twilio/conversations')
      const conversations = response.data.map(conv => this.formatConversation(conv))
      this.setState({ conversations })
    } catch (error) {
      console.log(error)
    }
  }

  changeDialog = (e, id) => {
    e.preventDefault()
    this.markConversationRead(id)
  }

  handleInputChange = e => {
    this.setState({ msg: e.currentTarget.value })
  }

  handleSendMessage = e => {
    e.preventDefault()
    const { msg, conversation } = this.state
    if (msg.trim().length > 0) {
      this.sendMessage(conversation.id, msg)
    }
  }

  sendMessage = async (conversationId, message) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/twilio/reply/${conversationId}`,
        { message },
      )
      const conversation = this.formatConversation(response.data)
      this.setState({ conversation, msg: '' })
    } catch (error) {
      console.log(error)
    }
  }

  markConversationRead = async conversationId => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/twilio/conversations/${conversationId}`,
      )
      const conversations = response.data.map(conv => this.formatConversation(conv))
      const conversation = conversations.find(x => x.id === conversationId)
      this.setState({
        activeId: conversationId,
        conversation,
        conversations,
      })
      this.setState({})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { activeId, conversations, conversation, msg } = this.state
    console.log('Conversation: ', conversations)
    const { name, position, messages, avatar } = conversation
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
                {conversations.map(item => (
                  <a
                    href="javascript: void(0);"
                    onClick={e => this.changeDialog(e, item.id)}
                    key={item.name}
                    className={`${style.item} ${
                      item.id === activeId ? style.current : ''
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
                      {messages.map(message => (
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
                <div className="pt-2 pb-2" />
                <form onSubmit={this.handleSendMessage}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={msg}
                      onChange={this.handleInputChange}
                      placeholder="Send message..."
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        disabled={msg.trim().length === 0}
                        type="submit"
                      >
                        <i className="fe fe-send align-middle" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Messaging
