import React from 'react'
import style from './style.module.scss'

class List7 extends React.Component {
  render() {
    return (
      <div>
        <ul className={`${style.list} list-unstyled`}>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--gray-2 air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>Payment Received</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--success air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>Account Activated</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--danger air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>User Deleted</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--gray-2 air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>Message Received</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--info air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>Account Activated</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
          <li className={style.item}>
            <a href="javascript: void(0);" className={style.itemLink}>
              <div className={style.itemMeta}>
                <div className="air__utils__donut air__utils__donut--gray-2 air__utils__donut--md" />
              </div>
              <div className="mr-3">
                <div>Account Activated</div>
                <div className="text-muted">Mary has approved your quote.</div>
              </div>
              <div className={style.itemAction}>
                <span />
                <span />
              </div>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default List7
