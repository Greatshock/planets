import express from 'express';
import cors from 'cors';

import planetsRouter from './routes/planets/planets.router.js';

const app = express();

const corsWhitelist = ['http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS'));
      }
    },
  })
);
app.use(express.json());
app.use(planetsRouter);

export default app;
