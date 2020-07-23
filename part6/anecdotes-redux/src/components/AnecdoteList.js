import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()
  let anecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
  const filter = props.filter
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

const mapStateToProps = state => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(AnecdoteList)