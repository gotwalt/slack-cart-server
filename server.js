var express = require('express')
  , app = express()
  , slack_token = process.env.SLACK_TOKEN;

require('dotenv').load();

var pusher = require('pusher-url').connect();

var urlencodedParser = require('body-parser').urlencoded({ extended: true })

app.post('/incoming', urlencodedParser, function (req, res) {
  console.log(req);
  res.setHeader('Content-Type', 'text/plain')
  res.send(req.body.text);
});

app.listen(3000, "0.0.0.0", function() {
  console.log('Listening on port 3000...')
})
