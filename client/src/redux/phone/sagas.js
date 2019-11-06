import { all, takeEvery, put, call } from 'redux-saga/effects'

import {getList} from 'services/phoneNumbers'
import actions from './actions'

export function* GET_LIST(){
  const success =  yield call(getList);
  yield put({
    type: 'phoneNumbers/SET_STATE',
    payload: {
      list: success
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_LIST, GET_LIST),
  ])
}
