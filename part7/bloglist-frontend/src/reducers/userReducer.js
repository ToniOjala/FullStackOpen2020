import loginService from '../services/login'

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return {}
  default:
    return state
  }
}

export const loginUser = credentials => {
  console.log(credentials)
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedInUser')
  return async dispatch => {
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default userReducer