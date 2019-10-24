import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/layout/Loader'
import PublicLayout from './Public'
import AuthLayout from './Auth'
import AppLayout from './App'

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  app: AppLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class Layout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/system(?=\/|$)/i.test(pathname)) {
        return 'auth'
      }
      return 'app'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized = user.authorized
    const isUserLoading = user.loading
    const isAuthLayout = getLayout() === 'auth'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
        return <Loader />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isAuthLayout && !isUserAuthorized) {
        return <Redirect to="/system/login" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Air UI React | %s" title="React Admin Template" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default Layout
