import React from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
// import moment from 'moment'
import { SERVER_ADDRESS } from 'config/constants'

import CampaignProgress from './CampaignProgress'

class DashboardAnalytics extends React.Component {
  state = {
    dataSource: [],
  }

  componentDidMount() {
    this.getSchedules()
  }

  getSchedules = async () => {
    const response = await axios(`${SERVER_ADDRESS}/schedule/all/status`, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    console.log('Schedules: ', response.data)
    const schedules = response.data.map(ds => {
      console.log('ds', ds)
      const result = {}
      result.name = ds.campaign ? ds.campaign.campaign : 'Campaign Name missing'
      result.total = ds.total
      result.sent =
        ds.sentMessagesStatus && ds.sentMessagesStatus.message_status
          ? ds.sentMessagesStatus.message_status.filter(ms => ms.status === 'sent').length
          : 0
      result.delivered =
        ds.sentMessagesStatus && ds.sentMessagesStatus.message_status
          ? ds.sentMessagesStatus.message_status.filter(ms => ms.status === 'delivered').length
          : 0
      result.failed =
        ds.sentMessagesStatus && ds.sentMessagesStatus.message_status
          ? ds.sentMessagesStatus.message_status.filter(ms => ms.status === 'failed').length
          : 0
      return result
    })
    this.setState({ dataSource: schedules })
  }

  render() {
    const { dataSource } = this.state
    console.log(dataSource)
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        {dataSource.map(campaign => (
          <CampaignProgress key={campaign.name} campaign={campaign} />
        ))}
      </div>
    )
  }
}

export default DashboardAnalytics
