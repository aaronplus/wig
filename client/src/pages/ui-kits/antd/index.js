import React from 'react'
import { Helmet } from 'react-helmet'
import { data } from './data.json'

class UIKitAntd extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Ant Design Components" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Ant Design Components</span>
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
        <div className="row">
          {data.map(category => (
            <div className="col-lg-12" key={category.name}>
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">
                    <strong>{category.name}</strong>
                  </h4>
                  <div className="row">
                    {category.items.map(item => (
                      <div className="col-md-6" key={item.name}>
                        <div className="mb-3">
                          <h5 className="text-black mb-2">
                            <strong>{item.name}</strong>
                          </h5>
                          <div>
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default UIKitAntd
