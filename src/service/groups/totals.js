const groupTransactions = (groups, transactions) => {
  const grouped = [...transactions]
  grouped.forEach(t => {
    t.groups = []
    const dl = t.description.toLowerCase()
    groups.forEach(g => {
      if (g.matches.includes(match => dl.indexOf(match.toLowerCase()) !== -1)) {
        t.groups.push(g.id)
      }
    })
  })
  grouped.forEach(t => {
    if (t.groups.length === 0) t.groups.push(0)
  })

  return grouped
}

const calculate = (groups, transactions) => {
  const grouped = groupTransactions(groups, transactions)
  const results = [...groups]
  noMatch = {id: 0, label: 'Not Matched', matches: ['*'], amount: 0}
  results.push(noMatch)
  results.forEach(g => {
    transactions.forEach(t => {
      if (t.groups.includes(tg => g.id === tg.id)) g.amount += t.amount
    })
  })

  return results
}

const calculatex = (groups, transactions) => {
  const result = []
  let noMatch = groups.find(g => g.id === 0)
  if (!noMatch) {
    noMatch = {id: 0, label: 'Not Matched', matches: ['*'], amount: 0}
    result.push(noMatch)
  }
  noMatch.amount = 0
  if (groups.length === 0) {
    transactions.forEach(({amount}) => {
      noMatch.amount += Math.abs(amount)
    })
  } else {
    groups.forEach(group => {
      group.amount = 0
      const {matches} = group
      transactions.forEach(({description, amount}) => {
        if (matches.find(match => description.toLowerCase().indexOf(match.toLowerCase()) !== -1)) {
          group.amount += amount
        } else {
          noMatch.amount += amount
        }
      })
      result.push(group)
    })
  }

  result.sort((g1, g2) => {
    return g1.amount < g2.amount
  })
  return result
}

export default {
  calculate}
