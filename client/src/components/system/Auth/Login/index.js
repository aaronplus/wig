import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props

    return (
      <div className={style.auth}>
        <div className="pb-5 d-flex align-items-end mt-auto">
          <img src="resources/images/logo.png" alt="Thapp" width="100px" />
        </div>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('email', {
                initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                initialValue: 'mediatec',
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" type="password" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="text-center btn btn-success w-100 font-weight-bold font-size-18"
              htmlType="submit"
              loading={loading}
            >
              Log In
            </Button>
          </Form>
          <div className="text-center">
            <Link to="/system/forgot-password" className="text-blue font-weight-bold font-size-18">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="mt-auto pb-5 pt-5">
          <div className="text-gray-4 text-center">© 2019 Company Name. All rights reserved.</div>
        </div>
      </div>
    )
  }
}

export default Login
