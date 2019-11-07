import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import MessageList from './MessageList'
import AddMessage from './add'


const mapStateToProps = ({ messages }) => ({ messages })
@connect(mapStateToProps)
class PhoneNumber extends React.Component {

  componentWillMount(){
    const{dispatch} = this.props;
    dispatch({
      type: 'messages/GET_LIST',
      payload: true
    })
  }

  handleSave = (data) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'messages/ADD_NEW_RECORD',
      payload: data
    })
  }

  handleUpdate = (data, id) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'messages/UPDATE_RECORD',
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
        type: 'messages/DELETE_RECORD',
        payload: id
      })

  }

  render() {
    const{messages:{list}} = this.props;
    return (
      <div>
        <Helmet title="Messages" />
        <div className="air__utils__heading">
          <h5>Message</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <AddMessage
              handleSave={(data) => this.handleSave(data)}
            />
            <MessageList
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
