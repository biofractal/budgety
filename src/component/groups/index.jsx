import React from 'react'
import { connect } from 'react-redux'
import { actionHub, services } from '../../loader'
import { Components, helper } from '@gp-technical/stack-redux-components'
import TextField from 'material-ui/TextField'
import FilterListIcon from 'material-ui/svg-icons/content/filter-list'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar'

class component extends React.PureComponent {
  state = {
    label: '',
    matches: ''
  }
  onBackup = () => {
    const {groups} = this.props
    helper.clientFile.save('budgety-groups.txt', groups)
  }

  onRestore = async (e) => {
    const groups = await helper.clientFile.load(e.target.files[0])
    this.props.restore(groups)
  }

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onChangeMatches = (e) => {
    this.setState({
      matches: e.target.value.split(',').map(v => v.trim())
    })
  }

  onCreate = () => {
    const {label, matches} = this.state
    this.props.create({label, matches})
    this.setState({
      label: '',
      matches: ''
    })
  }

  onChange = (row, key, value) => {
    this.props.update(row.id, key, value)
  }

  onFilter = (group) => {
    this.props.setFilter(group)
  }

  onDelete = ({id}) => {
    this.props.deleteOne(id)
  }
  columns = {
    label: {
      editable: true
    },
    matches: {
      format: ({matches}) => Array.join(matches, ','),
      editable: true
    },
    amount: {
      format: ({amount}) => {
        return helper.format.asSterling(amount)
      }
    },
    filter: {
      type: 'button',
      icon: <FilterListIcon/>,
      width: '4rem',
      onClick: this.onFilter
    }
  }

  render () {
    const {groups} = this.props
    if (!groups) return null

    return (
      <Components.Box>
        <Toolbar>
          <ToolbarTitle text='Groups' />
          <ToolbarGroup firstChild={true}>
            <FlatButton primary={true} label='Backup' onClick={this.onBackup} />
            <Components.FileUpload label='Restore' onFileSelected={this.onRestore} />
          </ToolbarGroup>
        </Toolbar>
        <div style={{textAlign: 'center'}}>
          <TextField
            style={{width: 200, marginRight: 20}}
            floatingLabelText='label'
            onChange={this.onChangeLabel}
            value={this.state.label} />
          <TextField
            style={{width: 500, marginRight: 20}}
            floatingLabelText='matches'
            onChange={this.onChangeMatches}
            value={this.state.matches} />
          <RaisedButton primary={true} label='Create' onClick={this.onCreate} />
        </div>
        <Components.ObjectTable
          rows={groups}
          columns={this.columns}
          onDelete={this.onDelete}
          onChange={this.onChange}
          showCheckboxes={false} />
      </Components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  groups: services.groups.selector.getWithTotals(state),
  selected: services.groups.selector.getSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  create: (item) => dispatch(actionHub.GROUPS_CREATE(item)),
  restore: (groups) => dispatch(actionHub.GROUPS_RESTORE(groups)),
  setFilter: (group) => dispatch(actionHub.GROUPS_SET_FILTER(group)),
  update: (id, key, value) => dispatch(actionHub.GROUPS_UPDATE({id, key, value})),
  deleteOne: (id) => dispatch(actionHub.GROUPS_DELETE_ONE(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
