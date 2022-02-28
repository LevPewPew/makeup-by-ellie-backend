const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const Service = require('../models/service');

beforeAll(async () => {
  const url = process.env.DB_URL;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Tests for root route', () => {
  it('Checking for response from backend root route', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome');
    done();
  });
});

describe('Tests for question route', () => {
  it('Checking for status:200 response from /question route', async (done) => {
    const response = await request.get('/questions');
    expect(response.status).toBe(200);
    done();
  });
});

describe('Tests for portfolio route', () => {
  it('Checking for status:200 response from /portfolio route', async (done) => {
    const response = await request.get('/portfolio');
    expect(response.status).toBe(200);
    done();
  });
});

describe('Tests for services route', () => {
  it('Checking for status:200 response from /services route', async (done) => {
    const response = await request.get('/services');
    expect(response.status).toBe(200);
    done();
  });

  it('Should check for a particular category', async (done) => {
    const category = await Service.findOne({ title: 'EVENT/SPECIAL OCCASION MAKE' });
    console.log(category);
    done();
  });
});

describe('Tests for admin-login route', () => {
  it('Check for correct admin login - Should return 200 OK response', async (done) => {
    const response = await request.post('/admin-login').send({
      username: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PASSWORD,
    });
    expect(response.status).toBe(200);
    done();
  });

  it('Check for incorrect admin login - Should return 403 Forbidden response', async (done) => {
    const response = await request.post('/admin-login').send({
      username: 'admin',
      password: 'test111',
    });
    expect(response.body.status).toBe(403);
    done();
  });
});

it('Check for incorrect path response', async (done) => {
  const response = await request.get('/incorrect-path');
  expect(response.status).toBe(404);
  done();
});

describe('Tests for contact route', () => {
  it('Checking for status:200 response from /contact route', async (done) => {
    const response = await request.get('/contact');
    expect(response.status).toBe(200);
    done();
  });

  it('Contact form submission should send back status 200 for correct form entries ', async (done) => {
    const response = await request.post('/contact').send({
      name: 'Pankaj Pawar',
      mobile: '45628281',
      email: 'abc@test.com',
      eventDate: '2020-02-01',
      serviceType: 'Bridal',
      totalPeopleMakeup: 1,
      totalPeopleHair: 1,
      timeToFinish: '12pm',
      howDidYouHear: 'Google',
      addedQuestionsOrInfo: 'None',
    });
    expect(response.status).toBe(200);
    done();
  });

  it('Contact form submission should send back status 400 for incorrect form entries ', async (done) => {
    const response = await request.post('/contact').send({
      name: 'admin',
      password: 'test111',
    });
    expect(response.status).toBe(400);
    done();
  });
});
