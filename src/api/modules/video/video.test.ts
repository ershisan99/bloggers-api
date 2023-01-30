import request from 'supertest';
import app from '../../../app';
import { it, describe, expect } from 'vitest';
import { Video } from './video.schema';

let createdVideo:Video;


describe('POST /videos', () => {
  it('responds with an error if the video is invalid', () => {
    return request(app)
      .post('/videos')
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('errorMessages');
      });
  });
  it('responds with the created video', () => {
    return request(app)
      .post('/videos')
      .set('Accept', 'application/json')
      .send({
        title: 'string',
        author: 'string',
        availableResolutions: ['P144'],
      })
      .expect(201)
      .then((response) => {
        createdVideo = response.body;
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('publicationDate');
        expect(response.body).toHaveProperty('canBeDownloaded');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('author');
        expect(response.body).toHaveProperty('availableResolutions');
      });
  });
});

describe('GET /videos', () => {
  it('responds with an array of videos', () => {
    return request(app)
      .get('/videos')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([createdVideo]);
      });
  });
});

describe('GET /videos/:id', () => {
  it('responds with an error if the video is not found', () => {
    return request(app)
      .get('/videos/4000')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('errorMessages');
      });
  });
  it('responds with the video', () => {
    return request(app)
      .get(`/videos/${createdVideo.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(createdVideo);
      });
  });
});

describe('PUT /videos/:id', () => {
  it('responds with an error if the video is not found', () => {
    return request(app)
      .put('/videos/4000')
      .set('Accept', 'application/json')
      .send({
        'title': 'string',
        'author': 'string',
        'availableResolutions': [
          'P144',
        ],
        'canBeDownloaded': true,
        'minAgeRestriction': 18,
        'publicationDate': '2023-01-30T11:05:56.132Z',
      })
      .expect(404);
  });
  it('responds with an error if the video is invalid', () => {
    return request(app)
      .put(`/videos/${createdVideo.id}`)
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('errorMessages');
      });
  });

  it('responds with 204 status', () => {
    return request(app)
      .put(`/videos/${createdVideo.id}`)
      .set('Accept', 'application/json')
      .send({
        'title': 'string',
        'author': 'string',
        'availableResolutions': [
          'P144',
        ],
        'canBeDownloaded': true,
        'minAgeRestriction': 18,
        'publicationDate': '2023-01-30T11:05:56.132Z',
      })
      .expect(204);
  });
});

describe('DELETE /videos/:id', () => {
  it('responds with an error if the video is not found', () => {
    return request(app)
      .delete('/videos/4000')
      .set('Accept', 'application/json')
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('errorMessages');
      });
  });
  it('responds with 204 status', () => {
    return request(app)
      .delete(`/videos/${createdVideo.id}`)
      .set('Accept', 'application/json')
      .expect(204);
  });
});