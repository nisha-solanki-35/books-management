const reducer = (state = { }, action) => {
  switch (action.type) {
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
