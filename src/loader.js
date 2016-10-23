import * as components from './component'
import { env } from './env'
import * as services from './service'
import { makeActionHub } from '@gp-technical/stack-redux-app'

const actionHub = makeActionHub(services)

export { actionHub, components, env, services }
