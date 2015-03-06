var express = require('express')
  , app = express()
  , url = require('url');

require('dotenv').load();

var pusher = require('pusher-url').connect();

var urlencodedParser = require('body-parser').urlencoded({ extended: false })

// Provide a default request content type
app.use(function(req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/x-www-form-urlencoded';
  next();
});

function normalize(s) {
  if (s == null || s.length == 0) { return null }
  var uri = url.parse(s);
  if (uri.protocol == null) {
    uri = url.parse('http://' + s)
  }
  if (uri.protocol != 'http:' && uri.protocol != 'https:') { return null }
  return uri.protocol + '//' + uri.host + uri.path;
}

app.post('/incoming', urlencodedParser, function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  if (req.body.token != process.env.SLACK_TOKEN) {
    res.status(401);
    res.send('Bad token');
    return;
  }

  var uri = normalize(req.body.text);
  if (uri) {
    pusher.trigger('cart', 'show', {username: req.body.user_name, uri: uri });
    res.send("Sent " + uri + " to cart");
  } else {
    res.send(req.body.text + " is not a valid URL")
  }

});

app.listen(process.env.PORT, "0.0.0.0", function() {
  console.log('Listening on port 3000...')
})
