import React from 'react'
import { connect } from 'react-redux'
import { style } from './style'
import { actionHub, services } from '../../loader'
import { helpers } from '@gp-technical/stack-redux-components'

const makeStandard = (transactions) => {
  const standardKeys = ['Date', 'Description', 'Amount', 'Balance']
  for (let key in transactions) {
    if (!standardKeys.includes(key)) {
      console.info('key', key)
    }
  }
  return transactions
}

class container extends React.Component {

  onFileSelected = async e => {
    const transactions = makeStandard(await helpers.csvParse(e.target.files[0]))
    this.props.add(transactions)
  }

  render () {
    const {transactions} = this.props
    console.info('transactions', transactions)
    return (
      <div style={style.box}>
        <h2>Transactions</h2>
        <input type='file' accept='.csv' onChange={this.onFileSelected} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transactions: services.transactions.selector.getTransactions(state)
})

const mapDispatchToProps = (dispatch) => ({
  add: (transactions) => dispatch(actionHub.TRANSACTIONS_ADD(transactions))
})

const component = connect(mapStateToProps, mapDispatchToProps)(container)

export { component }
