import { name } from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['select'])
const actions = makeActions(types)

export { types, actions }
