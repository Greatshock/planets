import {
  addNewLaunch,
  existsLaunchWithId,
  getAllLaunches,
  abortLaunchById,
} from '../../models/launches.model.js';

function httpGetAllLaunches(req, res) {
  return res.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    launch.mission == null ||
    launch.rocket == null ||
    launch.launchDate == null ||
    launch.target == null
  ) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid date format passed as launchDate',
    });
  }

  const addedLaunch = addNewLaunch(launch);

  return res.status(201).json(addedLaunch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const abortedLaunch = abortLaunchById(launchId);
  return res.status(200).json(abortedLaunch);
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
