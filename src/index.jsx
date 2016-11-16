import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { stackReduxApp } from '@gp-technical/stack-redux-app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from './theme'
import AppBar from 'material-ui/AppBar'
import { components, services } from './loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const opts = {
  localSave: true,
  localLoad: true
}
const store = createStore(services, stackReduxApp(opts))

ReactDOM.render(

  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <div>
        <AppBar title='budgety' />
        <br/>
        <components.appTabs />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
