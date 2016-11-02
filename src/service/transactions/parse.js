import { helper } from '@gp-technical/stack-redux-components'
import { db } from '../../loader'
import moment from 'moment'

const keyMaps = {
  'date': ['Date', 'Transaction Date'],
  'type': ['Type', 'Transaction Type'],
  'description': ['Description', 'Transaction Description'],
  'amount': ['Amount', 'Debit Amount', 'Credit Amount'],
  'balance': ['Balance']
}

const getOwner = (content) => {
  return (Object.keys(content[0])[0] === 'Date') ? 'jonny' : 'kay'
}

const normalise = (contents) => {
  const transactions = db.transactions()
  for (var i = 0; i < contents.length; i++) {
    const row = contents[i]
    const nrow = {owner: getOwner(contents), type: '*'}
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
  const contents = await helper.csvParse(file)
  const transactions = normalise(contents)
  transactions.sort((t1, t2) => {
    return new Date(t2.date).getTime() - new Date(t1.date).getTime()
  })
  db.transactions(transactions)
  return transactions
}

export { parse }
