import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

@Form.create()
class Register extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
      }
    })
  }

  render() {
    const { form } = this.props

    return (
      <div className={style.auth}>
        <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
          <img src="resources/images/air-logo.png" alt="AIR UI Logo" />
          <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              AIR UI
            </div>
            <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
              Admin template
            </div>
          </div>
        </div>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
          <div className="text-dark font-size-30 mb-4 text-center">Sign Up</div>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'Please input your full name' }],
              })(<Input size="large" placeholder="Full Name" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="button"
              htmlType="submit"
              size="large"
              className="text-center btn btn-success w-100 font-weight-bold font-size-18"
            >
              Sign Up
            </Button>
          </Form>
          <Link
            to="/system/register"
            className={`${style.googleSign} font-weight-bold font-size-18 text-dark btn btn-outline-light w-100 mb-3`}
            style={{ backgroundImage: 'url(resources/images/icons/google-logo.svg)' }}
          >
            Sign up with Google
          </Link>
          <div className="font-size-18 text-center">
            <span className="mr-1">By signing up, you agree to the</span>
            <a href="javascript: void(0);" className="text-blue font-weight-bold font-size-18 mr-1">
              Terms of Service
            </a>{' '}
            and
            <a href="javascript: void(0);" className="text-blue font-weight-bold font-size-18 ml-1">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-center font-size-18 pt-4 mb-auto">
          <span className="mr-2">Already have an account?</span>
          <Link to="/system/login" className="font-weight-bold text-blue text-underlined">
            <u>Log In</u>
          </Link>
        </div>
        <div className="mt-auto pb-5 pt-5">
          <ul
            className={`${style.footerNav} list-unstyled d-flex mb-2 flex-wrap justify-content-center`}
          >
            <li>
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li>
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li>
              <a href="javascript: void(0);">Support</a>
            </li>
            <li>
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
          <div className="text-gray-4 text-center">© 2019 Mediatec. All rights reserved.</div>
        </div>
      </div>
    )
  }
}

export default Register
