const fetchMyIP = callback => {
  const request = require("request");
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let IP = JSON.parse(body).ip;
    callback(null, IP);
    return;
  });
};

const fetchCoordsByIP = (IP, callback) => {
  const request = require("request");
  request(`https://ipvigilante.com/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: Response: ${body}`;
      callback(msg, null);
      return;
    }

    body = JSON.parse(body);
    let latitude = body.data.latitude;
    let longitude = body.data.longitude;
    let coords = { latitude, longitude };
    callback(null, coords);
    return;
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const request = require("request");
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: Response: ${body}`;
        callback(msg, null);
        return;
      }
      let passTimes = JSON.parse(body).response;
      callback(null, passTimes);
      return;
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, IP) => {
    if (error) {
    return callback(error, null);
  }

    fetchCoordsByIP(IP, (error, coords) => { 
      if (error) {
      return callback(error, null);
    }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes)
      });
    });
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
