const calculate = (groups, transactions) => {
  const result = []
  const noMatch = {id: 0, label: 'Not Matched', matches: ['*'], amount: 0}
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

  result.push(noMatch)
  result.sort((g1, g2) => {
    return g1.amount < g2.amount
  })
  return result
}

export default {
  calculate}
