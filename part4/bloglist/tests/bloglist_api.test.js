const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Blog model', () => {
  describe('GET requests', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are five blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('POST requests', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).toContain(
        'Type wars'
      )
    })

    test('if likes property is missing, it will get value 0', async() => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(n => n.likes)
      expect(likes).not.toContain(undefined)
    })

    test('if backend responds with 400 if title and url are missing', async() => {
      const newBlog = {
        _id: '5a422bc61b54a676234d17fc',
        author: 'Robert C. Martin',
        likes: 2,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      const id = blogsAtEnd.map(n => n.id)
      expect(id).not.toContain('5a422bc61b54a676234d17fc')
    })
  })

  describe('PUT requests', () => {
    test('succeeds with valid data', async () => {
      // Update the blog from 12 to 1000 likes.
      const updatedBlog = {
        'title': 'Canonical string reduction',
        'author': 'Edsger W. Dijkstra',
        'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        'likes': 1000
      }

      await api
        .post('/api/blogs')
        .send(updatedBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      const contents = blogsAtEnd.map(n => n.likes)
      expect(contents).toContain(updatedBlog.likes)
    })
  })

  describe('DELETE requests', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
      const contents = blogsAtEnd.map(r => r.id)
      expect(contents).not.toContain(blogToDelete.id)
    })
  })
})

describe('User model', () => {
  describe('GET requests', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user1 = new User({ username: 'user1', password: 'password1' })
      const user2 = new User({ username: 'user2', password: 'password2' })
      const user3 = new User({ username: 'user3', password: 'password3' })
      await user1.save()
      await user2.save()
      await user3.save()
    })

    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are three users', async () => {
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(3)
    })

    test('the unique identifier property of the user is named id', async () => {
      const response = await api.get('/api/users')
      expect(response.body[0].id).toBeDefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
