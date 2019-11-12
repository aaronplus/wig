import React from 'react'

function ProgressBar({ campaign = { status: { sent: 0, delivered: 0, failed: 0 } } }) {
  console.log('Campaign ', campaign)
  const { sent, delivered, failed } = campaign.status
  const index = ((sent + delivered + failed) * 100) / campaign.totalPhoneNumbers
  return (
    <div>
      <div className="d-flex mb-1">
        <div className="text-dark text-uppercase font-weight-bold mr-auto">{campaign.name}</div>
        <div className="text-gray-6">{campaign.totalContacts} Contacts</div>
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
