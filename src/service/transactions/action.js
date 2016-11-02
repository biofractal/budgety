import { name } from './feature'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['load', 'setFilter'])
const actions = makeActions(types)

export { types, actions }
