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
      </div>
    )
  }
}

export default SubBar
