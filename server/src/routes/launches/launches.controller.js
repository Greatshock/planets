import { getAllLaunches } from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
  return res.json(getAllLaunches());
}

export { httpGetAllLaunches };
