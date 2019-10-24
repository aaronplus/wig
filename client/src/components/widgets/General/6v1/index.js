import React from 'react'
import style from './style.module.scss'

class General6v1 extends React.Component {
  render() {
    return (
      <div className={`${style.container} pt-3`}>
        <div className={`${style.status} bg-success`} />
        <div className="d-flex flex-nowrap align-items-center pb-3 pl-4 pr-4">
          <div className="mr-auto">
            <div className="text-uppercase font-weight-bold font-size-24 text-dark">+$10,264</div>
            <div className="font-size-18">4512-XXXX-1678-7528</div>
          </div>
          <div className="ml-1 text-success">
            <i className="fe fe-arrow-left-circle font-size-40" />
          </div>
        </div>
        <div className="py-3 bg-gray-1 pl-4">From Tesla Cars, Inc</div>
      </div>
    )
  }
}

export default General6v1
