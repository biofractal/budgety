import { helper } from '@gp-technical/stack-redux-components'
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
  const results = []
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
    results.push(nrow)
  }
  return results
}

const parse = async (file, transactions) => {
  const parsed = await helper.csvParse(file)
  const normalised = normalise(parsed)
  const deduplicated = normalised.filter(t1 => !transactions.find(t2 => JSON.stringify(t1) === JSON.stringify(t2)))
  return transactions
    .concat(deduplicated)
    .sort((t1, t2) => t2.date.isAfter(t1.date))
}

export default parse
