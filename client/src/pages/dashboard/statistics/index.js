import React from 'react'
import { Helmet } from 'react-helmet'
import General1 from 'components/widgets/General/1'
import General2 from 'components/widgets/General/2'
import General2v1 from 'components/widgets/General/2v1'
import General2v2 from 'components/widgets/General/2v2'
import General12v3 from 'components/widgets/General/12v3'
import General13v1 from 'components/widgets/General/13v1'
import Chart9 from 'components/widgets/Charts/9'
import Chart6 from 'components/widgets/Charts/6'
import Chart10 from 'components/widgets/Charts/10'
import List11 from 'components/widgets/Lists/11'
import List18 from 'components/widgets/Lists/18'
import Table4 from 'components/widgets/Tables/4'
import Table5 from 'components/widgets/Tables/5'
import Table7 from 'components/widgets/Tables/7'

class DashboardStatistics extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Dashboard: Statistics" />
        <div className="air__utils__heading">
          <h5>Dashboard: Statistics</h5>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-12">
            <div className="card">
              <div className="card-body">
                <General2 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Chart9 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Chart10 />
              </div>
            </div>
            <div className="card">
              <div className="card-body bg-gray-2">
                <General12v3 />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div className="card">
              <div className="card-body">
                <General2v1 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <General1 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <List18 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <List11 />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div className="card">
              <div className="card-body">
                <General2v2 />
              </div>
            </div>
            <div className="card">
              <General13v1 />
            </div>
            <div className="card">
              <Chart6 />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <Table7 />
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6">
            <div className="card">
              <div className="card-body">
                <Table5 />
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-xl-6">
            <div className="card">
              <div className="card-body">
                <Table4 />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardStatistics
