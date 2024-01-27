const soap = require('soap');
const express = require('express');
const app = express();

// Define the service implementation
const service = {
  WeatherService: {
    WeatherPort: {
      GetWeather: function(args, callback) {
        // Perform the logic to get the weather based on the location
        const location = args.location;
        const temperature = '25°C';
        const description = 'Sunny';

        // Return the response
        const result = {
          temperature: temperature,
          description: description
        };
        callback(null, result);
      }
    }
  }
};

// Read the WSDL file
const xml = require('fs').readFileSync('weatherService.wsdl', 'utf8');

// Create the SOAP server
soap.listen(app, '/weather', service, xml, function() {
  console.log('SOAP server running at http://localhost:8000/weather?wsdl');
});

// Start the Express app
const port = 8000;
app.listen(port, function() {
  console.log(`Express server listening at http://localhost:${port}`);
});
