import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import{Button, Modal} from 'antd'
import PhoneList from './phoneList'
import AddPhoneNumber from './add'

const mapStateToProps = ({ phoneNumbers }) => ({ phoneNumbers })
@connect(mapStateToProps)
class PhoneNumber extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibleAddModal: false
    }
  }

  componentWillMount(){
    const{dispatch} = this.props;
    dispatch({
      type: 'phoneNumbers/GET_LIST',
      payload: true
    })
  }

  render() {
    const{phoneNumbers:{list}} = this.props;
    const {visibleAddModal} = this.state;
    return (
      <div>
        <Helmet title="Phone Numbers" />
        <div className="air__utils__heading">
          <h5>Phone Numbers</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <Button type="primary" onClick={()=> this.setState({visibleAddModal:true})}>Add</Button>
            </div>
            <PhoneList data={list} />
          </div>
        </div>
        <Modal
          title="Add Phone Numbers"
          visible={visibleAddModal}
          onOk={this.handleOk}
          onCancel={() => this.handleCancel}
        >
          <AddPhoneNumber />

        </Modal>
      </div>
    )
  }

}

export default PhoneNumber
