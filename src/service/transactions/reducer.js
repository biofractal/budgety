const reducer = function (state = {transactions: []}, action) {
  const {type, types, data} = action

  switch (type) {
    case types.transactionsAdd: {
      return {...state, transactions: state.transactions.concat(data)}
    }
    default:
      return state
  }
}

export { reducer }
