import React from 'react'
import { connect } from 'react-redux'
import { style } from './style'
import { actionHub, services } from '../../loader'
import * as db from './db'

class container extends React.Component {

  onFileSelected = async e => {
    db.save(e.target.files[0])
    this.props.add(db.select())
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
