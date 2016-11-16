import { name } from './name'

const get = (state) => {
  return state[name]
}

const getSelected = (state) => {
  return get(state).selected
}
export default {
  getSelected}
