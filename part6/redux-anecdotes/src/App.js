import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {

  return (
    <div>
      <h1>redux-anecdotes</h1>
      <Notification store={props.store} />
      <h2>create new</h2>
      <AnecdoteForm store={props.store} />
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App
