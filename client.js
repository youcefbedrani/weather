const axios = require('axios');
const parseString = require('xml2js').parseString;

const url = 'http://localhost:8000/weather?wsdl';

// Make a SOAP request using axios
axios.post(url, `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" \
  xmlns:web="your-namespace-here"> \
  <soapenv:Header/> \
  <soapenv:Body> \
    <web:GetWeather> \
      <web:location>New York</web:location> \
    </web:GetWeather> \
  </soapenv:Body> \
</soapenv:Envelope>`, {
  headers: { 'Content-Type': 'text/xml' },
})
  .then(response => {
    parseString(response.data, (err, result) => {
      if (err) {
        console.error('Error parsing SOAP response:', err);
        return;
      }

      console.log('Temperature:', result.Body.GetWeatherResponse.temperature);
      console.log('Description:', result.Body.GetWeatherResponse.description);
    });
  })
  .catch(error => {
    console.error('Error making SOAP request:', error);
  });
