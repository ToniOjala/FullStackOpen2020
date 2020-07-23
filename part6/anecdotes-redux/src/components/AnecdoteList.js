import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  let anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  if(anecdotes) {
    console.log(anecdotes)
    anecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))
    anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = anecdote => {
    dispatch(addVoteTo(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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