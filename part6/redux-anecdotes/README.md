# redux-anecdotes

Let's make a new version of the anecdote voting application from part 1. Take the project from this repository https://github.com/fullstackopen-2019/redux-anecdotes to base your solution on.  

If you clone the project into an existing git-repository, <i>remove the git-configuration of the cloned application:</i> 

```bash
cd redux-anecdotes  // go to the cloned repository
rm -rf .git
```

The application can be started as usual, but you have to install the dependencies first: 

```bash
npm install
npm start
```

After completing these exercises, your application should look like this

![fullstack content](https://fullstackopen.com/static/3355cef5793e5407ab7fc33e79195749/14be6/3.png)

## 6.3: anecdotes, step1

Implement the functionality for voting anecdotes. The amount of votes must be saved to a Redux-store.

## 6.4: anecdotes, step2

Implement the functionality for adding new anecdotes. 

You can keep the form uncontrolled, like we did [earlier](http://fullstackopen.com/en/part6/flux_architecture_and_redux#uncontrolled-form).

## 6.5\*: anecdotes, step3

Make sure that the anecdotes are ordered by the number of votes. 

## 6.6: anecdotes, step4

If you haven't done so already, separate the creation of action-objects to [action creator](https://redux.js.org/basics/actions#action-creators)-functions and place them in the <i>src/reducers/anecdoteReducer.js</i> file, so do like we have been doing since the chapter [action creators](http://fullstackopen.com/en/part6/flux_architecture_and_redux#action-creators).

## 6.7: anecdotes, step5

Separate the creation of new anecdotes into its own component called <i>AnecdoteForm</i>. Move all logic for creating a new anecdote into this new component. 

## 6.8: anecdotes, step6

Separate the rendering of the anecdote list into its own component called <i>AnecdoteList</i>. Move all logic related to voting for an anecdote to this new component. 

Now the <i>App</i> component should look like this: 

```js
import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App
```

Let's continue working on the anecdote application using redux that we started in exercise 6.3. 

## 6.9 Better anecdotes, step7

The application has a ready-made body for the <i>Notification</i> component:

```js
import React from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification
```

Extend the component so that it renders the message stored in the redux store, making the component to take the form:

```js
return (
  <div style={style}>
    {props.store.getState()...}
  </div>
)
```

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality and refactor the application so that it uses a combined reducer as shown in this part of the course material.

The application does not have to use the <i>Notification</i> component in any intelligent way at this point in the exercises. It is enough for the application to display the initial value set for the message in the <i>notificationReducer</i>.

## 6.10 Better anecdotes, step8

Extend the application so that it uses the <i>Notification</i> component to display a message for the duration of five seconds when the user votes for an anecdote or creates a new anecdote:

![fullstack content](https://fullstackopen.com/static/d9d7eaf648d19139688a74f46bf81345/14be6/8.png)

It's recommended to create separate [action creators](https://redux.js.org/basics/actions#action-creators) for setting and removing notifications.

## 6.11\* Better anecdotes, step9

Implement filtering for the anecdotes that are displayed to the user.

![fullstack content](https://fullstackopen.com/static/917583564ed10ded183150adc849659f/14be6/9.png)

Store the state of the filter in the redux store. It is recommended to create a new reducer and action creators for this purpose.

Create a new <i>Filter</i> component for displaying the filter. You can use the following code as a template for the component:

```js
import React from 'react'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
```

## 6.12 Better anecdotes, step10

The <i>redux store</i> is currently passed to all of the components through props.

Add the [react-redux](https://github.com/reactjs/react-redux) package to your application, and modify the <i>AnecdoteList</i> so that it accesses the store's state with the help of the _connect_ function.

Voting for and creating new anecdotes **does not need to work** after this exercise.

The <i>mapStateToProps</i> function you will need in this exercise is approximately the following:

```js
const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
```

## 6.13 Better anecdotes, step11

Do the same for the <i>Filter</i> and <i>AnecdoteForm</i> components.

## 6.14 Better anecdotes, step12.

Change the <i>AnecdoteList</i> component so that the voting for anecdotes works again, and also refactor the <i>Notification</i> component to use connect.

Remove the redundant passing of the store's state via props by simplifying the <i>App</i> component into the following form:

```js
const App = () => {
  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}
```

## 6.15\* Better anecdotes, step13

Change your application so that the <i>AnecdoteList</i> component only receives a single prop based on the store's state. Construct the filtered list of anecdotes as shown in the [Presentational/Container revisited](https://fullstackopen.com/en/part6/many_reducers_connect#presentational-container-revisited) section in this part of the course material.

As a result, the <i>AnecdoteList</i> component should get simplified into the following form:

```js
const AnecdoteList = (props) => {
  const vote = (id) => {
    // ...
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => // highlight-line
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
```

## 6.16 Anecdotes and the backend, step1

When the application launches, fetch the anecdotes from the backend implemented using json-server.

As the initial backend data, you can use, e.g. [this](https://github.com/fullstackopen-2019/misc/blob/master/anecdotes.json).

## 6.17 Anecdotes and the backend, step2

Modify the creation of new anecdotes, such that the anecdotes are stored in the backend.

## 6.18 Anecdotes and the backend, step3

Modify the initialization of redux-store to happen using asynchronous action creators, which are made possible by the <i>redux-thunk</i>-library.

## 6.19 Anecdotes and the backend, step4

Also modify the creation of a new anecdote to happen using asynchronous action creators, made possible by the <i>redux-thunk</i>-library.

## 6.20 Anecdotes and the backend, step5

Voting does not yet save changes to the backend. Fix the situation with the help of the <i>redux-thunk</i>-library.

## 6.21 Anecdotes and the backend, step6

The creation of notifications is still a bit tedious, since one has to do two actions and use the _setTimeout_ function:

```js
props.setNotification(`you voted '${anecdote.content}'`)
setTimeout(() => {
  props.clearNotification()
}, 5000)
```

Make an asynchronous action creator, which enables one to provide the notification as follows:

```js
props.setNotification(`you voted '${anecdote.content}'`, 10)
```

the first parameter is the text to be rendered and the second parameter is the time to display the notification given in seconds. 

Implement the use of this improved notification in your application.

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the [exercise submission system](https://studies.cs.helsinki.fi/fullstackopen2019).
