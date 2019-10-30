import React from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Slider, Checkbox, Radio, Select, DatePicker, TimePicker } from 'antd'

import timezones from '../../../assets/timezones.json'

const { Option } = Select

@Form.create()
class CreateSchedule extends React.Component {
  state = {
    confirmDirty: false,
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
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { form } = this.props
    console.log('Timezones: ', timezones)

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
            <Form {...formItemLayout} labelAlign="left">
              <Form.Item label="Select Campaign">
                {form.getFieldDecorator('campaign', {
                  rules: [{ message: 'Please select target campaign!' }],
                })(
                  <Select placeholder="Select target campaign" onChange={this.handleSelectChange}>
                    <Option value="campaign">Campaign Title</Option>
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
              <Form.Item label="Limit">
                {form.getFieldDecorator('limit', {
                  initialValue: 3000,
                })(<Slider tooltipVisible marks={marks} max={10000} />)}
              </Form.Item>
              <Form.Item label="Start Date">
                {form.getFieldDecorator('startDate', {
                  rules: [{ message: 'Please select start date!' }],
                })(<DatePicker onChange={e => console.log(e.currentTarget.value)} />)}
              </Form.Item>
              <Form.Item label="Start Time">
                {form.getFieldDecorator('startTime', {
                  rules: [{ message: 'Please select start time!' }],
                })(<TimePicker />)}
              </Form.Item>
              <Form.Item label="End Date">
                {form.getFieldDecorator('endDate', {
                  rules: [{ message: 'Please select end date!' }],
                })(<DatePicker onChange={e => console.log(e.currentTarget.value)} />)}
              </Form.Item>
              <Form.Item label="End Time">
                {form.getFieldDecorator('endTime', {
                  rules: [{ message: 'Please select end time!' }],
                })(<TimePicker />)}
              </Form.Item>
              <Form.Item label="Days">
                {form.getFieldDecorator('monday')(
                  <Checkbox checked className="text-uppercase">
                    Monday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('tuesday')(
                  <Checkbox checked className="text-uppercase">
                    Tuesday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('wednesday')(
                  <Checkbox checked className="text-uppercase">
                    Wednesday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('thursday')(
                  <Checkbox checked className="text-uppercase">
                    Thursday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('friday')(
                  <Checkbox checked className="text-uppercase">
                    Friday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('saturday')(
                  <Checkbox checked className="text-uppercase">
                    Saturday
                  </Checkbox>,
                )}
                {form.getFieldDecorator('sunday')(
                  <Checkbox checked className="text-uppercase" Monday>
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
                      <Option value="tamp1">Template 1</Option>
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
