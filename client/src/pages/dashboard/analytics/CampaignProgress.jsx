import React from 'react'
import ProgressBar from './ProgressBar'

function CampaignProgress({
  campaign = {
    status: { queued: 0, accepted: 0, sent: 0, delivered: 0, undelivered: 0, failed: 0 },
  },
}) {
  const {
    status: { queued, accepted, sent, delivered, undelivered, failed },
  } = campaign
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
                  {queued + accepted + sent + delivered + undelivered + failed}
                </p>
                Sent
              </div>
              <div className="col-md prgs-card">
                <p className="text-default">{delivered}</p>
                Delivered
              </div>
              <div className="col-md prgs-card">
                <p className="text-danger">{queued + accepted + sent + undelivered}</p>
                Undelivered
              </div>
              <div className="col-md prgs-card">
                <p className="text-danger">{failed}</p>
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
