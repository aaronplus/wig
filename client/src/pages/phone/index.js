import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PhoneList from './phoneList'

const mapStateToProps = ({ phoneNumbers }) => ({ phoneNumbers })
@connect(mapStateToProps)
class PhoneNumber extends React.Component {

  componentWillMount(){
    const{dispatch} = this.props;
    dispatch({
      type: 'phoneNumbers/GET_LIST',
      payload: true
    })
  }

  render() {
    const{phoneNumbers:{list}} = this.props;
    return (
      <div>
        <Helmet title="Phone Numbers" />
        <div className="air__utils__heading">
          <h5>Phone Numbers</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <PhoneList data={list} />
          </div>
        </div>
      </div>
    )
  }

}

export default PhoneNumber
