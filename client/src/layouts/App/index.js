import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from 'components/layout/TopBar'
import SubBar from 'components/layout/SubBar'
import MenuLeft from 'components/layout/MenuLeft'
import MenuTop from 'components/layout/MenuTop'
import Footer from 'components/layout/Footer'
import Sidebar from 'components/layout/Sidebar'
import SupportChat from 'components/layout/SupportChat'

const mapStateToProps = ({ settings }) => ({ settings })

@withRouter
@connect(mapStateToProps)
class AppLayout extends React.PureComponent {
  render() {
    const {
      children,
      settings: {
        menuLayoutType,
        isContentNoMaxWidth,
        isAppMaxWidth,
        isGrayBackground,
        isSquaredBorders,
        isCardShadow,
        isBorderless,
        isTopbarFixed,
        isGrayTopbar,
      },
    } = this.props

    return (
      <Layout
        className={classNames({
          air__layout__contentNoMaxWidth: isContentNoMaxWidth,
          air__layout__appMaxWidth: isAppMaxWidth,
          air__layout__grayBackground: isGrayBackground,
          air__layout__squaredBorders: isSquaredBorders,
          air__layout__cardsShadow: isCardShadow,
          air__layout__borderless: isBorderless,
        })}
      >
        <Sidebar />
        <SupportChat />
        {menuLayoutType === 'left' && <MenuLeft />}
        {menuLayoutType === 'top' && <MenuTop />}
        <Layout>
          <Layout.Header
            className={classNames('air__layout__header', {
              air__layout__fixedHeader: isTopbarFixed,
              air__layout__headerGray: isGrayTopbar,
            })}
          >
            <TopBar />
            <SubBar />
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative' }}>
            <div className="air__utils__content">{children}</div>
          </Layout.Content>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
