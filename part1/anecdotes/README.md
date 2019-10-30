# anecdotes
## 1.12\*: anecdotes step1
The world of software engineering is filled with anecdotes that distill timeless truths from our field into short one-liners.

Expand the following application by adding a button that can be clicked to display a random anecdote from the field of software engineering:

```javascript
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {props.anecdotes[selected]}
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
```

Google will tell you how to generate random numbers in JavaScript. Remember that you can test generating random numbers e.g. straight in the console of your browser.

Your finished application could look something like this:

![fullstack content](https://fullstackopen.com/static/8577fa00fc4d946e2322de9b2707c89c/14be6/18a.png)

WARNING create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. Most likely you do not want each of your project to be a separate repository, so simply run the rm -rf .git command at the root of your application.

## 1.13\*: anecdotes step2
Expand your application so that you can vote for the displayed anecdote.

![fullstack content](https://fullstackopen.com/static/06f95cb43a18bd6429174200a8d17cff/14be6/19a.png)

NB if you decide to store the votes of each anecdote into an array or object in the component's state, you should refer to the material to see the correct way of updating state stored in complex data structures like objects and arrays.

You can create a copy of an object like this:

```javascript
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1
```

OR a copy of an array like this:

```javascript
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1
```
 
Using an array might be the simpler choice in this case. Googling will provide you with lots of hints on how to create a zero-filled array of a desired length, like this.

## 1.14\*: anecdotes step3
Now implement the final version of the application that displays the anecdote with the largest number of votes:

![fullstack content](https://fullstackopen.com/static/3e8638efbbbbcabac7bb79466ab3a5f6/14be6/20a.png)

If multiple anecdotes are tied for first place it is sufficient to just show one of them.
