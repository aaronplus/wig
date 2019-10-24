import React from 'react'
import { Helmet } from 'react-helmet'
import List1 from 'components/widgets/Lists/1'
import List2 from 'components/widgets/Lists/2'
import List3 from 'components/widgets/Lists/3'
import List4 from 'components/widgets/Lists/4'
import List5 from 'components/widgets/Lists/5'
import List6 from 'components/widgets/Lists/6'
import List7 from 'components/widgets/Lists/7'
import List8 from 'components/widgets/Lists/8'
import List9 from 'components/widgets/Lists/9'
import List10 from 'components/widgets/Lists/10'
import List11 from 'components/widgets/Lists/11'
import List12 from 'components/widgets/Lists/12'
import List13 from 'components/widgets/Lists/13'
import List14 from 'components/widgets/Lists/14'
import List15 from 'components/widgets/Lists/15'
import List16 from 'components/widgets/Lists/16'
import List17 from 'components/widgets/Lists/17'
import List18 from 'components/widgets/Lists/18'
import List19 from 'components/widgets/Lists/19'

class WidgetsLists extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Widgets Lists" />
        <div className="air__utils__heading">
          <h5>Widgets Lists</h5>
        </div>
        <div className="mb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <List1 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List5 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List8 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List11 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List14 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List17 />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <List2 />
              </div>
              <div className="card">
                <div className="card-body">
                  <List6 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List9 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List12 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List15 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List19 />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <List3 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List4 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List7 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List10 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List13 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List16 />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <List18 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WidgetsLists
