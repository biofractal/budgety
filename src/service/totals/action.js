import { name } from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['setOwner'])
const actions = makeActions(types)

export { types, actions }
