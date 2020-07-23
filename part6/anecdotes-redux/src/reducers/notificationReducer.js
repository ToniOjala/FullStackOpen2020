const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let timeoutID = null

export const setNotification = (message, seconds) => {
  return dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message }
    })
  }
}

const removeNotification = () => {
  timeoutID = null
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer