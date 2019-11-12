import actions from './actions'

const INDEX_PAGE_SIZE_DEFAULT = 50;

const initialState = {
  list:'',
  authorized: false,
  loading: false,
  schema: false,
  countObj: false,
  meta: {
    page: 0,
    pageSize: INDEX_PAGE_SIZE_DEFAULT,
    pageTotal: 1,
    total: 0,
  }
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
