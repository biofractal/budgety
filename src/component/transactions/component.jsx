import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { paper } from '../theme'
import { actionHub, services } from '../../loader'
import * as db from './db'
import { parse } from './parser'
import { Components } from '@gp-technical/stack-redux-components'
import Loader from 'react-loader-advanced'

let total = null
const columns = ['index', 'date', 'description', 'amount', 'balance']

class container extends React.Component {
  onFileSelected = async e => {
    await parse(e.target.files[0])
    this.props.set(db.transactions())
  }

  onClear = e => {
    db.clear()
    this.props.set(db.transactions())
  }

  render () {
    const {transactions} = this.props
    return (
      <Paper style={paper} zDepth={1}>
        <h2>Transactions</h2>
        <button onClick={this.onClear}>
          Clear
        </button>
        <input type='file' accept='.csv' onChange={this.onFileSelected} />
        <Loader show={!transactions} message={'loading'} hideContentOnLoad={true}>
          <Components.Table rows={transactions} columns={columns} onDelete={this.onDeleteOne} />
        </Loader>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  transactions: services.transactions.selector.getTransactions(state)
})

const mapDispatchToProps = (dispatch) => ({
  set: (transactions) => dispatch(actionHub.TRANSACTIONS_SET(transactions))
})

const component = connect(mapStateToProps, mapDispatchToProps)(container)

export { component }
