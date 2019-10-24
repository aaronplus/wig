import React from 'react'
import { Helmet } from 'react-helmet'
import { Tabs } from 'antd'
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import Chart1 from 'components/widgets/Charts/1'
import Chart5 from 'components/widgets/Charts/5'
import Chart6 from 'components/widgets/Charts/6'
import General5 from 'components/widgets/General/5'
import General7 from 'components/widgets/General/7'
import General12 from 'components/widgets/General/12'
import List3 from 'components/widgets/Lists/3'
import List6 from 'components/widgets/Lists/6'
import List15 from 'components/widgets/Lists/15'
import data from './data.json'

const { TabPane } = Tabs

const chartOptions = {
  fullWidth: !0,
  chartPadding: {
    right: 15,
    left: -15,
  },
  low: 0,
  showArea: true,
  plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
}

class DashboardCrypto extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Dashboard: Crypto" />
        <div className="air__utils__heading">
          <h5>Dashboard: Crypto</h5>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-12">
            <div className="card">
              <Tabs className="air-tabs-bordered pt-2" defaultActiveKey="3">
                <TabPane tab={<span className="text-uppercase">Hour</span>} key="1" />
                <TabPane tab={<span className="text-uppercase">Day</span>} key="2" />
                <TabPane tab={<span className="text-uppercase">Week</span>} key="3" />
                <TabPane tab={<span className="text-uppercase">Month</span>} key="4" />
              </Tabs>
              <div className="card-body">
                <ChartistGraph
                  className="height-300 position-relative"
                  data={data}
                  options={chartOptions}
                  type="Line"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <General7 />
                  </div>
                </div>
                <div className="card">
                  <Chart6 />
                </div>
                <div className="card">
                  <div className="card-body">
                    <General5 />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <List3 />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <General12 />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <Chart5 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="text-dark mb-0">Cryptocurrencies</h5>
              </div>
              <div className="card-body">
                <List6 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <List15 />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Chart1 />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardCrypto
