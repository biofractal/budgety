import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { actionHub, services, db } from '../../loader'
import { Components, helper } from '@gp-technical/stack-redux-components'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

class container extends React.Component {
  state = {filter: 'all'}

  onFilterChanged = (e, value) => {
    this.props.setFilter(value)
  }

  onFileSelected = async e => {
    await services.transactions.parse(e.target.files[0])
    this.props.load(db.transactions())
  }

  onClear = e => {
    db.clear()
    this.props.load(db.transactions())
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

  render () {
    let {transactions, filter} = this.props

    if (filter && filter !== 'all') {
      transactions = transactions.filter(t => t.owner === filter)
    }

    return (
      <Components.Box>
        <Toolbar>
          <ToolbarTitle text='Account Transactions' />
          <ToolbarGroup>
            <RadioButtonGroup
              name='owner'
              style={{display: 'flex'}}
              defaultSelected='all'
              onChange={this.onFilterChanged}>
              <RadioButton value='all' label='all' style={{marginTop: 16}} />
              <RadioButton value='jonny' label='Jonny' style={{marginTop: 16}} />
              <RadioButton value='kay' label='Kay' style={{marginTop: 16}} />
            </RadioButtonGroup>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <Components.FileUpload label='Choose File' onFileSelected={this.onFileSelected} />
            <ToolbarSeparator />
            <FlatButton primary={true} label='Clear' onClick={this.onClear} />
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
  load: (transactions) => dispatch(actionHub.TRANSACTIONS_LOAD(transactions)),
  setFilter: (filter) => dispatch(actionHub.TRANSACTIONS_SET_FILTER(filter))

})

const component = connect(mapStateToProps, mapDispatchToProps)(container)

export { component }
