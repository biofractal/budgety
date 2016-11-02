import { db } from '../../loader'
function initialiser () {
  const data = {transactions: db.transactions(), filter: 'all'}
  return data
}

export { initialiser }
