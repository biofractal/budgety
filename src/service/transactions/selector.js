import { name } from './feature'

const getAll = (state) => {
  return state[name]
}

const getFilter = (state) => {
  return getAll(state).filter
}

const getTransactions = (state) => {
  return getAll(state).transactions
}

export { getAll, getFilter, getTransactions }
