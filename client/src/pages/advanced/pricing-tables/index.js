import React from 'react'
import style from './style.module.scss'

class SystemPricingTables extends React.Component {
  render() {
    return (
      <div>
        <div className="air__utils__heading">
          <h5>Pricing Tables</h5>
        </div>
        <div className="mb-5 pt-5">
          <div className={`${style.separated} d-flex flex-wrap`}>
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-inbox font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Free Plan</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $0 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>10GB of Bandwidth</li>
                <li>200MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>256MB Memory</li>
                <li>1 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-cpu font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Standart</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $49 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>20GB of Bandwidth</li>
                <li>400MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>512MB Memory</li>
                <li>2 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-hard-drive font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Premium</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $99 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>50GB of Bandwidth</li>
                <li>1GB Max File Size</li>
                <li>3GHZ CPU</li>
                <li>4096MB Memory</li>
                <li>8 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
          </div>
        </div>
        <div className="mb-5 pt-5">
          <div className="d-flex flex-wrap">
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-inbox font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Free Plan</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $0 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>10GB of Bandwidth</li>
                <li>200MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>256MB Memory</li>
                <li>1 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div className="air__pricingTable__item pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1 bg-gray-1">
              <i className="fe fe-cpu font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Standart</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $49 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>20GB of Bandwidth</li>
                <li>400MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>512MB Memory</li>
                <li>2 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-hard-drive font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Premium</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $99 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>50GB of Bandwidth</li>
                <li>1GB Max File Size</li>
                <li>3GHZ CPU</li>
                <li>4096MB Memory</li>
                <li>8 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
          </div>
        </div>
        <div className="mb-5 pt-5">
          <div className="d-flex flex-wrap">
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-inbox font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Free Plan</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $0 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>10GB of Bandwidth</li>
                <li>200MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>256MB Memory</li>
                <li>1 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div
              className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center bg-primary text-white flex-grow-1`}
            >
              <i className="fe fe-cpu font-size-80 mb-3 d-block" />
              <div className="font-weight-bold font-size-36">Standart</div>
              <div className="font-weight-bold font-size-48 mb-3">
                $49 <span className="align-text-top font-size-28">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>20GB of Bandwidth</li>
                <li>400MB Max File Size</li>
                <li>2GHZ CPU</li>
                <li>512MB Memory</li>
                <li>2 GB Storage</li>
              </ul>
              <a className="btn text-blue width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
            <div className={`${style.item} pt-5 pb-5 pl-5 pr-5 text-center flex-grow-1`}>
              <i className="fe fe-hard-drive font-size-80 mb-3 d-block" />
              <div className="text-dark font-weight-bold font-size-36">Premium</div>
              <div className="text-dark font-weight-bold font-size-48 mb-3">
                $99 <span className="align-text-top font-size-28 text-gray-6">/mo</span>
              </div>
              <ul className="list-unstyled font-size-18 mb-5">
                <li>50GB of Bandwidth</li>
                <li>1GB Max File Size</li>
                <li>3GHZ CPU</li>
                <li>4096MB Memory</li>
                <li>8 GB Storage</li>
              </ul>
              <a className="btn btn-primary width-100" href="javascript: void(0);">
                Get Access
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SystemPricingTables
