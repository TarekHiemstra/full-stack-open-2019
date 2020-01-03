# unicafe-redux

Let's make a simplified version of the unicafe-exercise from part 1. Let's handle the state management with Redux. 

You can take the project from this repository https://github.com/fullstackopen-2019/unicafe-redux for the base of your project. 

<i>Start by removing the git-configuration of the cloned repository, and by installing dependencies</i>

```bash
cd unicafe-redux   // go to the directory of cloned repository
rm -rf .git
npm install
```
## 6.1: unicafe revisited, step1

Before implementing the functionality of the UI, let's implement the functionality required by the store. 

We have to save the number of each kind of feedback to the store, so the form of the state in the store is: 

```js
{
  good: 5,
  ok: 4,
  bad: 2
}
```

The project has the following base for a reducer: 

```js
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
    case 'OK':
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return state
  }
  return state
}

export default counterReducer
```

and a base for its tests

```js
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})
```

**Implement the reducer and its tests.**

In the tests, make sure that the reducer is an <i>immutable function</i> with the <i>deep-freeze</i>-library. 
Ensure that the provided first test passes, because Redux expects that the reducer returns a sensible original state when it is called so that the first parameter <i>state</i>, which represents the previous state, is 
<i>undefined</i>.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality which they are testing. 

A good model for the reducer is the [redux-notes](https://fullstackopen.com/en/part6/flux_architecture_and_redux#pure-functions-immutable)
example above. 

## 6.2: unicafe revisited, step2

Now implement the actual functionality of the application.
