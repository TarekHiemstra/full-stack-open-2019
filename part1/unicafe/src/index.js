import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({total, good, neutral, bad}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value ={total} />
          <Statistic text="average" value ={(good - bad) / total} />
          <Statistic text="positive" value ={(good /total * 100) + ' %'}  />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {setTotal(total + 1); setGood(good +1);}
  const handleNeutralClick = () => {setTotal(total + 1); setNeutral(neutral +1);}
  const handleBadClick = () => {setTotal(total + 1); setBad(bad +1);}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

