import { all, takeEvery, put, call } from 'redux-saga/effects'

import {getContacts, getCampaignList, importContacts, exportContacts, getSchema, getCounts} from 'services/contact'
import actions from './actions'



export function* GET_CONTACTS(data) {
  yield put({
    type: 'contacts/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const{ payload: {page, limit}} = data;
  console.log(page, limit,"JKKN");
  const success = yield call(getContacts, page, limit);

  const success1 =  yield call(getCounts);
  console.log(success1,"success1");
  yield put({
    type: 'contacts/SET_STATE',
    payload: {
      list: success,
      countObj: success1,
      loading: false,
      meta: {
        page,
        pageSize: 50,
        pageTotal: success1.contactCount/50,
        total: success1.contactCount,

      }
    },
  })
}

export function* GET_CAMPAIGN_LIST() {
  const success = yield call(getCampaignList);
  yield put({
    type: 'contacts/SET_STATE',
    payload: {
      campaignList: success
    },
  })
}
export function* IMPORT_CONTACTS(postData) {
  yield call(importContacts,postData);
  // yield put({
  //   type: 'contacts/SET_STATE',
  //   payload: {
  //     campaignList: success
  //   },
  // })
}
export function* EXPORT_CONTACTS(postData) {
  yield call(exportContacts,postData);
}
export function* GET_SCHEMA_COLUMNS() {
const success =  yield call(getSchema);
  yield put({
    type: 'contacts/SET_STATE',
    payload: {
      schema: success
    },
  })
}

export function* GET_COUNTS(){
  const success =  yield call(getCounts);
  yield put({
    type: 'contacts/SET_STATE',
    payload: {
      countObj: success
    },
  })
}




export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_CONTACTS, GET_CONTACTS),
    takeEvery(actions.GET_CAMPAIGN_LIST, GET_CAMPAIGN_LIST),
    takeEvery(actions.IMPORT_CONTACTS, IMPORT_CONTACTS),
    takeEvery(actions.EXPORT_CONTACTS, EXPORT_CONTACTS),
    takeEvery(actions.GET_SCHEMA_COLUMNS, GET_SCHEMA_COLUMNS),
    takeEvery(actions.GET_COUNTS, GET_COUNTS)
  ])
}
