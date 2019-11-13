import React from 'react'
import { Helmet } from 'react-helmet'
import { Input, Icon, Tooltip } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import moment from 'moment'
import socketIO from 'socket.io-client'

// import dialogs from './data.json'
import style from './style.module.scss'
import { SERVER_ADDRESS } from '../../../config/constants'

class Messaging extends React.Component {
  state = {
    activeId: 0,
    conversations: [],
    conversation: {
      messages: [],
    },
    msg: '',
    page: 1,
    hasMore: true,
    isFetching: true,
  }

  componentDidMount() {
    this.getConversations()
    const socket = socketIO(SERVER_ADDRESS, { forceNew: true })
    socket.on('new_sms', data => {
      const { activeId } = this.state
      if (data._id === activeId) {
        this.markConversationRead(data._id)
      } else {
        this.updateConversations(data)
      }
      console.log('New Message Received', data)
    })
  }

  updateConversations = data => {
    const { conversations, activeId, conversation } = this.state
    const index = conversations.findIndex(conv => conv.id.toString() === data._id.toString())
    if (index === -1) {
      this.setState({ conversations: [...conversations, this.formatConversation(data)] })
    } else {
      const newConv = this.formatConversation(data)
      const newConvs = conversations
      newConvs[index] = newConv
      this.setState({
        conversations: newConvs,
        conversation: newConv.id === activeId ? newConv : conversation,
      })
    }
  }

  handleScroll = ({ top }) => {
    console.log('Scrolling...', top)
    const { hasMore } = this.state
    if (top === 1 && hasMore) {
      this.setState(prevState => ({ ...prevState, page: prevState.page + 1, isFetching: true }))
      this.getConversations()
    }
  }

  formatConversation = conv => {
    const result = {
      id: conv._id,
      campaign: conv.contact && conv.contact.campaign ? conv.contact.campaign.campaign : 'Unknown',
      contactId: conv.contact ? `${conv.contact._id || undefined}` : undefined,
      name: conv.contact
        ? `${conv.contact.firstNameOne || ''} ${conv.contact.lastNameOne || ''}`.trim()
        : 'Unknown',
      address: conv.contact
        ? `${conv.contact.propertyAddress}, ${conv.contact.propertyCity}, ${conv.contact.propertyState}, ${conv.contact.propertyZipCode}`
        : 'Unknown',
      from: conv.from,
      to: conv.to,
      avatar: 'resources/images/avatars/avatar-2.png',
      unread: conv.messages.filter(x => !x.read).length,
      contactStatus: conv.contact ? `${conv.contact.status || undefined}` : undefined,
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
    const { page } = this.state
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/twilio/conversations?page=${page}`)
      console.log(response.data)
      const conversations = response.data.map(conv => this.formatConversation(conv))
      if (conversations.length <= 0) {
        this.setState({
          isFetching: false,
          hasMore: false,
        })
      }
      this.setState(prevState => ({
        ...prevState,
        conversations: [...prevState.conversations, ...conversations],
        isFetching: false,
      }))
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
      const response = await axios.post(`${SERVER_ADDRESS}/twilio/reply/${conversationId}`, {
        message,
      })
      const conversation = this.formatConversation(response.data)
      this.setState({ conversation, msg: '' })
    } catch (error) {
      console.log(error)
    }
  }

  markConversationRead = async conversationId => {
    try {
      const response = await axios.put(`${SERVER_ADDRESS}/twilio/conversations/${conversationId}`)
      this.updateConversations(response.data)
      const { conversations } = this.state
      const conversation = conversations.find(x => x.id === conversationId)
      this.setState({ activeId: conversationId, conversation })
    } catch (error) {
      console.log(error)
    }
  }

  addContactToDoNotCall = async contactId => {
    const response = await axios(`${SERVER_ADDRESS}/contacts/setStatus/${contactId}`, {
      method: 'PUT',
      data: { status: 'DO NOT CALL' },
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    const contact = response.data
    const { conversations, conversation } = this.state
    const index = conversations.findIndex(x => x.contactId === contact._id)
    if (index !== -1) {
      conversations[index].contactStatus = contact.status
      this.setState({
        conversations,
        conversation:
          conversation.id === conversations[index].id ? conversations[index] : conversation,
      })
    }
  }

  render() {
    const { activeId, conversations, conversation, msg, isFetching } = this.state
    const { name, messages, avatar, to, from, contactStatus, contactId } = conversation
    return (
      <div>
        <Helmet title="Apps: Messaging" />
        <div className="air__utils__heading">
          <h5>Messages</h5>
        </div>
        <div className="row">
          <div className="col-12 col-md-5">
            <div className="mb-4">
              <Input
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search users..."
              />
            </div>
            <div className={style.dialogs}>
              <Scrollbars
                onScrollFrame={this.handleScroll}
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
                    hidden={!item.unread}
                    className={`${style.item} ${style.unread} ${
                      item.id === activeId ? style.current : ''
                    } d-flex flex-nowrap align-items-center`}
                    style={{ backgroundColor: item.unread ? '#46be8a' : '#ffffff' }}
                  >
                    <div className="air__utils__avatar air__utils__avatar--size46 mr-3 flex-shrink-0">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                    <div className={`${style.info} flex-grow-1`}>
                      <div className="text-uppercase font-size-12 text-truncate text-gray-6">
                        {item.address}
                      </div>
                      <div className="text-dark font-size-16 font-weight-normal text-truncate">
                        {item.name} -{' '}
                        {item.messages[item.messages.length - 1].content.substring(0, 100)}
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
                {isFetching && <div className="text-center">Loading...</div>}
              </Scrollbars>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="card mb-0">
              <div className="card-header card-header-flex align-items-center">
                <div className="d-flex flex-column justify-content-center mr-auto">
                  <h5 className="mb-0 mr-2 font-size-18">
                    {name} {to} <br />
                    <span className="font-size-14 text-gray-6">{from}</span>
                  </h5>
                </div>
                <div>
                  <Tooltip placement="top" title="View Original Message">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light mr-2">
                      <i className="fe fe-eye" />
                    </a>
                  </Tooltip>
                  <Tooltip placement="top" title="Voice Mail Received">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light mr-2">
                      <i className="fe fe-phone-call" />
                    </a>
                  </Tooltip>
                  <Tooltip placement="top" title="Do Not Call">
                    <button
                      className="btn btn-light btn-sm mr-2"
                      type="button"
                      // disabled={contactStatus === 'DO NOT CALL'}
                      onClick={() => this.addContactToDoNotCall(contactId)}
                    >
                      <i
                        className="fe fe-thumbs-down"
                        style={{ color: contactStatus === 'DO NOT CALL' && 'red' }}
                      />
                    </button>
                  </Tooltip>
                  <Tooltip placement="top" title="Qualify Lead">
                    <a href="javascript: void(0);" className="btn btn-sm btn-light">
                      <i className="fe fe-thumbs-up" />
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
                                message.owner !== 'you' ? avatar : 'resources/images/avatars/1.jpg'
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
