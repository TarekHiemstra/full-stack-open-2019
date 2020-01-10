import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer.js'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`you successfully added '${content}'`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, showNotification, hideNotification })(AnecdoteForm)
