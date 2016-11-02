import * as components from './component'
import * as db from './db'
import * as services from './service'
import { makeActionHub } from '@gp-technical/stack-redux-app'

const actionHub = makeActionHub(services)

export { actionHub, components, db, services }
