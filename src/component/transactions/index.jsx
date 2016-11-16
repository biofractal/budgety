import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { actionHub, services } from '../../loader'
import { Components, helper } from '@gp-technical/stack-redux-components'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

class component extends React.PureComponent {

  onFilterChanged = (e) => {
    this.props.setFilter(e.target.value)
  }

  onFilterClear = () => {
    this.props.setFilter('')
  }

  onFileSelected = e => {
    this.props.parse(e.target.files[0])
  }

  onRemoveAll = () => {
    this.props.removeAll()
  }

  columns = {
    date: {
      format: ({date}) => moment(date).format('DD-MM-YYYY')
    },
    type: 'type',
    owner: 'owner',
    description: 'description',
    amount: {
      format: ({amount}) => helper.format.asSterling(amount)
    },
    balance: {
      format: ({balance}) => helper.format.asSterling(balance)
    }
  }

  getFiltered = (transactions, filter) => {
    return transactions.filter(t => filter
      .split(',')
      .map(v => v.trim())
      .find(f => t.description.toLowerCase().indexOf(f.toLowerCase()) !== -1 || t.owner.toLowerCase().indexOf(f.toLowerCase()) !== -1))
  }

  render () {
    let {transactions, filter} = this.props
    if (filter) transactions = this.getFiltered(transactions, filter)

    return (
      <Components.Box>
        <Toolbar>
          <ToolbarTitle text='Account Transactions' />
          <ToolbarGroup firstChild={true}>
            <TextField name='filter' value={filter} onChange={this.onFilterChanged} />
            <FlatButton primary={true} label='Show All' onClick={this.onFilterClear} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <Components.FileUpload label='Choose File' onFileSelected={this.onFileSelected} />
            <ToolbarSeparator />
            <FlatButton primary={true} label='Remove All' onClick={this.onRemoveAll} />
          </ToolbarGroup>
        </Toolbar>
        <Components.ObjectTable rows={transactions} columns={this.columns} onDelete={this.onDeleteOne} />
      </Components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  transactions: services.transactions.selector.getTransactions(state),
  filter: services.transactions.selector.getFilter(state)
})

const mapDispatchToProps = (dispatch) => ({
  parse: (file) => dispatch(actionHub.TRANSACTIONS_PARSE(file)),
  removeAll: () => dispatch(actionHub.TRANSACTIONS_REMOVE_ALL()),
  setFilter: (filter) => dispatch(actionHub.TRANSACTIONS_SET_FILTER(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
