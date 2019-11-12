import React from 'react'

function ProgressBar({ campaign = {} }) {
  console.log('Campaign ', campaign)
  const index = ((campaign.sent + campaign.delivered + campaign.failed) * 100) / campaign.total
  return (
    <div>
      <div className="d-flex mb-1">
        <div className="text-dark text-uppercase font-weight-bold mr-auto">{campaign.name}</div>
        <div className="text-gray-6">{campaign.total} Contacts</div>
      </div>
      <div className="progress">
        <div
          className="progress-bar bg-success"
          style={{
            width: `${index}%`,
          }}
          role="progressbar"
          aria-valuenow={index}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

export default ProgressBar
