import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes
  const filter = props.filter

  const vote = (id) => {
    store.dispatch(
      addVote(id)
    )
    const anecdote = anecdotes.find(n => n.id === id)
    store.dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}


export default connect(mapStateToProps)(AnecdoteList)
