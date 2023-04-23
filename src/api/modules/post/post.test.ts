import request from 'supertest'
import app from '../../../app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { token } from '../blog/blog.test'
import { Post } from './post.schema'
import mongoose from 'mongoose'

let createdPost: Post
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI || '')
  console.log('Connected to MongoDB')
})

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close()
})

describe('POST /posts', () => {
  it('responds with 401 if no auth header was found', () => {
    return request(app)
      .post('/posts')
      .set('Accept', 'application/json')
      .send({
        title: 'string',
      })
      .expect(401)
  })

  it('responds with an error if the post is invalid', () => {
    return request(app)
      .post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('errorsMessages')
      })
  })

  it('responds with the created post', async () => {
    const blogs = await request(app).get('/blogs')
    return request(app)
      .post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        title: 'string',
        shortDescription: 'string',
        content: 'string',
        blogId: blogs.body[0].id,
      })
      .expect(201)
      .then((response) => {
        createdPost = response.body
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
      })
  })
})

describe('GET /posts', () => {
  it('responds with an array of posts', () => {
    return request(app)
      .get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array<Post>)
        console.log(response.body)
      })
  })
})

describe('GET /posts/:id', () => {
  it('responds with a post', () => {
    return request(app)
      .get(`/posts/${createdPost.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('content')
        expect(response.body).toHaveProperty('blogId')
        expect(response.body).toHaveProperty('blogName')
      })
  })
})

describe('PUT /posts/:id', () => {
  it('responds with an error if the post is invalid', () => {
    return request(app)
      .put(`/posts/${createdPost.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('errorsMessages')
      })
  })

  it('responds with the updated post', () => {
    return request(app)
      .put(`/posts/${createdPost.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        title: 'string',
        shortDescription: 'string',
        content: 'string',
        blogId: 'string',
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('content')
        expect(response.body).toHaveProperty('blogId')
        expect(response.body).toHaveProperty('blogName')
      })
      .catch((error) => {
        console.log(JSON.stringify(error.message))
      })
  })
})
