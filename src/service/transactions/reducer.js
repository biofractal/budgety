const reducer = function (state = {transactions: []}, action) {
  const {type, types, data} = action

  switch (type) {
    case types.transactions_init: {
      return data
    }
    case types.transactionsLoad: {
      return {...state, transactions: data}
    }
    case types.transactionsSetFilter: {
      return {...state, filter: data}
    }
    default:
      return state
  }
}

export { reducer }
