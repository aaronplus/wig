import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import contacts from './contacts/reducers'
import phoneNumbers from './phone/reducers'
import messages from './messages/reducers'
import keywords from './keywords/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    contacts,
    phoneNumbers,
    messages,
    keywords
  })
