var sandbox      = require('sandboxed-module'),
    path         = require('path'),
    agent_path   = path.resolve(__dirname, '..', '..', 'lib', 'agent');

var result = {
  out      : '',
  code     : null,
  triggers : [],
  murders  : {},
  signals  : {}
}

var callbacks = {};

var fake_logger = {
  write    : function(str) { result.out += str },
  debug    : function(str) { this.write('debug: ' + str) },
  info     : function(str) { this.write('info: ' + str) },
  critical : function(str) { this.write('critical: ' + str) },
  warn     : function(str) { this.write('warn: ' + str) }
}

var defaults = {
  common: {
    logger: fake_logger,
    config: { present: function(){ return true } },
    system: { tempfile_path: function(file){ return file } }
  },
  agent: {
    // run: function() { },
    running: function() { return true },
    shutdown: function() { }
  },
  pid: {
    store: function(pidfile) { },
    remove: function(pidfile) { }
  },
  process: {
    env  : process.env,
    argv : [],
    stdout: {
      _type: '_tty',
      writable: true,
      write: function(str) { result.out += str }
    },
    exit: function(code){ result.code = code },
    on:   function(signal, cb) { callbacks[signal] = cb },
    kill: function(pid, signal) { result.murders[pid] = signal }
  }
}

// merges values from one object into another, recursively
var merge = function(destination, source) {
  if (!source) return destination;

  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

var clone = function(obj){
  if (obj == null || typeof(obj) != 'object' || !obj.constructor)
      return obj;

  var temp = obj.constructor(); // changed

  for (var key in obj)
      temp[key] = clone(obj[key]);

  return temp;
}

exports.run = function(opts) {

  // clone defaults object, so it retains
  // its original values for future calls
  var def = clone(defaults);

  var sandbox_opts = {
    requires : {
      './common' : merge(def.common, opts.common),
      './'       : merge(def.agent, opts.agent),
    },
    globals  : {
      // name: 'holi',
      process    : merge(def.process, opts.process)
    }
  }

  console.log("OPTS!!!", opts)
  // this is a tricky one
  sandbox_opts.requires['./utils/pidfile'] = merge(def.pid, opts.pid);

  // load any additional requires passed
  if (opts.requires) {
    for (var key in opts.requires)
      sandbox_opts.requires[key] = opts.requires[key];
  }

  console.log("AGENT PATH", agent_path, path.resolve(agent_path, 'cli'))
  console.log("SANDBOX OPTS!", sandbox_opts)
  // sandbox_opts.name = 'holi'
  // fire it up!
  try {
    sandbox.require(path.resolve(agent_path, 'cli'), sandbox_opts);
  } catch(e) { // oops, uncaughtException
    console.log("EXCEPTION!!", e)

    result.exception = e;
    // if there is any callback assigned, call it.
    if (callbacks && callbacks['uncaughtException']) callbacks['uncaughtException'](e);
  }

  // console.log("RESULT1", result)
  // now let's see what happened.
  // result = { out: '\nLooks like there\'s no config file yet. Glad to see you\'re getting started. :)\nTo finish setting up Prey, please run `prey config hooks post_install` as root.\n\n',
  //   code: 1,
  //   triggers: [],
  //   murders: {},
  //   signals: {} 
  // }
  return result;
}


// RESULT!! 
// { out: '\nLooks like there\'s no config file yet. Glad to see you\'re getting started. :)\nTo finish setting up Prey, please run `prey config hooks post_install` as root.\n\n',
//   code: 1,
//   triggers: [],
//   murders: {},
//   signals: {} 
// }


// RESULT1 
// { out: '',
//   code: null,
//   triggers: [],
//   murders: {},
//   signals: {},
//   exception: TypeError: Path must be a string. Received undefined
//     at assertPath (path.js:28:11)
//     at basename (path.js:1395:5)
//     at Command.parse (/Users/javo/Code/Prey/node8/prey-node-client/node_modules/commander/index.js:462:30)
//     at Object.<anonymous> (/Users/javo/Code/Prey/node8/prey-node-client/lib/agent/cli.js:32:5)
//     at SandboxedModule._compile (/Users/javo/Code/Prey/node8/prey-node-client/node_modules/sandboxed-module/lib/sandboxed_module.js:251:19)