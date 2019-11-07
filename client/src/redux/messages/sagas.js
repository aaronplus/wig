import { all, takeEvery, put, call } from 'redux-saga/effects'
import {notification}  from 'antd'
import {getList, addNewRecord, deleteRecord, updateRecord} from 'services/message'
import actions from './actions'

export function* GET_LIST(){
  const success =  yield call(getList);
  yield put({
    type: 'messages/SET_STATE',
    payload: {
      list: success
    },
  })
}

export function* ADD_NEW_RECORD({ payload }){
  const success = yield call(addNewRecord, payload);
  if (success) {
    notification.success({
      message: 'Successfully Added',
      description: 'You have successfully added the new record.',
    })
  }
  yield put({
    type: 'messages/GET_LIST',
  })
}

export function* UPDATE_RECORD({ payload }){
  const {id, data} = payload
  const success = yield call(updateRecord, id, data);
  if (success) {
    notification.success({
      message: 'Successfully Updated',
      description: 'You have successfully updated the  record.',
    })
  }
  yield put({
    type: 'messages/GET_LIST',
  })
}

export function* DELETE_RECORD({ payload }){
  const success = yield call(deleteRecord, payload);
  if (success) {
    notification.success({
      message: 'Successfully Deleted',
      description: 'You have successfully deleted the  record.',
    })
  }
  yield put({
    type: 'messages/GET_LIST',
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_LIST, GET_LIST),
    takeEvery(actions.ADD_NEW_RECORD, ADD_NEW_RECORD),
    takeEvery(actions.DELETE_RECORD, DELETE_RECORD),
    takeEvery(actions.UPDATE_RECORD, UPDATE_RECORD),

  ])
}
