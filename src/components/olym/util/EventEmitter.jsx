import _ from 'lodash'

let eventStore = {}

const addListener = (eventKey, func) => {
  if (typeof func !== 'function') {
    console.error('Cannot set non function param to FunctionStore!!!!!!')
    return
  }
  if (!Array.isArray(eventStore[eventKey])) {
    eventStore[eventKey] = []
  }
  eventStore[eventKey].push(func)
}

const on = (eventKey, func) => {
  if (typeof func !== 'function') {
    console.error('Cannot set non function param to FunctionStore!!!!!!')
    return
  }
  eventStore[eventKey].push([func])
}

const removeListener = (eventKey, func) => {
  if (Array.isArray(eventStore[eventKey])) {
    eventStore[eventKey] = eventStore[eventKey].filter(baseFunc => baseFunc !== func)
  }
}

const removeAllListeners = (eventKey) => {
  if (event === undefined) eventStore = {}
  else delete eventStore[eventKey]
}

const listeners = (eventKey) => {
  return _.result(eventStore, eventKey + '', [])
}

const emit = (eventKey, payload) => {
  let funcArray = _.result(eventStore, eventKey + '', [])
  if (funcArray.length > 0) {
    funcArray.forEach(func => {
      func(payload)
    })
    return true
  }
  return false
}

export default {
  addListener, on, removeListener, removeAllListeners, listeners, emit
}