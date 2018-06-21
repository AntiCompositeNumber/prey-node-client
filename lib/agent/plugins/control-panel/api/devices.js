"use strict";

var keys    = require('./keys'),
    errors  = require('./errors'),
    request = require('./request');

var set = function(key) {
  if (!key) throw(new Error('No key!'));
  keys.set({ device: key });
  return key;
}

exports.link = function(data, cb) {
  if (!data || Object.keys(data).length == 0)
    return cb(errors.arguments('Empty data.'));

  if (keys.get().device)
    return cb(errors.get('DEVICE_KEY_SET'));
  else if (!keys.get().api)
    return cb(errors.get('NO_API_KEY'));

  request.post('/devices.json', data, {}, function(err, resp) {
    if (err) return cb(err);

    var body = resp.body;

    if (body && body.key) {
      cb(null, set(body.key))

    } else if (resp.statusCode == 401) {
      cb(errors.get('INVALID_CREDENTIALS'))

    } else if (resp.statusCode == 302 || resp.statusCode == 403) {
      cb(errors.get('NO_AVAILABLE_SLOTS'));

    } else if (resp.statusCode == 422 || body.errors) {
      var obj = body.errors || body;
      cb(errors.unprocessable(body));

    } else {
      cb(errors.unknown(resp))
    }

  });
};

exports.unlink = function(cb) {
  if (!keys.get().api || !keys.get().device)
    return cb(errors.get('MISSING_KEY'));

  request.delete('/devices/' + keys.get().device, {}, function(err, resp) {
    if (err) return cb(err);

    if (resp.statusCode === 401)
      return cb(errors.get('INVALID_CREDENTIALS'))
    else if (resp.statusCode !== 200)
      return cb(errors.unknown(resp))

    keys.unset('device');
    cb();
  });
}

exports.post_location = function(data, cb) {
  if (!keys.get().api || !keys.get().device)
    return cb(errors.get('MISSING_KEY'));

  if (!data)
    return cb(errors.arguments('Empty data.'));

  request.post('/devices/' + keys.get().device + '/location.json', data, {}, function(err, resp) {
    if (err) return cb(err);

    var state = false;

    if (resp.statusCode === 401)
      return cb(errors.get('INVALID_CREDENTIALS'))
    else if (resp.statusCode == 200)
      state = true;
    else if (resp.statusCode == 201)
      state = false;

    cb(null, state);
  });
}

exports.post_sso_status = function(data, cb) {
  if (!data)
    return cb(errors.arguments('Empty data.'));

  request.post('/devices/client_configuration', data, {}, function(err, resp) {
    if (err) return cb(err);

    if (resp.statusCode != 200) {
      return cb(new Error(resp.statusCode + ' ' + resp.statusMessage))
    }
    cb(null);
  });
}

exports.get = {}

exports.get.commands = function(cb) {
  if (!keys.get().device) {
    var err = (errors.get('NO_DEVICE_KEY'));
    if (cb) return cb(err);
    throw new Error(err);
  }

  var req = request.get('/devices/' + keys.get().device + '.json', {}, cb);

  if (!cb)
    return req;
}

exports.get.status = function(cb) {
  if (!keys.get().device)
    return cb(errors.get('NO_DEVICE_KEY'));

  request.get('/devices/' + keys.get().device + '/status.json', {}, cb);
}

exports.get.geofences = function(cb) {
  var device_key = keys.get().device;
  if (!device_key)
    return cb(errors.get('NO_DEVICE_KEY'));

  request.get('/devices/' + device_key + '/geofencing.json', {}, cb);
}
