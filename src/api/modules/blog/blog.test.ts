import request from 'supertest'
import app from '../../../app'
import { it, describe, expect, beforeAll } from 'vitest'
import { Blog } from './blog.schema'

let createdBlog: Blog

const updatedBlog = {
  name: 'new string',
  description: 'new description',
  websiteUrl: 'https://something-else.org',
}

export const token = 'Basic YWRtaW46cXdlcnR5'
beforeAll(() => {
  request(app).delete('testing/')
})

describe('POST /blogs', () => {
  it('responds with an error if the blog is invalid', () => {
    return request(app)
      .post('/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('errorsMessages')
      })
  })
  it('responds with the created blog', () => {
    return request(app)
      .post('/blogs')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        name: 'string',
        description: 'string',
        websiteUrl: 'https://something.org',
      })
      .expect(201)
      .then((response) => {
        console.log(response.body)
        createdBlog = response.body
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('description')
        expect(response.body).toHaveProperty('websiteUrl')
      })
  })
})

describe('GET /blogs', () => {
  it('responds with an array of blogs', () => {
    return request(app)
      .get('/blogs')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([createdBlog])
      })
  })
})

describe('GET /blogs/:id', () => {
  it('responds with an error if the blog is not found', () => {
    return request(app)
      .get('/blogs/4000')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        expect(response.body.errorsMessages).toHaveLength(1)
      })
  })
  it('responds with the blog', () => {
    return request(app)
      .get(`/blogs/${createdBlog.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(createdBlog)
      })
  })
})

describe('PUT /blogs/:id', () => {
  it('responds with 401 if no auth header wad found', () => {
    return request(app)
      .put(`/blogs/${createdBlog.id}`)
      .set('Accept', 'application/json')
      .send(updatedBlog)
      .expect(401)
  })
  it('responds with an error if the blog is not found', () => {
    return request(app)
      .put('/blogs/4000')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send(updatedBlog)
      .expect(404)
      .then((response) => {
        expect(response.body.errorsMessages).toHaveLength(1)
      })
  })
  it('responds with the updated blog', () => {
    return request(app)
      .put(`/blogs/${createdBlog.id}`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .send(updatedBlog)
      .expect(204)
  })
})

describe('DELETE /blogs/:id', () => {
  it('responds with 401 if no auth header wad found', () => {
    return request(app)
      .delete(`/blogs/${createdBlog.id}`)
      .set('Accept', 'application/json')
      .expect(401)
  })
  it('responds with an error if the blog is not found', () => {
    return request(app)
      .delete('/blogs/4000')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect(404)
      .then((response) => {
        expect(response.body.errorsMessages).toHaveLength(1)
      })
  })
  it('responds with 204', () => {
    return request(app)
      .delete(`/blogs/${createdBlog.id}`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect(204)
  })
})
