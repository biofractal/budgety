import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { stackReduxApp } from '@gp-technical/stack-redux-app'
import { components, services } from './loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from './theme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'

injectTapEventPlugin()

const opts = {}
const store = createStore(services, stackReduxApp(opts))

ReactDOM.render(

  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <div>
        <AppBar title='budgety' />
        <br/>
        <Tabs>
          <Tab label='Group Totals'>
            <components.totals />
          </Tab>
          <Tab label='Account Transactions'>
            <components.transactions />
          </Tab>
        </Tabs>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
