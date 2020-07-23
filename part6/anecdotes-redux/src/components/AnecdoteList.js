import React from 'react'
import { connect } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  let anecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
  const filter = props.filter
  anecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = anecdote => {
    props.addVoteTo(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
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
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVoteTo,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)