const reducer = function (state = {transactions: [], filter: ''}, action) {
  const {type, types, data} = action
  switch (type) {
    case types.transactionsParse: {
      return {...state, transactions: data}
    }
    case types.transactionsRemoveAll: {
      return {...state, transactions: []}
    }
    case types.transactionsSetFilter: {
      return {...state, filter: data}
    }
    default:
      return state
  }
}

export { reducer }
