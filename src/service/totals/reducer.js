import calculator from './calculator'

const reducer = function (state = {}, action) {
  const {type, types, data} = action

  switch (type) {
    case types.totals_init: {
      return data
    }
    case types.transactionsSet: {
      return calculator.getTotals()
    }
    default:
      return state
  }
}

export { reducer }
