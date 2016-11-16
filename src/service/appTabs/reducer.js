const reducer = function (state = {selected: 'groups'}, action) {
  const {type, types, data} = action

  switch (type) {
    case types.appTabsSelect: {
      return {...state, selected: data}
    }
    default:
      return state
  }
}

export { reducer }
