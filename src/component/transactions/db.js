import store from 'store'

const clear = () => {
  store.clear()
}

const get = (key, defaultValue) => {
  return store.get(key) || defaultValue
}

const set = (key, value) => {
  store.set(key, value)
}

const transactions = value => {
  if (value) {
    set('transactions', value)
  } else {
    return get('transactions', [])
  }
}

const balance = (value, owner) => {
  if (value) {
    const key = 'balance' + ((owner) ? `-${owner}` : '')
    set(key, value)
  }
  return get('balance-kay', 0) + get('balance-jonny', 0)
}

export { balance, clear, transactions }
