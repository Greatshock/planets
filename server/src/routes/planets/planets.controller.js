import { planets } from '../../models/planets.model.js';

function getAllPlanets(req, res) {
  // return is just to make sure our function stops
  // executing, because if we will try to call send or
  // json functions multiple times, express will
  // throw error
  return res.json(planets);
}

export { getAllPlanets };
