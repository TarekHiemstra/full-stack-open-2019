# bloglist-frontend

We will now create a frontend for the bloglist backend we created in the last part. You can use [this application](https://github.com/fullstackopen-2019/bloglist-frontend) from GitHub as the base of your solution. The application expects your backend to be running on port 3003. 

It is enough to submit your finished solution. You can do a commit after each exercise, but that is not necessary. 

The first few exercises revise everything we have learned about React so far. They can be challenging, especially if your backend is incomplete. 
It might be best to use the backend from model answers of part 4. 

While doing the exercises, remember all of the debugging methods we have talked about, especially keeping an eye on the console. 

**Warning:** If you notice you are mixing async/await and _then_ commands, its 99.9%  certain you are doing something wrong. Use either or, never both. 

## 5.1: bloglist frontend, step1

Clone the application from [Github](https://github.com/fullstackopen-2019/bloglist-frontend) with the command: 

```bash
git clone https://github.com/fullstackopen-2019/bloglist-frontend
```

<i>remove the git configuration of the cloned application</i>

```bash
cd bloglist-frontend   // go to cloned repository
rm -rf .git
```

The application is started the usual way, but you have to install its dependencies first: 

```bash
npm install
npm start
```

Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state <i>user</i>.

If a user is not logged in, <i>only</i> the login form is visible. 

![fullstack content](https://fullstackopen.com/static/7974958a48f7a4e873550b1b85bd8cbd/14be6/4e.png)

If user is logged in, the name of the user and a list of blogs is shown. 

![fullstack content](https://fullstackopen.com/static/62a606d23ac2c2c96918567b8a8c7b32/14be6/5e.png)

User details of the logged in user do not have to be saved to the local storage yet. 

**NB** You can implement the conditional rendering of the login form like this for example: 

```js
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
```

## 5.2: bloglist frontend, step2

Make the login 'permanent' by using the local storage. Also implement a way to log out. 

![fullstack content](https://fullstackopen.com/static/fa111e6eccf20340b5258c12553d2ea6/14be6/6e.png)

Ensure the browser does not remember the details of the user after logging out. 

## 5.3: bloglist frontend, step3


Expand your application to allow  a logged in user to add new blogs: 

![fullstack content](https://fullstackopen.com/static/b9f4cf7f481e4f1358be610031afe219/14be6/7e.png)


Form for adding blogs can be its own component which manages the input from the form fields with its state. All the state related to adding blogs can of course also be in the <i>App</i> component. 

## 5.4\*: bloglist frontend, step4

Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. For example, when a new blog is added, the following notification can be shown: 

![fullstack content](https://fullstackopen.com/static/58838a80180d9d94fb4bc3673a8a67c0/14be6/8e.png)

Failed login can show the following notification: 

![fullstack content](https://fullstackopen.com/static/5f30f6f454735133b39d706a3fa7f9c1/14be6/9e.png)

The notifications must be visible for a few seconds. It is not compulsory to add colors. 

## 5.5 Blog list frontend, step5

Change the form for creating blog posts so that it is only displayed when appropriate. Use functionality similar to what was shown [earlier in this part of the course material](https://fullstackopen.com/en/part5/props_children_and_proptypes#displaying-the-login-form-only-when-appropriate). If you wish to do so, you can use the <i>Togglable</i> component defined in part 5.

By default the form is not visible

![fullstack content](https://fullstackopen.com/static/de4cfabdf46a837f1f0bfdba4fd27d67/14be6/13ae.png)

It expands when button <i>new note</i> is clicked

![fullstack content](https://fullstackopen.com/static/0cb27abc7b56ba5ecdd7e9d48d325c87/14be6/13be.png)

## 5.6* Blog list frontend, step6

Modify the blog list so that all of the information about a blog post is  displayed when its name is clicked:

![fullstack content](https://fullstackopen.com/static/c658a3c24ac728ea66f34f631e121ac9/14be6/13e.png)

Clicking the name of an expanded blog post should hide the additional information.

At this point the <i>like</i> button does not need to do anything.

The application shown in the picture has a bit of additional CSS to improve its appearance.

It is easy to add styles to the application as shown in part 2 using [inline](https://fullstackopen.com/en/part2/adding_styles_to_react_app#inline-styles) styles:

```js
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => console.log('clicked')}>  // highlight-line
        {blog.title} {blog.author}
      </div>
      // ...
  </div>
)}
```

**NB1:** you can make the name of a blog post click-able as shown in the part of the code that is highlighted.

**NB2:** even though the functionality implemented in this part is almost identical to the functionality provided by the <i>Togglable</i> component, the component can not be used directly to achieve the desired behavior. The easiest solution will be to add state to the blog post that controls the displayed form of the blog post.

## 5.7\*: Blog list frontend, step7

Implement the functionality for the like button. Likes are increased by making an HTTP _PUT_ request to the unique address of the blog post in the backend.

Since the backend operation replaces the entire blog post, you will have to send all of its fields  in the request body. If you wanted to add a like to the following blog post:

```js
{
  _id: "5a43fde2cbd20b12a2c34e91",
  user: {
    _id: "5a43e6b6c37f3d065eaaa581",
    username: "mluukkai",
    name: "Matti Luukkainen"
  },
  likes: 0,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
},
```

You would have to make an HTTP PUT request to the address <i>/api/blogs/5a43fde2cbd20b12a2c34e91</i> with the following request data:

```js
{
  user: "5a43e6b6c37f3d065eaaa581",
  likes: 1,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
}
```

**One last warning:** if you notice that you are using async/await and the _then_-method in the same code, it is almost certain that you are doing something wrong. Stick to using one or the other, and never use both at the same time "just in case". 

## 5.8\*: Blog list frontend, step8

Modify the application to list the blog posts by the number of <i>likes</i>. Sorting the blog posts can be done with the array [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.

## 5.9\*: Blog list frontend, step9

Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend.

Your application could look something like this:

![fullstack content](https://fullstackopen.com/static/e4e859b8029a4375f89df9f497eaec55/14be6/14e.png)

The confirmation dialog for deleting a blog post is easy to implement with the [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) function.

## 5.10\*: Blog list frontend, step10

Show the button for deleting a blog post only if the blog post was added by the user.

## 5.11: Blog list frontend, step11

Define PropTypes for one of the components of your application.

## 5.12: Blog list frontend, step12

Add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

Create-react-app has installed ESlint to the project by default, so all that's left for you to do is to define your desired configuration in the <i>.eslintrc.js</i> file. 

*NB:* do not run the npm init command. It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!

## 5.13: Blog list tests, step1

Add the following component temporarily to your application:

```js
import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
```

Write a test that verifies that the component renders the title, author and amount of likes for the blog post.

If necessary, add CSS classes to the component for making testing easier.

## 5.14: Blog list tests, step2

Write a test that verifies that if the <i>like</i> button of a component is pressed twice, the event handler function passed in the component's props is called twice.

## 5.15\*: Blog list tests, step3

Write tests for the <i>Blog</i> component of your application that verify that only the name and author of the blog post are shown by default. Also verify that when the blog post is clicked, the other information of the blog post becomes visible.

## 5.16\*: Blog list tests, step4

Write an integration test for your application that verifies that if the user is not logged into the application, then the application only displays a login form and no blogs are rendered.

The test can wait for the content of the component to render with the _waitForElement_ function.

```js
import React from 'react'
import { 
  render, waitForElement 
} from '@testing-library/react' // highlight-line
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

// highlight-start
    await waitForElement(
      () => component.getByText('login')
    ) 
    // highlight-end

    // expectations here
  })
})
```

**WARNING**: When I was piloting this exercise, there were occasional instabilities related to _waitForElement_ or any other method intended for waiting for asynchronous operations to finish.

## 5.17\*: Blog list tests, step5

Write another test that verifies that when the user is logged in, the blog posts are rendered to the page.

**Hint:**

Logging in is best to implement by mocking and manipulating local storage in the tests. If you define a mocked local storage for the tests according to the instructions, you can then use it in your tests like this:

```js
const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
```

## 5.18: Blog list and hooks step1

Simplify the login form of your application with the _useField_ custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the <i>/src/hooks/index.js</i> file.

If you use the [named export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Description) instead of the default export:

```js
import { useState } from 'react'

export const useField = (type) => { // highlight-line
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// module can have several named exports
export const useAnotherHook = () => { // highlight-line
  // ...
}
```

Then [importing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) happens in the following way:

```js
import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```

## 5.19: Blog list and hooks step2

The <i>useField</i> hook has a defect. It does not offer any way of clearing the form field. Expand the functionality of the hook so that it offers a new <i>reset</i> operation for clearing the field. Also take the improved hook into use in the form for creating a new blog post.

The forms of your application will work after making the necessary changes. However, depending on your solution you may see the following warning in your console:

![fullstack content](https://fullstackopen.com/static/78b7bc5e4836f1cfe0bf6b2b36b1de03/14be6/22.png)

We will return to this warning in the next exercise.

## 5.20: Blog list and hooks step3


If your solution did not cause a warning to appear in the console you have already finished this exercise.

If you see the warning in the console, make the necessary changes to get rid of the `Invalid value for prop reset' on <input> tag` console warning. 

The reason for this warning is that after making the changes to your application, the following expression:

```js
<input {...username}/>
```

Essentially, is the same as this:

```js
<input
  value={username.value} 
  type={username.type}
  onChange={username.onChange}
  reset={username.reset} // highlight-line
/>
```

The <i>input</i> element should not be given a <i>reset</i> attribute.

One simple fix would be to not use the spread syntax and write all of the forms like this:

```js
<input
  value={username.value} 
  type={username.type}
  onChange={username.onChange}
/>
```

If we were to do this we would lose much of the benefit provided by the <i>useField</i> hook. Instead, come up with a solution that fixes the issue, but is still easy to use with spread syntax.

## 5.21\*: ultimate hooks

The code of the application responsible for communicating with the backend of the note application looks like this:

```js
import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
```

We notice that the code is in no way specific to the fact that our application deals with notes. Excluding the value of the _baseUrl_ variable, the same code could be reused in the blog post application for dealing with the communication with the backend.

Extract the code for communicating with the backend into its own _useResource_ hook. It is sufficient to implement fetching all resources and creating a new resource.

You can do the exercise for the project found in the https://github.com/fullstackopen-2019/custom-hooks repository. The <i>App</i> component for the project is the following:

```js
const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}
```

The _useResource_ custom hook returns an array of two items just like the state hooks. The first item of the array contains all of the individual resources and the second item of the array is an object that can be used for manipulating the resource collection, like creating new ones.

If you implement the hook correctly, it can be used for both notes and phone numbers (start the server with the _npm run server_ command at the port 3005).

![fullstack content](https://fullstackopen.com/static/101f0d62e315b6b8a02a14365cd3652d/14be6/21e.png)

This was the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the [exercise submission system](https://studies.cs.helsinki.fi/fullstackopen2019).
