import request from 'supertest';
import app from '../../app.js';

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: 'Test Mission',
    rocket: 'Test',
    target: 'Kepler-442 b',
    launchDate: 'January 28, 2030',
  };

  const launchDataWithoutDate = { ...completeLaunchData };
  delete launchDataWithoutDate.launchDate;

  const launchDataWithInvalidDate = { ...completeLaunchData };
  launchDataWithInvalidDate.launchDate = 'some gibberish';

  test('It should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toMatchObject(launchDataWithoutDate);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
  });

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid date format passed as launchDate',
    });
  });
});
