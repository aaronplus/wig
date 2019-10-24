import React from 'react'
import { Helmet } from 'react-helmet'
import Table1 from 'components/widgets/Tables/1'
import Table2 from 'components/widgets/Tables/2'
import Table3 from 'components/widgets/Tables/3'
import Table4 from 'components/widgets/Tables/4'
import Table5 from 'components/widgets/Tables/5'
import Table6 from 'components/widgets/Tables/6'
import Table7 from 'components/widgets/Tables/7'

class WidgetsTables extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Widgets Tables" />
        <div className="air__utils__heading">
          <h5>Widgets Tables</h5>
        </div>
        <div className="mb-5">
          <div className="row">
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Table1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Table2 />
                </div>
              </div>
              <div className="card">
                <Table3 />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Table4 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Table5 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Table6 />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Table7 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WidgetsTables
