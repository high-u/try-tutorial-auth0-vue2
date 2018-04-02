'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://yhiguchi.auth0.com/.well-known/jwks.json" // https://auth0.com/docs/jwks
    }),
    // This is the identifier we set when we created the API
    audience: 'https://yhiguchi.auth0.com/api/v2/', // https://manage.auth0.com/#/apis/5ab4f28aad647e6dd0f62b0a/test
    issuer: "https://yhiguchi.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/battles/public', (req, res) => {
  let publicBattles = [
    // Array of public battles
  ];

  res.json(publicBattles);
})

app.get('/api/battles/private', authCheck, (req,res) => {
  let privateBattles = [
    // Array of private battles
  ];

  res.json(privateBattles);
})

app.listen(3333);
console.log('Listening on localhost:3333');
