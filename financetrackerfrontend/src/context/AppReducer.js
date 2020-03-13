export default (state, action) => {
    switch(action.type) {
      case 'GET_CASHFLOW':
        return {
          ...state,
          loading: false,
          incomes: action.payload,
          expenses: action.payload,
          month: action.payload
        }
        case 'CASHFLOW_ERROR':
      return {
        ...state,
        error: action.payload
      }
      default:
        return state;
    }
  }