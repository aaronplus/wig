import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar } from 'antd'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  render() {
    const { user } = this.props
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>Hello, {user.name || 'Anonymous'}</strong>
          <div>
            <strong className="mr-1">Billing Plan: </strong>
            Professional
          </div>
          <div>
            <strong>Role: </strong>
            {user.role}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>Email: </strong>
            {user.email}
            <br />
            <strong>Phone: </strong>
            {user.phone}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);">
            <i className={`${styles.menuIcon} fe fe-user`} />
            Edit Profile
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.logout}>
            <i className={`${styles.menuIcon} fe fe-log-out`} />
            Logout
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
