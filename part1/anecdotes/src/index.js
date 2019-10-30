import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = (props) => <div><h1>{props.title}</h1>{anecdotes[props.index]}<br />has {props.points[props.index]} votes</div>  
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [points, setPoints] = useState(new Array(anecdotes.length +1).join('0').split('').map(parseFloat))
  const [selected, setSelected] = useState(Math.floor(Math.random() *  anecdotes.length))
  
  const mostVotes = points.indexOf(Math.max(...points))

  const handleVote = () => { 
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  
  const handleNextAnecdote = () => {
    let n = selected
    // Make sure the next anecdote is never the same
    while (n === selected) { 
      n = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(n)
  }
  
  return (
    <div>
      <Anecdote title='Anecdote of the day' index={selected} points={points} />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
      <Anecdote title='Anecdote with most votes' index={mostVotes} points={points} />
    </div>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// console.log(_.max(anecdotes, function(anecdote){ return (anecdote.votes); }).votes;)
console.log(Math.floor(Math.random() * 6 ) +10)
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
