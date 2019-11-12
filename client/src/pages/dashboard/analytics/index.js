import React from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import socketIO from 'socket.io-client'
// import moment from 'moment'
import { SERVER_ADDRESS } from 'config/constants'

import CampaignProgress from './CampaignProgress'

class DashboardAnalytics extends React.Component {
  state = {
    dataSource: [],
  }

  componentDidMount() {
    this.getSchedules()
    const socket = socketIO(SERVER_ADDRESS, { forceNew: true })
    socket.on('status_update', data => {
      const { dataSource } = this.state
      const index = dataSource.findIndex(ds => ds._id === data.schedule_id)
      if (index !== -1) {
        dataSource[index].status = data.status
        this.setState({ dataSource })
      }
      // console.log('Status Updated', data, index, dataSource)
    })
  }

  getSchedules = async () => {
    const response = await axios(`${SERVER_ADDRESS}/schedule/all`, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    const schedules = response.data.map(ds => {
      const result = { _id: ds._id }
      result.name = ds.campaign ? ds.campaign.campaign : 'Campaign Name missing'
      result.totalContacts = ds.totalContacts
      result.totalPhoneNumbers = ds.totalPhoneNumbers
      result.status = ds.status
      return result
    })
    this.setState({ dataSource: schedules })
  }

  render() {
    const { dataSource } = this.state
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
        {dataSource.map(campaign => (
          <CampaignProgress key={campaign._id} campaign={campaign} />
        ))}
      </div>
    )
  }
}

export default DashboardAnalytics
