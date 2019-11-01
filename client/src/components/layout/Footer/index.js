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
            <div className="col-md-12">
              <p>&copy; 2019 Three-Point-O</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
