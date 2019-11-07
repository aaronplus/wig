import actions from './actions'

const initialState = {
  list:false,
  loading: false,
}

export default function messagesReducer(state = initialState, action) {
  console.log(action,"Here");
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
