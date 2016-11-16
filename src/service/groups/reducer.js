const reducer = function (state = {groups: []}, action) {
  const {type, types, data} = action
  let groups
  switch (type) {
    case types.groupsCreate:
      groups = [...state.groups]
      groups.push(data)
      return {...state, groups}
    case types.groupsRestore:
      return {...state, groups: data}
    case types.groupsUpdate:
      let {id, key, value} = data
      groups = state.groups.map(group => {
        if (group.id === id) {
          if (key === 'matches') value = value.split(',').map(v => v.trim())
          group[key] = value
        }
        return group
      })
      return {...state, groups}
    case types.groupsDeleteOne: {
      groups = state.groups.filter(group => group.id !== data)
      return {...state, groups}
    }
    default:
      return state
  }
}

export { reducer }
