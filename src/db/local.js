import store from 'store'

const clear = (key) => {
  if (key) {
    return store.remove(key)
  }
  store.clear()
}

const get = (key, defaultValue) => {
  return store.get(key) || defaultValue
}

const set = (key, value) => {
  store.set(key, value)
}

export { clear, get, set }
