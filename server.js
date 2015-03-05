var express = require('express')
  , app = express()
  , slack_token = process.env.SLACK_TOKEN;

require('dotenv').load();

var pusher = require('pusher-url').connect();

var urlencodedParser = require('body-parser').urlencoded({ extended: false })

// Provide a default request content type
app.use(function(req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/x-www-form-urlencoded';
  next();
});

app.post('/incoming', urlencodedParser, function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  pusher.trigger('cart', 'url', {username: req.body.user_name, uri: req.body.text })
  res.send("Sent to cart");
});

app.listen(process.env.PORT, "0.0.0.0", function() {
  console.log('Listening on port 3000...')
})
