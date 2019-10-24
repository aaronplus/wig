import React from 'react'
import { Helmet } from 'react-helmet'
import Chart1 from 'components/widgets/Charts/1'
import Chart2 from 'components/widgets/Charts/2'
import Chart5 from 'components/widgets/Charts/5'
import Chart9 from 'components/widgets/Charts/9'
import Chart10 from 'components/widgets/Charts/10'
import List12 from 'components/widgets/Lists/12'
import List15 from 'components/widgets/Lists/15'

class DashboardAnalytics extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        <div className="air__utils__heading">
          <h5>Dashboard: Analytics</h5>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <h5 className="text-dark mb-4">Google Analytics Home</h5>
            <div className="card">
              <Chart2 />
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <Chart9 />
                  </div>
                </div>
                <h5 className="text-dark mb-4">How do you acquire users?</h5>
                <div className="card">
                  <div className="card-body">
                    <Chart5 />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <Chart10 />
                  </div>
                </div>
                <h5 className="text-dark mb-4">How are your active users trending over time?</h5>
                <div className="card">
                  <div className="card-body">
                    <Chart1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <h5 className="text-dark mb-4">Ask analytics Intelligence</h5>
            <div className="card">
              <div className="card-body">
                <List15 />
              </div>
            </div>
            <h5 className="text-dark mb-4">What are your top devices?</h5>
            <div className="card">
              <div className="card-body">
                <List12 />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardAnalytics
