import React from 'react'

class ProgressBar extends React.Component {
  render() {
    const{ data:{total, index} } = this.props;
    const percentage = Math.ceil((index/total)*100);
    console.log(percentage,"percentage");
    return (
      <div>
        <div className="d-flex mb-1">
          <div className="text-dark text-uppercase font-weight-bold mr-auto">Import In Progress</div>
          <div className="text-gray-6">{total} Records</div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{
              width: `${percentage}%`,
            }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    )
  }
}

export default ProgressBar
