import React from 'react'
import { Helmet } from 'react-helmet'
import General1 from 'components/widgets/General/1'
import General1v1 from 'components/widgets/General/1v1'
import General2 from 'components/widgets/General/2'
import General2v1 from 'components/widgets/General/2v1'
import General2v2 from 'components/widgets/General/2v2'
import General2v3 from 'components/widgets/General/2v3'
import General2v4 from 'components/widgets/General/2v4'
import General3 from 'components/widgets/General/3'
import General3v1 from 'components/widgets/General/3v1'
import General4 from 'components/widgets/General/4'
import General5 from 'components/widgets/General/5'
import General5v1 from 'components/widgets/General/5v1'
import General6 from 'components/widgets/General/6'
import General6v1 from 'components/widgets/General/6v1'
import General7 from 'components/widgets/General/7'
import General8 from 'components/widgets/General/8'
import General9 from 'components/widgets/General/9'
import General10 from 'components/widgets/General/10'
import General10v1 from 'components/widgets/General/10v1'
import General11 from 'components/widgets/General/11'
import General11v1 from 'components/widgets/General/11v1'
import General12 from 'components/widgets/General/12'
import General12v1 from 'components/widgets/General/12v1'
import General12v2 from 'components/widgets/General/12v2'
import General12v3 from 'components/widgets/General/12v3'
import General13 from 'components/widgets/General/13'
import General13v1 from 'components/widgets/General/13v1'
import General14 from 'components/widgets/General/14'
import General15 from 'components/widgets/General/15'
import General16 from 'components/widgets/General/16'

class WidgetsGeneral extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Widgets General" />
        <div className="air__utils__heading">
          <h5>Widgets General</h5>
        </div>
        <div className="mb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-wrap mb-2">
                    <div className="text-dark font-size-18 font-weight-bold mr-auto">
                      Support Chat
                    </div>
                    <button type="button" className="btn btn-link p-0 border-0">
                      <i className="fe fe-x-square font-size-21 align-middle text-gray-6" />
                    </button>
                  </div>
                  <General14 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General12 />
                </div>
              </div>
              <div className="card text-white bg-primary">
                <General12v1 />
              </div>
              <div className="card">
                <div className="card-body">
                  <General12v2 />
                </div>
              </div>
              <div className="card">
                <div className="card-body bg-gray-2">
                  <General12v3 />
                </div>
              </div>
              <div className="card">
                <General13 />
              </div>
              <div className="card">
                <General13v1 />
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <General1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General1v1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General9 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General10 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General10v1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General5v1 />
                </div>
              </div>
              <div className="card">
                <General11 />
              </div>
              <div className="card">
                <General11v1 />
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <General2 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General2v1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General2v2 />
                </div>
              </div>
              <div className="card text-white bg-success">
                <div className="card-body">
                  <General2v3 />
                </div>
              </div>
              <div className="card text-white bg-danger">
                <div className="card-body">
                  <General2v4 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General3 />
                </div>
              </div>
              <div className="card bg-primary">
                <div className="card-body">
                  <General3v1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General4 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General5 />
                </div>
              </div>
              <div className="card">
                <General6 />
              </div>
              <div className="card">
                <General6v1 />
              </div>
              <div className="card">
                <div className="card-body">
                  <General7 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <General8 />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <General15 />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <General16
                isNew
                isFavorite
                image="resources/images/products/003.jpg"
                name="TP-Link AC1750 Smart WiFi Router - Dual Band Gigabit Wireless Internet Routers for Home"
                price="245.21"
                oldPrice="419.58"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WidgetsGeneral
