const fetchMyIP = (callback) => {
  const request = require("request");
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).ip;
    callback(null, data);
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
    let data = {latitude, longitude};
    callback(null, data);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };