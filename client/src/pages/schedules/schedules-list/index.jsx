import React from 'react'
// import { connect } from 'react-redux'
import { Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { SERVER_ADDRESS } from 'config/constants'

// const mapStateToProps = ({ contacts }) => ({ contacts })
// @connect(mapStateToProps)
class SchedulesList extends React.Component {
  state = {
    dataSource: [],
  }

  componentDidMount() {
    this.getSchedules()
  }

  getSchedules = async () => {
    const response = await axios(`${SERVER_ADDRESS}/schedule/all`, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    })
    console.log('Schedules: ', response.data)
    const schedules = response.data.map(schedule => ({
      key: schedule._id,
      campaign: schedule.campaign.campaign,
      type: schedule.type,
      startDateTime: `${moment(schedule.start_date).format(
        'DD-MM-YYYY',
      )} - ${schedule.start_time.substring(0, 5)}`,
      endDateTime: `${moment(schedule.end_date).format(
        'DD-MM-YYYY',
      )} - ${schedule.end_time.substring(0, 5)}`,
      dailyLimit: schedule.day_limit,
      sent: schedule.sent,
      status: 'Pending Feature',
    }))
    this.setState({ dataSource: schedules })
  }

  render() {
    const { dataSource } = this.state
    const columns = [
      {
        title: 'Campaign',
        dataIndex: 'campaign',
        key: 'campaign',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Start Date/Time',
        dataIndex: 'startDateTime',
        key: 'startDateTime',
      },
      {
        title: 'End Date/Time',
        dataIndex: 'endDateTime',
        key: 'endDateTime',
      },
      {
        title: 'Daily Limit',
        dataIndex: 'dailyLimit',
        key: 'dailyLimit',
      },
      {
        title: 'Sent',
        dataIndex: 'sent',
        key: 'sent',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    ]

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <div className="air__utils__heading">
              <h5>Schedules List</h5>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="mb-3 text-right">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled row">
                    <li className="text-muted col-md-6 text-left">
                      <div>
                        <div className="text-nowrap d-inline-block">
                          <div className="air__utils__donut air__utils__donut--success" />
                          <span className="font-weight-bold text-gray-6">
                            {dataSource.length}
                            <span className="font-weight-light"> schedules</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-4 air__utils__scrollTable">
              <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: '100%' }}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SchedulesList
