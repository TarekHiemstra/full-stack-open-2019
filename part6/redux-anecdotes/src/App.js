import React from 'react';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      {props.store.getState().notification !== null &&
      <Notification store={props.store} />}
      <AnecdoteForm store={props.store} />
      <AnecdoteList />
    </div>
  )
}

export default App
