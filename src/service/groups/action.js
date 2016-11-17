import { name } from './name'
import uuid from 'uuid'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'
import { actionHub } from '../../loader'

const types = makeTypes(name, ['deleteOne', 'create', 'update', 'setFilter', 'restore'])
const actions = makeActions(types)

actions.groupsCreate = group => {
  return (dispatch, getState) => {
    const data = {...group, id: uuid.v4(), amount: 0}
    dispatch({
      types,
      type: types.groupsCreate,
      data})
  }
}

actions.groupsSetFilter = group => {
  return (dispatch, getState) => {
    dispatch(actionHub.TRANSACTIONS_SET_GROUP_FILTER(group))
    dispatch(actionHub.APP_TABS_SELECT('transactions'))
  }
}

export { types, actions }
