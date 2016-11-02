import * as local from './local'

const clear = () => {
  local.clear('transactions')
}

const transactions = value => {
  if (value) {
    local.set('transactions', value)
  } else {
    return local.get('transactions', [])
  }
}

export { clear, transactions }
