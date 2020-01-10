import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer.js'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.showNotification(`You voted '${anecdote.content}'`, 10)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
