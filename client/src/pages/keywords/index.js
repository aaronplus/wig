import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import List from './list'
import Add from './add'


const mapStateToProps = ({ keywords }) => ({ keywords })
@connect(mapStateToProps)
class Keywords extends React.Component {

  componentWillMount(){
    const{dispatch} = this.props;
    dispatch({
      type: 'keywords/GET_LIST',
      payload: true
    })
  }

  handleSave = (data) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'keywords/ADD_NEW_RECORD',
      payload: data
    })
  }

  handleUpdate = (data, id) => {
    const{dispatch} = this.props;
    dispatch({
      type: 'keywords/UPDATE_RECORD',
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
        type: 'keywords/DELETE_RECORD',
        payload: id
      })

  }

  render() {
    const{keywords:{list}} = this.props;
    return (
      <div>
        <Helmet title="Keywords" />
        <div className="air__utils__heading">
          <h5>Keywords</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <Add
              handleSave={(data) => this.handleSave(data)}
            />
            <List
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

export default Keywords
