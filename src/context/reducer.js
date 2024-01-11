const reducer = (state = { }, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        registrationSuccessMsg: action.payload.message
      }
    case 'LOGIN':
      return {
        ...state,
        loginSuccessMsg: action.payload.message
      }
    case 'BOOKS_LIST':
      return {
        ...state,
        booksList: action.payload.data
      }
    default:
      return state
  }
}

export default reducer
