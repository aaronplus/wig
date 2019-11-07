import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PhoneList from './phoneList'
import AddPhoneNumber from './add'


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

  handleSave = (data) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'phoneNumbers/ADD_NEW_RECORD',
      payload: data
    })
  }

  handleUpdate = (data, id) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'phoneNumbers/UPDATE_RECORD',
      payload: {
        id,
        data
      }
    })
  }

  handleDelete = (id) => {
    console.log(id,"Deleted");
      const{dispatch} = this.props;
      dispatch({
        type: 'phoneNumbers/DELETE_RECORD',
        payload: id
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
            <AddPhoneNumber
              handleSave={(data) => this.handleSave(data)}
            />
            <PhoneList
              data={list}
              onPressDelete={(id) => this.handleDelete(id)}
              handleUpdateRecord={(data, id) => this.handleUpdate(data, id)}
            />
          </div>
        </div>

      </div>
    )
  }

}

export default PhoneNumber
