import React from 'react'
import styles from './style.module.scss'

class SubBar extends React.Component {
  render() {
    return (
      <div className={styles.subbar}>
        <ul className={`${styles.breadcrumbs} mr-4`}>
          <li className={styles.breadcrumb}>
            <a href="#" className={styles.breadcrumbLink}>
              Main
            </a>
          </li>
          <li className={styles.breadcrumb}>
            <a href="#" className={`${styles.breadcrumbLink} ${styles.breadcrumbLink__current}`}>
              Dashboard
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-primary btn-with-addon mr-auto text-nowrap d-none d-md-block"
        >
          <span className="btn-addon">
            <i className="btn-addon-icon fe fe-plus-circle" />
          </span>
          IMPORT
        </button>
        <div className={`${styles.amount} mr-3 ml-auto d-none d-sm-flex`}>
          <p className={styles.amountText}>
            SMS This month
            <span className={styles.amountValue}>251,900</span>
          </p>
          <div className={styles.amountGraph}>
            <i className={styles.amountGraphItem} style={{ height: '80%' }} />
            <i className={styles.amountGraphItem} style={{ height: '50%' }} />
            <i className={styles.amountGraphItem} style={{ height: '70%' }} />
            <i className={styles.amountGraphItem} style={{ height: '60%' }} />
            <i className={styles.amountGraphItem} style={{ height: '50%' }} />
            <i className={styles.amountGraphItem} style={{ height: '65%' }} />
          </div>
        </div>
        <div className={`${styles.amount} d-none d-sm-flex`}>
          <p className={styles.amountText}>
            Last month
            <span className={styles.amountValue}>256,120</span>
          </p>
          <div className={styles.amountGraph}>
            <i className={styles.amountGraphItem} style={{ height: '60%' }} />
            <i className={styles.amountGraphItem} style={{ height: '65%' }} />
            <i className={styles.amountGraphItem} style={{ height: '75%' }} />
            <i className={styles.amountGraphItem} style={{ height: '55%' }} />
            <i className={styles.amountGraphItem} style={{ height: '100%' }} />
            <i className={styles.amountGraphItem} style={{ height: '85%' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default SubBar
