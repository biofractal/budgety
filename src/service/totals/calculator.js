import { db } from '../../loader'

const groups = [
  {matches: ['amazon'], label: 'Amazon'},
  {matches: ['sainsburys'], label: 'Sainsburys'},
  {matches: ['lidl'], label: 'Lidl'},
  {matches: ['tesco stores'], label: 'Tesco Food'},
  {matches: ['sainsburys', 'lidl', 'tesco'], label: 'Food'}
]

const getTotals = () => {
  let transactions = db.transactions()
  let totals = {}
  transactions.forEach(({description, amount}) => {
    groups.forEach(({matches, label}) => {
      matches.forEach(match => {
        if (description.toLowerCase().indexOf(match) !== -1) {
          if (!totals[label]) {
            totals[label] = 0
          }
          totals[label] += amount
        }
      })
    })
  })
  return totals
}

export default {
  getTotals}
