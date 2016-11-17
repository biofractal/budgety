const reducer = function (state = {transactions: [], filter: {group: undefined, text: ''}}, action) {
  const {type, types, data} = action
  switch (type) {
    case types.transactionsParse:
      return {...state, transactions: data}

    case types.transactionsRemoveAll:
      return {...state, transactions: []}

    case types.transactionsSetGroupFilter:
      return {...state, filter: {...state.filter, group: data}}

    case types.transactionsSetTextFilter:
      return {...state, filter: {...state.filter, text: data}}

    case types.transactionsShowAll:
      return {...state, filter: {group: undefined, text: ''}}

    default:
      return state
  }
}

export { reducer }
