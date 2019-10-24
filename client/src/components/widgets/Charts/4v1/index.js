import React from 'react'
import ChartistGraph from 'react-chartist'
import data from './data.json'

const options = {
  chartPadding: {
    right: 0,
    left: 0,
    top: 5,
    bottom: 5,
  },
  fullWidth: true,
  showPoint: false,
  lineSmooth: true,
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  showArea: false,
}

class Chart4v1 extends React.Component {
  render() {
    return (
      <div>
        <div className="font-weight-bold text-dark font-size-24">+90%</div>
        <div>Sales Rise</div>
        <ChartistGraph className="height-200" data={data} options={options} type="Line" />
      </div>
    )
  }
}

export default Chart4v1
