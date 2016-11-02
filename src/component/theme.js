import { theme } from '../theme'

const paper = {
  padding: 20,
  margin: 20,
  textAlign: 'center',
  maxWidth: 1000
}

const fileInput = {
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  width: '100%',
  opacity: 0,
  display: 'inline-block'
}
const gridListRoot = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const gridList = {
  width: 500,
  height: 450,
  overflowY: 'auto'
}

export { theme, paper, fileInput, gridListRoot, gridList }
