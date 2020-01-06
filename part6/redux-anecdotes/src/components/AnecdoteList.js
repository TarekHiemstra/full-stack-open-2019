import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = ({ store }) => {

  const anecdotes = store.getState().anecdotes

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(
      addVote(id)
    )
    const anecdote = store.getState().anecdotes.find(n => n.id === id)
    store.dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

export default AnecdoteList


