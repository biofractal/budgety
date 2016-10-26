import { helpers } from '@gp-technical/stack-redux-components'
import * as db from './db'
import moment from 'moment'

const keyMaps = {
  'date': ['Date', 'Transaction Date'],
  'description': ['Description', 'Transaction Description'],
  'amount': ['Amount', 'Debit Amount', 'Credit Amount'],
  'balance': ['Balance']
}

const getOwner = (content) => {
  return (Object.keys(content[0])[0] === 'Date') ? 'jonny' : 'kay'
}

const normalise = (content) => {
  const transactions = db.transactions()
  for (var i = 0; i < content.length; i++) {
    const row = content[i]
    const nrow = {index: i + 1}
    for (let rowKey in row) {
      for (let mapKey in keyMaps) {
        if (keyMaps[mapKey].includes(rowKey)) {
          switch (mapKey) {
            case 'amount':
            case 'balance':
              let val = parseFloat(row[rowKey])
              if (isNaN(val)) continue
              if (rowKey === 'Debit Amount') {
                val *= -1
              }
              nrow[mapKey] = val
              break
            case 'date':
              nrow[mapKey] = moment(row[rowKey], 'DD-MM-YYYY')
              break
            default:
              nrow[mapKey] = row[rowKey]
          }
        }
      }
    }
    transactions.push(nrow)
  }
  return transactions
}

const parse = async file => {
  const contents = await helpers.csvParse(file)
  const owner = getOwner(contents)
  const transactions = normalise(contents)
  const balance = transactions[transactions.length - 1].balance
  db.balance(balance, owner)
  console.info('total', db.balance())
  db.transactions(transactions)
  return transactions
}

export { parse }
