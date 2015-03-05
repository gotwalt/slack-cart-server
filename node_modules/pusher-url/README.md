pusher-url
==========

**pusher-url** is a package for [Node.JS](http://nodejs.org/) that makes
it even easier to use the awesome [Pusher](http://pusher.com/) service in
a Node.JS app on [Heroku](http://heroku.com/). 


Installation
------------

Inside your Heroku-enabled app directory:

```
$ heroku addons:add pusher:sandbox
$ npm install pusher-url
```


Usage
-----

By default configuration parameters are taken from the `PUSHER_URL`
environment variable that Heroku automatically sets for you when you add
the Pusher addon. For local development you might want to set it on your
local machine as well (grab the URL from `heroku config` and set it with
`export PUSHER_URL=<url>`. Check 
[autoenv](https://github.com/kennethreitz/autoenv) if you don't save
keystrokes.

```js
// get connection parameters from environment
var pusher = require('pusher-url').connect();

// set a specific URL
var pusher = require('pusher-url').connect('http://<key>:<secret>@api.pusherapp.com/apps/<appid>');
```


License
-------

[MIT](http://philippbosch.mit-license.org/)
