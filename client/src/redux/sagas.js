import { all } from 'redux-saga/effects'
import user from './user/sagas'
import contacts from './contacts/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import phoneNumbers from './phone/sagas'
import keywords from './keywords/sagas'
import messages from './messages/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), contacts(), phoneNumbers(), messages(), keywords()])
}
