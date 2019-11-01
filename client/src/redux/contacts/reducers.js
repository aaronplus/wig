import actions from './actions'

const initialState = {
  list:'',
  authorized: false,
  loading: false,
  schema: false,
  countObj: false
}

export default function contactsReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
