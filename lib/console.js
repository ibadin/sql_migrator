/**
 * @link https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 */
const cOk = (text) => {
  console.log('\x1b[32m%s\x1b[0m', text)
}

const cWarn = (text) => {
  console.log('\x1b[33m%s\x1b[0m', text)
}

const cError = (text, error = null) => {
  console.log('\x1b[31m%s\x1b[0m', text)
  if (error) {
    console.table(error)
  }
}

const cAdvice = (title, command) => {
  console.log(title, '\x1b[100m%s\x1b[0m', command)
}

const cInfo = (variable) => {
  console.log(variable)
}

export {
  cOk,
  cWarn,
  cError,
  cAdvice,
  cInfo,
}