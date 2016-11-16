import React from 'react'
import { connect } from 'react-redux'
import { components, actionHub, services } from '../../loader'
import { Tabs, Tab } from 'material-ui/Tabs'

class component extends React.PureComponent {

  onChange = (selected) => {
    this.props.select(selected)
  }

  render () {
    const {selected} = this.props
    return (
      <Tabs value={selected} onChange={this.onChange}>
        <Tab label='Groups' value='groups'>
          <components.groups />
        </Tab>
        <Tab label='Account Transactions' value='transactions'>
          <components.transactions />
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => ({
  selected: services.appTabs.selector.getSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  select: (selected) => dispatch(actionHub.APP_TABS_SELECT(selected))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
