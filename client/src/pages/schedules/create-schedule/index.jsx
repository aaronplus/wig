import React from 'react'
import { Helmet } from 'react-helmet'
import { Alert, Form, Input, Slider, Checkbox, Radio, Select, DatePicker, TimePicker } from 'antd'
import axios from 'axios'
import moment from 'moment'
import timezones from '../../../assets/timezones.json'

const { Option } = Select

@Form.create()
class CreateSchedule extends React.Component {
  state = {
    confirmDirty: false,
    messages: [],
    campaigns: [],
    phoneNumbers: [],
    success: null,
    error: null,
  }

  componentDidMount() {
    this.getAllMessages()
    this.getAllCampaigns()
    this.getAllPhoneNumbers()
  }

  getAllMessages = async () => {
    const response = await axios('http://localhost:5000/api/messages/all', {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    this.setState({ messages: response.data })
  }

  getAllCampaigns = async () => {
    const response = await axios('http://localhost:5000/api/campaigns/all', {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    this.setState({ campaigns: response.data })
  }

  getAllPhoneNumbers = async () => {
    const response = await axios('http://localhost:5000/api/phoneNumbers/all', {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    this.setState({ phoneNumbers: response.data })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({ confirmDirty: confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state

    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios('http://localhost:5000/api/schedule/add', {
          method: 'POST',
          data: this.formatData(values),
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('jwtToken'),
          },
        })
          .then(() => {
            form.resetFields()
            this.setState({ success: 'Schedule created successfully' })
          })
          .catch(error => {
            this.setState({ error: error.message })
          })
      }
    })
  }

  formatData = data => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data
    const days = []
    if (monday) {
      days.push('Monday')
    }
    if (tuesday) {
      days.push('Tuesday')
    }
    if (wednesday) {
      days.push('Wednesday')
    }
    if (thursday) {
      days.push('Thursday')
    }
    if (friday) {
      days.push('Friday')
    }
    if (saturday) {
      days.push('Saturday')
    }
    if (sunday) {
      days.push('Sunday')
    }
    return {
      campaign: data.campaign,
      type: data.type,
      phone_number: data.phoneNumber,
      day_limit: data.day_limit,
      start_date: moment(data.startDate).format('YYYY-MM-DD'),
      end_date: moment(data.endDate).format('YYYY-MM-DD'),
      start_time: moment(data.startTime).format('HH:mm:ss'),
      end_time: moment(data.endTime).format('HH:mm:ss'),
      time_zone: data.timezone,
      message: data.msg === 'template' ? data.template : data.message,
      days,
    }
  }

  render() {
    const { form } = this.props
    const { messages, campaigns, phoneNumbers, success, error } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }

    const marks = {
      0: '0',
      1000: '1000',
      2000: '2000',
      3000: '3000',
      4000: '4000',
      5000: '5000',
      6000: '6000',
      7000: '7000',
      8000: '8000',
      9000: '9000',
      10000: '10000',
    }

    return (
      <div>
        <Helmet title="Create Campaign Schedule" />
        <div className="air__utils__heading">
          <h5>Create Campaign Schedule</h5>
        </div>
        <div className="card">
          <div className="card-body">
            {success && <Alert message={success} type="success" />}
            {error && <Alert message={error} type="error" />}
            <Form {...formItemLayout} labelAlign="left" onSubmit={this.handleSubmit}>
              <Form.Item label="Select Campaign">
                {form.getFieldDecorator('campaign', {
                  rules: [{ required: true, message: 'Please select target campaign!' }],
                })(
                  <Select placeholder="Select target campaign" onChange={this.handleSelectChange}>
                    {campaigns.map(campaign => (
                      <Option value={campaign._id}>{campaign.campaign}</Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Type">
                {form.getFieldDecorator('type', {
                  rules: [{ message: 'Please select type!' }],
                })(
                  <Select placeholder="Select type" onChange={this.handleSelectChange}>
                    <Option value="twilio">Twilio</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Select Phone Number">
                {form.getFieldDecorator('phoneNumber', {
                  rules: [{ message: 'Please select phone number!' }],
                })(
                  <Select placeholder="Select phone number" onChange={this.handleSelectChange}>
                    {phoneNumbers.map(phone => (
                      <Option value={phone._id}>{phone.phone_number}</Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Daily Limit">
                {form.getFieldDecorator('day_limit', {
                  initialValue: 3000,
                })(<Slider tooltipVisible marks={marks} max={10000} />)}
              </Form.Item>
              <Form.Item label="Start Date">
                {form.getFieldDecorator('startDate', {
                  rules: [{ type: 'object', message: 'Please select start date!' }],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label="Start Time">
                {form.getFieldDecorator('startTime', {
                  rules: [{ type: 'object', message: 'Please select start time!' }],
                })(<TimePicker />)}
              </Form.Item>
              <Form.Item label="End Date">
                {form.getFieldDecorator('endDate', {
                  rules: [{ type: 'object', message: 'Please select end date!' }],
                })(
                  <DatePicker
                    onChange={(date, dateString) => {
                      console.log(date, dateString)
                    }}
                  />,
                )}
              </Form.Item>
              <Form.Item label="End Time">
                {form.getFieldDecorator('endTime', {
                  rules: [{ type: 'object', message: 'Please select end time!' }],
                })(<TimePicker />)}
              </Form.Item>
              <Form.Item label="Days">
                {form.getFieldDecorator('monday')(
                  <Checkbox className="text-uppercase">Monday</Checkbox>,
                )}
                {form.getFieldDecorator('tuesday')(
                  <Checkbox className="text-uppercase">Tuesday</Checkbox>,
                )}
                {form.getFieldDecorator('wednesday')(
                  <Checkbox className="text-uppercase">Wednesday</Checkbox>,
                )}
                {form.getFieldDecorator('thursday')(
                  <Checkbox className="text-uppercase">Thursday</Checkbox>,
                )}
                {form.getFieldDecorator('friday')(
                  <Checkbox className="text-uppercase">Friday</Checkbox>,
                )}
                {form.getFieldDecorator('saturday')(
                  <Checkbox className="text-uppercase">Saturday</Checkbox>,
                )}
                {form.getFieldDecorator('sunday')(
                  <Checkbox className="text-uppercase" Monday>
                    Sunday
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item label="Timezone">
                {form.getFieldDecorator('timezone', {
                  rules: [{ message: 'Please select your timezone!' }],
                })(
                  <Select placeholder="Select timezone" onChange={this.handleSelectChange}>
                    {timezones.map(timezone => (
                      <Option value={timezone.utc[0]}>{timezone.text}</Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="Message">
                {form.getFieldDecorator('msg')(
                  <Radio.Group onChange={this.onChange}>
                    <Radio value="template">Template</Radio>
                    <Radio value="message">Message</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>
              {form.getFieldValue('msg') === 'message' && (
                <Form.Item label="Type Message">
                  {form.getFieldDecorator('message')(<Input placeholder="Type your message" />)}
                </Form.Item>
              )}
              {form.getFieldValue('msg') === 'template' && (
                <Form.Item label="Select Template">
                  {form.getFieldDecorator('template')(
                    <Select placeholder="Select Template" onChange={this.handleSelectChange}>
                      {messages.map(msg => (
                        <Option value={msg.message}>{msg.name}</Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              )}

              <button type="submit" className="btn btn-success px-5">
                Create Schedule
              </button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateSchedule
