import { name } from './name'
import parse from './parse'
import selector from './selector'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['parse', 'removeAll', 'setGroupFilter', 'setTextFilter', 'showAll'])
const actions = makeActions(types)

actions.transactionsParse = file => {
  return async (dispatch, getState) => {
    const state = getState()
    const transactions = [...selector.getTransactions(state)]
    const data = await parse(file, transactions)
    dispatch({
      types,
      type: types.transactionsParse,
      data})
  }
}
export { types, actions }
