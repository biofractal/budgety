import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { stackReduxApp } from '@gp-technical/stack-redux-app'
import { components, services } from './loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './theme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const opts = {}
const store = createStore(services, stackReduxApp(opts))

ReactDOM.render(

  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <components.transactions />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
