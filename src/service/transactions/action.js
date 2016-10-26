import { name } from './feature'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['set'])
const actions = makeActions(types)

export { types, actions }
