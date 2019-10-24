import React from 'react'
import { Helmet } from 'react-helmet'
import { data } from './data.json'

class UIKitBootstrap extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Bootstrap Components" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Bootstrap Components</span>
            <a
              href="https://ant.design/docs/react/introduce"
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-sm btn-light"
            >
              Official Documentation
              <i className="fe fe-corner-right-up" />
            </a>
          </h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              {data.map(item => (
                <div key={Math.random()} className="col-md-6">
                  <div className="mb-4">
                    <h5 className="text-black mb-2">
                      <strong>{item.name}</strong>
                    </h5>
                    {item.description}{' '}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="air__utils__link air__utils__link__underlined"
                    >
                      Examples
                      <small>
                        <i className="icmn-link ml-1" />
                      </small>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UIKitBootstrap
