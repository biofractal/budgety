const reducer = function (state = {transactions: []}, action) {
  const {type, types, data} = action

  switch (type) {
    case types.transactionsSet: {
      return {...state, transactions: data}
    }
    default:
      return state
  }
}

export { reducer }
