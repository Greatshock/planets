const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocketName: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
let latestFlightNumber = launch.flightNumber;

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  const flightNumber = ++latestFlightNumber;

  launches.set(flightNumber, {
    ...launch,
    flightNumber,
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
  });

  return launches.get(flightNumber);
}

function existsLaunchWithId(id) {
  return launches.has(id);
}

function abortLaunchById(id) {
  const abortedLaunch = launches.get(id);

  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;

  return abortedLaunch;
}

export { getAllLaunches, addNewLaunch, abortLaunchById, existsLaunchWithId };
