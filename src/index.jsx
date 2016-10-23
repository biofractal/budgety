import './main.css'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { stackReduxApp } from '@gp-technical/stack-redux-app'
import { components, services, env } from './loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const opts = {}
const store = createStore(services, stackReduxApp(opts))

ReactDOM.render(

  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <components.transactions />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
