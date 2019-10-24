import React from 'react'
import style from './style.module.scss'

class List17 extends React.Component {
  render() {
    return (
      <ul className="list-unstyled">
        <li className={style.item}>
          <div className={`${style.separator} bg-success mr-3`} />
          <label
            htmlFor="checkbox-1"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" defaultChecked="checked" id="checkbox-1" />
            <span className="air__utils__control__indicator" />
            <div className="d-inline-block">
              <div>Payment Received</div>
              <div className="text-muted">From themeforest</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} bg-primary mr-3`} />
          <label
            htmlFor="checkbox-2"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" defaultChecked="checked" id="checkbox-2" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Payment Approved</div>
              <div className="text-muted">From themeforest</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} mr-3`} />
          <label
            htmlFor="checkbox-3"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" id="checkbox-3" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Payment Received</div>
              <div className="text-muted">From Paypal</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} bg-danger mr-3`} />
          <label
            htmlFor="checkbox-4"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" id="checkbox-4" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Withdrawal Failed</div>
              <div className="text-muted">From Bitcoin Address</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} bg-info mr-3`} />
          <label
            htmlFor="checkbox-5"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" id="checkbox-5" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Payment Received</div>
              <div className="text-muted">From themeforest</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} mr-3`} />
          <label
            htmlFor="checkbox-6"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" id="checkbox-6" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Payment Received</div>
              <div className="text-muted">From themeforest</div>
            </div>
          </label>
        </li>
        <li className={style.item}>
          <div className={`${style.separator} mr-3`} />
          <label
            htmlFor="checkbox-7"
            className="air__utils__control air__utils__control__checkbox mb-0"
          >
            <input type="checkbox" id="checkbox-7" />
            <span className="air__utils__control__indicator d-block" />
            <div className="d-inline-block">
              <div>Payment Received</div>
              <div className="text-muted">From themeforest</div>
            </div>
          </label>
        </li>
      </ul>
    )
  }
}

export default List17
