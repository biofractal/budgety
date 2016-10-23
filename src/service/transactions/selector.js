import { name } from './feature'

const getAll = (state) => {
  return state[name]
}

const getTransactions = (state) => {
  return getAll(state).transactions
}

export { getAll, getTransactions }
