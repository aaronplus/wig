import React from 'react'
import { Helmet } from 'react-helmet'
import Chart1 from 'components/widgets/Charts/1'
import Chart2 from 'components/widgets/Charts/2'
import Chart3 from 'components/widgets/Charts/3'
import Chart4 from 'components/widgets/Charts/4'
import Chart4v1 from 'components/widgets/Charts/4v1'
import Chart4v2 from 'components/widgets/Charts/4v2'
import Chart4v3 from 'components/widgets/Charts/4v3'
import Chart5 from 'components/widgets/Charts/5'
import Chart6 from 'components/widgets/Charts/6'
import Chart7 from 'components/widgets/Charts/7'
import Chart8 from 'components/widgets/Charts/8'
import Chart9 from 'components/widgets/Charts/9'
import Chart10 from 'components/widgets/Charts/10'

class WidgetsCharts extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Widgets Charts" />
        <div className="air__utils__heading">
          <h5>Widgets Charts</h5>
        </div>
        <div className="mb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart1 />
                </div>
              </div>
              <div className="card">
                <Chart2 />
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart9 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Chart5 />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart10 />
                </div>
              </div>
              <div className="card">
                <Chart6 />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart3 />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <Chart4 />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <Chart4v1 />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <Chart4v2 />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <Chart4v3 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <Chart7 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Chart8 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WidgetsCharts
