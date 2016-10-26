import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fade } from 'material-ui/utils/colorManipulator'
import { cyan500, cyan900, grey400, grey500, pinkA200, white, darkBlack, fullBlack } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan900,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: 'rgb(255, 255, 255) !important',
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey500,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  },
  appBar: {
    height: 50
  },
  toolbar: {
    backgroundColor: white
  }
})

export { muiTheme }
