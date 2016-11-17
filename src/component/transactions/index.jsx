import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { actionHub, services } from '../../loader'
import { Components, helper } from '@gp-technical/stack-redux-components'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

class component extends React.PureComponent {

  onTextFilterChanged = (e) => {
    this.props.setTextFilter(e.target.value)
  }

  onShowAll = () => {
    this.props.showAll()
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
    }
  }

  getFiltered = (transactions, {group, text}) => {
    let filtered = [...transactions]
    if (group) {
      const {id} = group
      filtered = filtered.filter(t => t.groups.includes(id))
    }
    if (text) {
      text = text.toLowerCase()
      filtered = filtered.filter(t => t.description.toLowerCase().indexOf(text) !== -1 ||
        t.owner.toLowerCase().indexOf(text) !== -1 ||
        t.amount.toLowerCase().indexOf(text) !== -1
      )
    }
    return filtered
  }

  render () {
    let {transactions, filter} = this.props
    if (filter) {
      transactions = this.getFiltered(transactions, filter)
    }

    return (
      <Components.Box>
        <Toolbar>
          <ToolbarTitle text='Account Transactions' />
          <ToolbarGroup firstChild={true}>
            <TextField name='filter' value={filter.text} onChange={this.onTextFilterChanged} />
            <FlatButton primary={true} label='Show All' onClick={this.onShowAll} />
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
  setTextFilter: (text) => dispatch(actionHub.TRANSACTIONS_SET_TEXT_FILTER(text)),
  showAll: () => dispatch(actionHub.TRANSACTIONS_SHOW_ALL())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
