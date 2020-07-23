import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(x => x.id === id)
      const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'CREATE_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const addVoteTo = id => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    }
  }
}

export const initializeAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer