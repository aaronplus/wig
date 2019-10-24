import React from 'react'
import { Helmet } from 'react-helmet'
import TablesBootstrapBasic from './examples/basic'
import TablesBootstrapBordered from './examples/bordered'
import TablesBootstrapBorderless from './examples/borderless'
import TablesBootstrapDark from './examples/dark'
import TablesBootstrapHover from './examples/hover'
import TablesBootstrapResponsive from './examples/responsive'
import TablesBootstrapSmall from './examples/small'
import TablesBootstrapStriped from './examples/striped'

class TablesBootstrap extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Tables: Bootstrap" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Tables: Bootstrap</span>
            <a
              href="https://ant.design/components/table"
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
            <h4 className="mb-4">
              <strong>Basic</strong>
            </h4>
            <TablesBootstrapBasic />
            <h4 className="mb-4">
              <strong>Dark table</strong>
            </h4>
            <TablesBootstrapDark />
            <h4 className="mb-4">
              <strong>Striped rows</strong>
            </h4>
            <TablesBootstrapStriped />
            <h4 className="mb-4">
              <strong>Bordered table</strong>
            </h4>
            <TablesBootstrapBordered />
            <h4 className="mb-4">
              <strong>Borderless table</strong>
            </h4>
            <TablesBootstrapBorderless />
            <h4 className="mb-4">
              <strong>Hoverable rows</strong>
            </h4>
            <TablesBootstrapHover />
            <h4 className="mb-4">
              <strong>Small table</strong>
            </h4>
            <TablesBootstrapSmall />
            <h4 className="mb-4">
              <strong>Responsive table</strong>
            </h4>
            <TablesBootstrapResponsive />
          </div>
        </div>
      </div>
    )
  }
}

export default TablesBootstrap
