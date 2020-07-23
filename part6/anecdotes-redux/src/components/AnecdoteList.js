import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  let anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  anecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = anecdote => {
    dispatch(addVoteTo(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList