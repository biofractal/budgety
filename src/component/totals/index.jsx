import React from 'react'
import { connect } from 'react-redux'
import { services } from '../../loader'
import { Components, helper } from '@gp-technical/stack-redux-components'
import { List, ListItem } from 'material-ui/List'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'

class component extends React.Component {
  render () {
    const {totals} = this.props
    if (!totals) return null

    const items = []
    for (var key in totals) {
      items.push(<ListItem key={key} primaryText={key} secondaryText={helper.format.asSterling(totals[key])} />)
    }
    return (
      <Components.Box>
        <Toolbar>
          <ToolbarTitle text='Group Totals' />
        </Toolbar>
        <List>
          {items}
        </List>
      </Components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  totals: services.totals.selector.get(state)
})

export default connect(mapStateToProps)(component)
