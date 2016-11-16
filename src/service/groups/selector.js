import { services } from '../../loader'
import totals from './totals'

import { name } from './name'

const get = (state) => {
  return state[name].groups
}

const getById = (state, id) => {
  return get(state).find(group => group.id === id)
}

const getWithTotals = (state) => {
  const groups = get(state)
  const transactions = services.transactions.selector.getTransactions(state)
  return totals.calculate(groups, transactions)
}

const getSelected = (state) => {
  return get(state).selected
}
export default {
  getById,
  getWithTotals,
  get,
  getSelected}
