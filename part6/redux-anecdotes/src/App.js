import React from 'react';
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.notification !== null &&
      <Notification />}
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      notification: state.notification
    }
}

export default connect(mapStateToProps)(App)
