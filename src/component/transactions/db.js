import { helpers } from '@gp-technical/stack-redux-components'
import store from 'store'

const standardKeys = ['Date', 'Description', 'Amount', 'Balance']

const mapKeys = {
  'Transaction Date': 'Date',
  'Transaction Description': 'Description',
  'Debit Amount': 'Amount',
  'Credit Amount': 'Amount',
  'Date': 'Date',
  'Description': 'Description',
  'Amount': 'Amount',
  'Balance': 'Balance'
}

const makeStandard = (transactions) => {
  var standardised = {}
  for (let key in transactions) {
    if (mapKeys[key]) {
      if (key === 'Debit Amount' || key === 'Credit Amount') {
        let values = standardised[mapKeys[key]] || []
        let init = values.length === 0
        for (var i = 0; i < transactions[key].length; i++) {
          let val = parseFloat(transactions[key][i])
          if (key === 'Debit Amount' && val !== '') {
            val = val * -1
          }
          if (init) {
            values.push(val)
          } else if (isNaN(values[i])) {
            values[i] = val
          }
        }
        standardised[mapKeys[key]] = values
      } else {
        standardised[mapKeys[key]] = transactions[key]
      }
    }
  }
  return standardised || transactions
}

const combine = (existing, latest) => {
  for (var i = 0; i < standardKeys.length; i++) {
    const key = standardKeys[i]
    existing[key].concat(latest[key])
  }
  return existing
}

const save = async file => {
  store.clear()
  const contents = await helpers.csvParse(file)
  let latest = makeStandard(contents)
  let existing = select()
  let transactions = (existing) ? combine(existing, latest) : latest
  console.info('transactions-save', transactions)
  store.set('transactions', transactions)
}

const select = () => {
  const transactions = store.get('transactions')
  console.info('transactions-select', transactions)
  return transactions
}

export { save, select }
