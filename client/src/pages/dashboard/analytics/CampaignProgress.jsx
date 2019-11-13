import React from 'react'
import ProgressBar from './ProgressBar'

function CampaignProgress({ campaign = { sent: 0, delivered: 0, failed: 0 } }) {
  return (
    <div className="card">
      <div className="card-body prgrs-bar">
        <div className="row justify-content-between">
          <div className="col-md-5 prgs-card">
            <ProgressBar campaign={campaign} />
          </div>
          <div className="col-auto">
            <div className="row">
              <div className="col-md prgs-card">
                <p className="text-success">{campaign.totalPhoneNumbers}</p>
                Total
              </div>
              <div className="col-md prgs-card">
                <p className="text-success">
                  {campaign.status.sent + campaign.status.delivered + campaign.status.failed}
                </p>
                Sent
              </div>
              <div className="col-md prgs-card">
                <p className="text-default">{campaign.status.delivered}</p>
                Delivered
              </div>
              <div className="col-md prgs-card">
                <p className="text-danger">{campaign.status.failed}</p>
                Failed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignProgress
