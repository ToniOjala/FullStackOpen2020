const notificationReducer = (state = { message: '', type: '' }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return { message: '', type: '' }
  default:
    return state
  }
}

let timeoutID = null

export const setSuccessMessage = (message) => {
  return dispatch => {
    if (timeoutID) clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, 3000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type: 'success' }
    })
  }
}

export const setErrorMessage = (message) => {
  return dispatch => {
    if (timeoutID) clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, 3000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type: 'error' }
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