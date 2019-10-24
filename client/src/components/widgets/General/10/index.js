import React from 'react'

class General10 extends React.Component {
  render() {
    return (
      <div className="d-flex flex-wrap align-items-start">
        <div className="air__utils__avatar air__utils__avatar--size64 mr-3">
          <img src="resources/images/avatars/3.jpg" alt="Mary Stanform" />
        </div>
        <div>
          <div className="text-uppercase font-size-12">Administrator</div>
          <div className="text-dark font-weight-bold font-size-18 mb-2">Helen Maggie</div>
          <button type="button" className="btn btn-success btn-with-addon">
            <span className="btn-addon">
              <i className="btn-addon-icon fe fe-plus-circle" />
            </span>
            Request Access
          </button>
        </div>
      </div>
    )
  }
}

export default General10
