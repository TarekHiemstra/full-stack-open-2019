In the exercises for this part we will be building a <i>blog list application</i>, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application.

## 4.1 Blog list, step1

Let's imagine a situation, where you receive an email that contains the following application body:

```js
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

Turn the application into a functioning <i>npm</i> project. In order to keep your development productive, configure the application to be executed with <i>nodemon</i>. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

Verify that it is possible to add blogs to list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

## 4.2 Blog list, step2

Refactor the application into separate modules as shown earlier in this part of the course material.

**NB** refactor your application in baby steps and verify that the application works after every change you make. If you try to take a "shortcut" by refactoring many things at once, then [Murphy's law](https://en.wikipedia.org/wiki/Murphy%27s_law) will kick in and it is almost certain that something will break in your application. The "shortcut" will end up taking more time than moving forward slowly and systematically.

One best practice is to commit your code every time it is in a stable state. This makes it easy to rollback to a situation where the application still works.

Let's create a collection of helper functions that are meant to assist dealing with the blog list. Create the functions into a file called <i>utils/list_helper.js</i>. Write your tests into an appropriately named test file under the <i>tests</i> directory.


## 4.3: helper functions and unit tests, step1

First define a _dummy_ function that receives an array of blog posts as a parameter and always returns the value 1. The contents of the <i>list_helper.js</i> file at this point should be the following:

```js
const dummy = (blogs) => {
  // ...
}

module.exports = {
  dummy
}
```

Verify that your test configuration works with the following test:

```js
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
```

## 4.4: helper functions and unit tests, step2

Define a new _totalLikes_ function that receives a list of blog posts as a parameter. The function returns the total sum of <i>likes</i> in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a <i>describe</i> block, so that the test report output gets grouped nicely:

![fullstack content](https://fullstackopen.com/static/56229b0710f038d818828ad82ff10bfd/14be6/5.png)

Defining test inputs for the function can be done like this:

```js
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})
```

If defining your own test input list of blogs is too much work, you can use the ready-made list [here](https://github.com/fullstackopen-2019/misc/blob/master/blogs_for_test.md).

You are bound to run into problems while writing tests. Remember the things that we learned about [debugging](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#debugging-node-applications) in part 3. You can print things to the console with _console.log_ even during test execution. It is even possible to use the debugger while running tests, you can find instructions for that [here](https://jestjs.io/docs/en/troubleshooting).

**NB:** if some test is failing, then it is recommended to only run that test while you are fixing the issue. You can run a single test with the [only](https://facebook.github.io/jest/docs/en/api.html#testonlyname-fn-timeout) method.

Another way of running a single test (or describe block) is to run Jest from the command line and to specify the name of the test to be run with the [-t](https://jestjs.io/docs/en/cli.html) flag:

```js
npx jest -t 'when list has only one blog equals the likes of that'
```

## 4.5\*: helper functions and unit tests, step3

Define a new _favoriteBlog_ function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

The value returned by the function could be in the following format:

```js
{
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12
}
```

**NB** when you are comparing objects, the [toEqual](https://jestjs.io/docs/en/expect#toequalvalue) method is probably what you want to use, since the [toBe](https://jestjs.io/docs/en/expect#tobevalue) tries to verify that the two values are the same value, and not just that they contain the same properties.

Write the tests for this exercise inside of a new <i>describe</i> block. Do the same for the remaining exercises as well.

## 4.6\*: helper functions and unit tests, step4

This and the next exercise are a little bit more challenging. Finishing these two exercises is not required in order to advance in the course material, so it may be a good idea to return to these once you're done going through the material for this part in its entirety.

Finishing this exercise can be done without the use of additional libraries. However, this exercise is a great opportunity to learn how to use the [Lodash](https://lodash.com/) library.

Define a function called _mostBlogs_ that receives an array of blogs as a parameter. The function returns the <i>author</i> who has the largest amount of blogs. The return value also contains the number of blogs the top author has:

```js
{
  author: "Robert C. Martin",
  blogs: 3
}
```

If there are many top bloggers, then it is enough to return any one of them.

## 4.7\*: helper functions and unit tests, step5

Define a function called _mostLikes_ that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:

```js
{
  author: "Edsger W. Dijkstra",
  likes: 17
}
```

If there are many top bloggers, then it is enough to show any one of them.

**NB:** the material uses the [toContain](https://facebook.github.io/jest/docs/en/expect.html#tocontainitem) matcher in several places to verify that an array contains a specific element. It's worth noting that the method uses the === operator for comparing and matching elements, which means that it is often not well-suited for matching objects. In most cases, the appropriate method for verifying objects in arrays is the [toContainEqual](https://facebook.github.io/jest/docs/en/expect.html#tocontainequalitem) matcher. However, the model solutions don't check for objects in arrays with matchers, so using the method is not required for solving the exercises.


**Warning:** If you find yourself using async/await and <i>then</i> methods in the same code, it is almost guaranteed that you are doing something wrong. Use one or the other and don't mix the two.

## 4.8: Blog list tests, step1

Use the supertest package for writing a test that makes an HTTP GET request to the <i>/api/blogs</i> url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made [in the material](https://fullstackopen.com/en/part4/testing_the_backend#test-environment), like defining the test environment so that you can write tests that use their own separate database.

**NB:** When running the tests, you may run into the following warning:

![fullstack content](https://fullstackopen.com/static/e8bcb367be162a9be3c71b7f47d855a2/14be6/8a.png)

If this happens, follow the [instructions](https://mongoosejs.com/docs/jest.html) and create a new <i>jest.config.js</i> file at the root of the project with the following contents:

```js
module.exports = {
  testEnvironment: 'node'
}
```

**NB:** when you are writing your tests **<i>it is better to not execute all of your tests</i>**, only execute the ones you are working on. Read more about this [here](https://fullstackopen.com/en/part4/testing_the_backend#running-tests-one-by-one).

## 4.9\*: Blog list tests, step2

Write a test that verifies that the unique identifier property of the blog posts is named <i>id</i>, by default the database names the property <i>\_id</i>. Verifying the existence of a property is easily done with Jest's [toBeDefined](https://jestjs.io/docs/en/expect#tobedefined) matcher.

Make the required changes to the code so that it passes the test. The [toJSON](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#backend-connected-to-a-database) method discussed in part 3 is an appropriate place for defining the <i>id</i> parameter.

## 4.10: Blog list tests, step3

Write a test that verifies that making an HTTP POST request to the <i>/api/blogs</i> url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await instead of promises.

## 4.11\*: Blog list tests, step4

Write a test that verifies that if the <i>likes</i> property is missing from the request, it will default to the value 0. Do not test the other properties of the created blogs yet.

Make the required changes to the code so that it passes the test.

## 4.12\*: Blog list tests, step5

Write a test related to creating new blogs via the <i>/api/blogs</i> endpoint, that verifies that if the <i>title</i> and <i>url</i> properties are missing from the request data, the backend responds to the request with the status code <i>400 Bad Request</i>.

Make the required changes to the code so that it passes the test.

## 4.13 Blog list expansions, step1

Implement functionality for deleting a single blog post resource.

Use the async/await syntax. Follow [RESTful](https://fullstackopen.com/en/part3/node_js_and_express#rest) conventions when defining the HTTP API.

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

## 4.14 Blog list expansions, step2

Implement functionality for updating the information of an individual blog post.

Use async/await.

The application mostly needs to update the amount of <i>likes</i> for a blog post. You can implement this functionality the same way that we implemented updating notes in [part 3](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#other-operations).

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

In the next exercises, basics of user management will be implemented for the Bloglist application. The safest way is to follow the story from part 4 chapter [User administration](https://fullstackopen.com/en/part4/user_administration) to the chapter [Token-based authentication](https://fullstackopen.com/en/part4/token_authentication). You can of course also use your creativity. 

**One more warning:** If you notice you are mixing async/await and _then_ calls, it is 99% certain you are doing something wrong. Use either or, never both. 

## 4.15: bloglist expansion, step4

Implement a way to create new users by doing a HTTP POST-request to address <i>api/users</i>. Users have <i>username
, password and name</i>.

Do not save passwords to the database as clear text, but use the <i>bcrypt</i> library like we did in part 4 chapter [Creating new users](https://fullstackopen.com/en/part4/user_administration#creating-users).

**NB** Some Windows users have had problems with <i>bcrypt</i>. If you run into problems, remove the library with command 

```bash
npm uninstall bcrypt --save 
```

and install [bcryptjs](https://www.npmjs.com/package/bcryptjs) instead. 

Implement a way to see the details of all users by doing a suitable HTTP request. 

List of users can for example, look as follows: 

![fullstack content](https://fullstackopen.com/static/b59bda1bd7e5987a5c805332d509e516/14be6/22.png)

## 4.16\*: bloglist expansion, step5

Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique. 

The operation must respond with a suitable status code and some kind of an error message if invalid user is created. 

**NB** Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing. The password length should be validated in the controller like we did in [part 3](https://fullstackopen.com/en/part3/validation_and_es_lint) before using Mongoose validation. 

Also, implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message. 

## 4.17: bloglist expansion, step6

Expand blogs so that each blog contains information on the creator of the blog. 

Modify adding new blogs so that when a new blog is created,  <i>any</i> user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter [populate](https://fullstackopen.com/en/part4/user_administration#populate).
Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19. 

Modify listing all blogs so that the creator's user information is displayed with the blog: 

![fullstack content](https://fullstackopen.com/static/199682ad74f50747c90997a967856ffa/14be6/23e.png)

and listing all users also displays the blogs created by each user: 

![fullstack content](https://fullstackopen.com/static/ac9967c89785b33440e9b1b4e87c17e5/14be6/24e.png)

## 4.18: bloglist expansion, step7

Implement token-based authentication according to part 4 chapter [Token authentication](https://fullstackopen.com/en/part4/token_authentication).

## 4.19: bloglist expansion, step8

Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog. 

## 4.20\*: bloglist expansion, step9

[This example](https://fullstackopen.com/en/part4/token_authentication) from part 4 shows taking the token from the header with the _getTokenFrom_ helper function.

If you used the same solution, refactor taking the token to a [middleware](https://fullstackopen.com/en/part3/node_js_and_express#middleware). The middleware should take the token from the <i>Authorization</i> header and place it to the <i>token</i> field of the <i>request</i> object. 

In other words, if you register this middleware in the <i>app.js</i> file before all routes

```js
app.use(middleware.tokenExtractor)
```

routes can access the token with _request.token_:
```js
blogsRouter.post('/', async (request, response) => {
  // ..
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // ..
})
```

## 4.21\*: bloglist expansion, step10

Change the delete blog operation so that a blog can be deleted only by the user who added the blog. Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator. 

If deleting a blog is attempted without a token or by a wrong user, the operation should return a suitable status code. 

Note that if you fetch a blog from the database,

```js
const blog = await Blog.findById(...)
```

the field <i>blog.user</i> does not contain a string, but an Object. So if you want to compare the id of the object fetched from the database and a string id, normal comparison operation does not work. The id fetched from the database must be parsed into a string first. 

```js
if ( blog.user.toString() === userid.toString() ) ...
```

This is the last exercise for this part of the course and it's time to push your code to GitHub and mark all of your finished exercises to the [exercise submission system](https://studies.cs.helsinki.fi/fullstackopen2019).
