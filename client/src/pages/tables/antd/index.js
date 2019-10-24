import React from 'react'
import { Helmet } from 'react-helmet'
import TablesAntBasic from './examples/basic'
import TablesAntdRowSelection from './examples/row-selection'
import TablesAntdFilterSorter from './examples/filter-sorter'
import TablesAntdCustomFilter from './examples/custom-filter'
import TablesAntdExpandableRow from './examples/expandable-row'
import TablesAntdFixed from './examples/fixed-header-columns'
import TablesAntdResizable from './examples/resizable'

class TablesAntd extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Tables: Antd" />
        <div className="air__utils__heading">
          <h5>
            <span className="mr-3">Tables: Antd</span>
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
              <strong>Basic Usage</strong>
            </h4>
            <TablesAntBasic />
            <h4 className="mb-4">
              <strong>Row Selection</strong>
            </h4>
            <TablesAntdRowSelection />
            <h4 className="mb-4">
              <strong>Filter and Sorter</strong>
            </h4>
            <TablesAntdFilterSorter />
            <h4 className="mb-4">
              <strong>Custom Filter Panel</strong>
            </h4>
            <TablesAntdCustomFilter />
            <h4 className="mb-4">
              <strong>Expandable Row</strong>
            </h4>
            <TablesAntdExpandableRow />
            <h4 className="mb-4">
              <strong>Fixed Header and Columns</strong>
            </h4>
            <TablesAntdFixed />
            <h4 className="mb-4">
              <strong>Resizable column</strong>
            </h4>
            <TablesAntdResizable />
          </div>
        </div>
      </div>
    )
  }
}

export default TablesAntd
