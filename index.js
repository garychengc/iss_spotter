// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  printOutTime(passTimes);
});

const printOutTime = (array) => {
  for (let time of array) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
}


// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , IP);
// });

// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log("It didn't work! Error:" , error);
//     return;
//   }
//   console.log('It worked! Returned Coordinate:' , data);
// });


// fetchISSFlyOverTimes(coordinates, (error, data) => {
//   if (error) {
//     console.log("It didn't work! Error:" , error);
//     return;
//   }
//   console.log('It worked! Returned Coordinate:' , data);
// });

