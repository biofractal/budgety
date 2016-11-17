const groupTransactions = (groups, transactions) => {
  const grouped = [...transactions]
  grouped.forEach(t => {
    t.groups = []
    const dl = t.description.toLowerCase()
    groups.forEach(g => {
      if (g.matches.find(m => dl.indexOf(m.toLowerCase()) !== -1)) {
        t.groups.push(g.id)
      }
    })
  })
  grouped.forEach(t => {
    if (t.groups.length === 0) {
      t.groups.push(0)
    }
  })
  return grouped
}

const calculate = (groups, transactions) => {
  const transactionsGrouped = groupTransactions(groups, transactions)
  const results = [...groups]
  results.push({id: 0, label: 'Not Matched', matches: ['*'], amount: 0})
  results.forEach(g => {
    g.amount = 0
    transactionsGrouped.forEach(t => {
      if (t.groups.includes(g.id)) {
        g.amount += t.amount
      }
    })
  })

  results.sort((g1, g2) => {
    return g2.amount < g1.amount
  })

  return results
}

export default {
  calculate}
