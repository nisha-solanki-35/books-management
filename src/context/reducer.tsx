export interface State {
  successMsg?: string | undefined
  deleteSuccessMsg?: string | undefined
  errorMsg?: string | undefined
  booksList?: any[] | undefined
}

export interface Action {
  type: string
  payload?: {
    message?: string
    data?: any
  }
}

const reducer = (state: State = {}, action: Action) => {
  switch (action.type) {
    case 'SUCCESS_MSG':
      return {
        ...state,
        successMsg: action?.payload?.message
      }
    case 'DELETE_SUCCESS_MSG':
      return {
        ...state,
        deleteSuccessMsg: action?.payload?.message
      }
    case 'ERROR_MSG':
      return {
        ...state,
        errorMsg: action?.payload?.message
      }
    case 'CLEAR_MSG':
      return {
        ...state,
        errorMsg: '',
        successMsg: '',
        deleteSuccessMsg: ''
      }
    case 'BOOKS_LIST':
      return {
        ...state,
        booksList: action?.payload?.data
      }
    default:
      return state
  }
}

export default reducer
