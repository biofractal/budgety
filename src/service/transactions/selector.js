import { name } from './name'
const get = (state) => {
  return state[name]
}

const getFilter = (state) => {
  return get(state).filter
}

const getTransactions = (state) => {
  return get(state).transactions
}

export default {
  get,
  getFilter,
  getTransactions}
