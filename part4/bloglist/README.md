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

You are bound to run into problems while writing tests. Remember the things that we learned about [debugging](/en/part3/saving_data_to_mongo_db#debugging-node-applications) in part 3. You can print things to the console with _console.log_ even during test execution. It is even possible to use the debugger while running tests, you can find instructions for that [here](https://jestjs.io/docs/en/troubleshooting).

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

