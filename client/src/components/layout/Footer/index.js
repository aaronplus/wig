import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Footer extends React.Component {
  render() {
    const {
      settings: { isContentNoMaxWidth },
    } = this.props
    return (
      <div
        className={classNames(style.footer, {
          [style.footerFullWidth]: isContentNoMaxWidth,
        })}
      >
        <div className={style.inner}>
          <div className="row">
            <div className="col-md-8">
              <p>
                <strong>Air UI Admin Template - Best Solution for Your Next Big App!</strong>
              </p>
              <p>
                Air UI is a set of modern professional Html / React / Vue and Angular based
                templates. This is a powerful and super flexible tool, which suits best for any kind
                of web application: Web Sites, Web Applications, Hybrid Apps, CRM, CMS, Admin
                Panels, etc.
              </p>
              <p>&copy; 2019 Mediatec Software</p>
            </div>
            <div className="col-md-4">
              <div className={style.logo}>
                <img src="resources/images/air-logo.png" alt="Air UI" />
                <div className={style.logoName}>AIR UI</div>
                <div className={style.logoDescr}>Admin Template</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
