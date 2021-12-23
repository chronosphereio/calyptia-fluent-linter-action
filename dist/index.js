var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) =>
  function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
var __reExport = (target, module2, desc) => {
  if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== 'default')
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        module2 && module2.__esModule && 'default' in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  'node_modules/@actions/core/lib/utils.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return '';
      } else if (typeof input === 'string' || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn,
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  },
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  'node_modules/@actions/core/lib/command.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os = __importStar(require('os'));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = '') {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = '::';
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += ' ';
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ',';
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
    }
    function escapeProperty(s) {
      return utils_1
        .toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
    }
  },
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  'node_modules/@actions/core/lib/file-command.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.issueCommand = void 0;
    var fs2 = __importStar(require('fs'));
    var os = __importStar(require('os'));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs2.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs2.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8',
      });
    }
    exports2.issueCommand = issueCommand;
  },
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  'node_modules/@actions/http-client/proxy.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === 'https:';
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
      } else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar);
      }
      return proxyUrl;
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
      } else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy
        .split(',')
        .map((x) => x.trim().toUpperCase())
        .filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  },
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  'node_modules/tunnel/lib/tunnel.js'(exports2) {
    'use strict';
    var net = require('net');
    var tls = require('tls');
    var http = require('http');
    var https = require('https');
    var events = require('events');
    var assert = require('assert');
    var util = require('util');
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on('free', function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function (socket) {
        socket.on('free', onFree);
        socket.on('close', onCloseOrRemove);
        socket.on('agentRemove', onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit('free', socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener('free', onFree);
          socket.removeListener('close', onCloseOrRemove);
          socket.removeListener('agentRemove', onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: 'CONNECT',
        path: options.host + ':' + options.port,
        agent: false,
        headers: {
          host: options.host + ':' + options.port,
        },
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers['Proxy-Authorization'] =
          'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
      }
      debug2('making CONNECT request');
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once('response', onResponse);
      connectReq.once('upgrade', onUpgrade);
      connectReq.once('connect', onConnect);
      connectReq.once('error', onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function () {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug2('tunneling socket could not be established, statusCode=%d', res.statusCode);
          socket.destroy();
          var error2 = new Error('tunneling socket could not be established, statusCode=' + res.statusCode);
          error2.code = 'ECONNRESET';
          options.request.emit('error', error2);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug2('got illegal response body from proxy');
          socket.destroy();
          var error2 = new Error('got illegal response body from proxy');
          error2.code = 'ECONNRESET';
          options.request.emit('error', error2);
          self.removeSocket(placeholder);
          return;
        }
        debug2('tunneling connection has established');
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug2('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
        var error2 = new Error('tunneling socket could not be established, cause=' + cause.message);
        error2.code = 'ECONNRESET';
        options.request.emit('error', error2);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function (socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function (socket) {
        var hostHeader = options.request.getHeader('host');
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host,
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === 'string') {
        return {
          host,
          port,
          localAddress,
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === 'object') {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug2;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug2 = function () {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
          args[0] = 'TUNNEL: ' + args[0];
        } else {
          args.unshift('TUNNEL:');
        }
        console.error.apply(console, args);
      };
    } else {
      debug2 = function () {};
    }
    exports2.debug = debug2;
  },
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  'node_modules/tunnel/index.js'(exports2, module2) {
    module2.exports = require_tunnel();
  },
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  'node_modules/@actions/http-client/index.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    var http = require('http');
    var https = require('https');
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function (HttpCodes2) {
      HttpCodes2[(HttpCodes2['OK'] = 200)] = 'OK';
      HttpCodes2[(HttpCodes2['MultipleChoices'] = 300)] = 'MultipleChoices';
      HttpCodes2[(HttpCodes2['MovedPermanently'] = 301)] = 'MovedPermanently';
      HttpCodes2[(HttpCodes2['ResourceMoved'] = 302)] = 'ResourceMoved';
      HttpCodes2[(HttpCodes2['SeeOther'] = 303)] = 'SeeOther';
      HttpCodes2[(HttpCodes2['NotModified'] = 304)] = 'NotModified';
      HttpCodes2[(HttpCodes2['UseProxy'] = 305)] = 'UseProxy';
      HttpCodes2[(HttpCodes2['SwitchProxy'] = 306)] = 'SwitchProxy';
      HttpCodes2[(HttpCodes2['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
      HttpCodes2[(HttpCodes2['PermanentRedirect'] = 308)] = 'PermanentRedirect';
      HttpCodes2[(HttpCodes2['BadRequest'] = 400)] = 'BadRequest';
      HttpCodes2[(HttpCodes2['Unauthorized'] = 401)] = 'Unauthorized';
      HttpCodes2[(HttpCodes2['PaymentRequired'] = 402)] = 'PaymentRequired';
      HttpCodes2[(HttpCodes2['Forbidden'] = 403)] = 'Forbidden';
      HttpCodes2[(HttpCodes2['NotFound'] = 404)] = 'NotFound';
      HttpCodes2[(HttpCodes2['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
      HttpCodes2[(HttpCodes2['NotAcceptable'] = 406)] = 'NotAcceptable';
      HttpCodes2[(HttpCodes2['ProxyAuthenticationRequired'] = 407)] = 'ProxyAuthenticationRequired';
      HttpCodes2[(HttpCodes2['RequestTimeout'] = 408)] = 'RequestTimeout';
      HttpCodes2[(HttpCodes2['Conflict'] = 409)] = 'Conflict';
      HttpCodes2[(HttpCodes2['Gone'] = 410)] = 'Gone';
      HttpCodes2[(HttpCodes2['TooManyRequests'] = 429)] = 'TooManyRequests';
      HttpCodes2[(HttpCodes2['InternalServerError'] = 500)] = 'InternalServerError';
      HttpCodes2[(HttpCodes2['NotImplemented'] = 501)] = 'NotImplemented';
      HttpCodes2[(HttpCodes2['BadGateway'] = 502)] = 'BadGateway';
      HttpCodes2[(HttpCodes2['ServiceUnavailable'] = 503)] = 'ServiceUnavailable';
      HttpCodes2[(HttpCodes2['GatewayTimeout'] = 504)] = 'GatewayTimeout';
    })((HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {})));
    var Headers;
    (function (Headers2) {
      Headers2['Accept'] = 'accept';
      Headers2['ContentType'] = 'content-type';
    })((Headers = exports2.Headers || (exports2.Headers = {})));
    var MediaTypes;
    (function (MediaTypes2) {
      MediaTypes2['ApplicationJson'] = 'application/json';
    })((MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {})));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : '';
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect,
    ];
    var HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
    var RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on('data', (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on('end', () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === 'https:';
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        );
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        );
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        );
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        );
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        );
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.Accept,
          MediaTypes.ApplicationJson
        );
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(
          additionalHeaders,
          Headers.ContentType,
          MediaTypes.ApplicationJson
        );
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (
            HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
            this._allowRedirects &&
            redirectsRemaining > 0
          ) {
            const redirectUrl = response.message.headers['location'];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = new URL(redirectUrl);
            if (
              parsedUrl.protocol == 'https:' &&
              parsedUrl.protocol != parsedRedirectUrl.protocol &&
              !this._allowRedirectDowngrade
            ) {
              throw new Error(
                'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
              );
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === 'authorization') {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function (err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
          info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on('socket', (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
          handleResult(err, null);
        });
        if (data && typeof data === 'string') {
          req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
          data.on('close', function () {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: __spreadProps(
              __spreadValues(
                {},
                (proxyUrl.username || proxyUrl.password) && {
                  proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
                }
              ),
              {
                host: proxyUrl.hostname,
                port: proxyUrl.port,
              }
            ),
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === 'https:';
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false,
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {},
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {}
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = 'Failed request: (' + statusCode + ')';
            }
            let err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports2.HttpClient = HttpClient;
  },
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  'node_modules/@actions/http-client/auth.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        options.headers['Authorization'] =
          'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  },
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  'node_modules/@actions/core/lib/oidc-utils.js'(exports2) {
    'use strict';
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_http_client();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry,
        };
        return new http_client_1.HttpClient(
          'actions/oidc-client',
          [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())],
          requestOptions
        );
      }
      static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error2) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error2.statusCode}
 
        Error Message: ${error2.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error('Response json body do not have ID Token field');
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error2) {
            throw new Error(`Error message: ${error2.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  },
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  'node_modules/@actions/core/lib/core.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.getIDToken =
      exports2.getState =
      exports2.saveState =
      exports2.group =
      exports2.endGroup =
      exports2.startGroup =
      exports2.info =
      exports2.notice =
      exports2.warning =
      exports2.error =
      exports2.debug =
      exports2.isDebug =
      exports2.setFailed =
      exports2.setCommandEcho =
      exports2.setOutput =
      exports2.getBooleanInput =
      exports2.getMultilineInput =
      exports2.getInput =
      exports2.addPath =
      exports2.setSecret =
      exports2.exportVariable =
      exports2.ExitCode =
        void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require('os'));
    var path = __importStar(require('path'));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function (ExitCode2) {
      ExitCode2[(ExitCode2['Success'] = 0)] = 'Success';
      ExitCode2[(ExitCode2['Failure'] = 1)] = 'Failure';
    })((ExitCode = exports2.ExitCode || (exports2.ExitCode = {})));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env['GITHUB_ENV'] || '';
      if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
      } else {
        command_1.issueCommand('set-env', { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand('add-mask', {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env['GITHUB_PATH'] || '';
      if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
      } else {
        command_1.issueCommand('add-path', {}, inputPath);
      }
      process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
    }
    exports2.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput2;
    function getMultilineInput(name, options) {
      const inputs = getInput2(name, options)
        .split('\n')
        .filter((x) => x !== '');
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ['true', 'True', 'TRUE'];
      const falseValue = ['false', 'False', 'FALSE'];
      const val = getInput2(name, options);
      if (trueValue.includes(val)) return true;
      if (falseValue.includes(val)) return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand('set-output', { name }, value);
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue('echo', enabled ? 'on' : 'off');
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed2(message) {
      process.exitCode = ExitCode.Failure;
      error2(message);
    }
    exports2.setFailed = setFailed2;
    function isDebug() {
      return process.env['RUNNER_DEBUG'] === '1';
    }
    exports2.isDebug = isDebug;
    function debug2(message) {
      command_1.issueCommand('debug', {}, message);
    }
    exports2.debug = debug2;
    function error2(message, properties = {}) {
      command_1.issueCommand(
        'error',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.error = error2;
    function warning(message, properties = {}) {
      command_1.issueCommand(
        'warning',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand(
        'notice',
        utils_1.toCommandProperties(properties),
        message instanceof Error ? message.toString() : message
      );
    }
    exports2.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      command_1.issue('group', name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue('endgroup');
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand('save-state', { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || '';
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
  },
});

// node_modules/@actions/glob/lib/internal-glob-options-helper.js
var require_internal_glob_options_helper = __commonJS({
  'node_modules/@actions/glob/lib/internal-glob-options-helper.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.getOptions = void 0;
    var core = __importStar(require_core());
    function getOptions(copy) {
      const result = {
        followSymbolicLinks: true,
        implicitDescendants: true,
        matchDirectories: true,
        omitBrokenSymbolicLinks: true,
      };
      if (copy) {
        if (typeof copy.followSymbolicLinks === 'boolean') {
          result.followSymbolicLinks = copy.followSymbolicLinks;
          core.debug(`followSymbolicLinks '${result.followSymbolicLinks}'`);
        }
        if (typeof copy.implicitDescendants === 'boolean') {
          result.implicitDescendants = copy.implicitDescendants;
          core.debug(`implicitDescendants '${result.implicitDescendants}'`);
        }
        if (typeof copy.matchDirectories === 'boolean') {
          result.matchDirectories = copy.matchDirectories;
          core.debug(`matchDirectories '${result.matchDirectories}'`);
        }
        if (typeof copy.omitBrokenSymbolicLinks === 'boolean') {
          result.omitBrokenSymbolicLinks = copy.omitBrokenSymbolicLinks;
          core.debug(`omitBrokenSymbolicLinks '${result.omitBrokenSymbolicLinks}'`);
        }
      }
      return result;
    }
    exports2.getOptions = getOptions;
  },
});

// node_modules/@actions/glob/lib/internal-path-helper.js
var require_internal_path_helper = __commonJS({
  'node_modules/@actions/glob/lib/internal-path-helper.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __importDefault =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.safeTrimTrailingSeparator =
      exports2.normalizeSeparators =
      exports2.hasRoot =
      exports2.hasAbsoluteRoot =
      exports2.ensureAbsoluteRoot =
      exports2.dirname =
        void 0;
    var path = __importStar(require('path'));
    var assert_1 = __importDefault(require('assert'));
    var IS_WINDOWS = process.platform === 'win32';
    function dirname(p) {
      p = safeTrimTrailingSeparator(p);
      if (IS_WINDOWS && /^\\\\[^\\]+(\\[^\\]+)?$/.test(p)) {
        return p;
      }
      let result = path.dirname(p);
      if (IS_WINDOWS && /^\\\\[^\\]+\\[^\\]+\\$/.test(result)) {
        result = safeTrimTrailingSeparator(result);
      }
      return result;
    }
    exports2.dirname = dirname;
    function ensureAbsoluteRoot(root, itemPath) {
      assert_1.default(root, `ensureAbsoluteRoot parameter 'root' must not be empty`);
      assert_1.default(itemPath, `ensureAbsoluteRoot parameter 'itemPath' must not be empty`);
      if (hasAbsoluteRoot(itemPath)) {
        return itemPath;
      }
      if (IS_WINDOWS) {
        if (itemPath.match(/^[A-Z]:[^\\/]|^[A-Z]:$/i)) {
          let cwd = process.cwd();
          assert_1.default(
            cwd.match(/^[A-Z]:\\/i),
            `Expected current directory to start with an absolute drive root. Actual '${cwd}'`
          );
          if (itemPath[0].toUpperCase() === cwd[0].toUpperCase()) {
            if (itemPath.length === 2) {
              return `${itemPath[0]}:\\${cwd.substr(3)}`;
            } else {
              if (!cwd.endsWith('\\')) {
                cwd += '\\';
              }
              return `${itemPath[0]}:\\${cwd.substr(3)}${itemPath.substr(2)}`;
            }
          } else {
            return `${itemPath[0]}:\\${itemPath.substr(2)}`;
          }
        } else if (normalizeSeparators(itemPath).match(/^\\$|^\\[^\\]/)) {
          const cwd = process.cwd();
          assert_1.default(
            cwd.match(/^[A-Z]:\\/i),
            `Expected current directory to start with an absolute drive root. Actual '${cwd}'`
          );
          return `${cwd[0]}:\\${itemPath.substr(1)}`;
        }
      }
      assert_1.default(hasAbsoluteRoot(root), `ensureAbsoluteRoot parameter 'root' must have an absolute root`);
      if (root.endsWith('/') || (IS_WINDOWS && root.endsWith('\\'))) {
      } else {
        root += path.sep;
      }
      return root + itemPath;
    }
    exports2.ensureAbsoluteRoot = ensureAbsoluteRoot;
    function hasAbsoluteRoot(itemPath) {
      assert_1.default(itemPath, `hasAbsoluteRoot parameter 'itemPath' must not be empty`);
      itemPath = normalizeSeparators(itemPath);
      if (IS_WINDOWS) {
        return itemPath.startsWith('\\\\') || /^[A-Z]:\\/i.test(itemPath);
      }
      return itemPath.startsWith('/');
    }
    exports2.hasAbsoluteRoot = hasAbsoluteRoot;
    function hasRoot(itemPath) {
      assert_1.default(itemPath, `isRooted parameter 'itemPath' must not be empty`);
      itemPath = normalizeSeparators(itemPath);
      if (IS_WINDOWS) {
        return itemPath.startsWith('\\') || /^[A-Z]:/i.test(itemPath);
      }
      return itemPath.startsWith('/');
    }
    exports2.hasRoot = hasRoot;
    function normalizeSeparators(p) {
      p = p || '';
      if (IS_WINDOWS) {
        p = p.replace(/\//g, '\\');
        const isUnc = /^\\\\+[^\\]/.test(p);
        return (isUnc ? '\\' : '') + p.replace(/\\\\+/g, '\\');
      }
      return p.replace(/\/\/+/g, '/');
    }
    exports2.normalizeSeparators = normalizeSeparators;
    function safeTrimTrailingSeparator(p) {
      if (!p) {
        return '';
      }
      p = normalizeSeparators(p);
      if (!p.endsWith(path.sep)) {
        return p;
      }
      if (p === path.sep) {
        return p;
      }
      if (IS_WINDOWS && /^[A-Z]:\\$/i.test(p)) {
        return p;
      }
      return p.substr(0, p.length - 1);
    }
    exports2.safeTrimTrailingSeparator = safeTrimTrailingSeparator;
  },
});

// node_modules/@actions/glob/lib/internal-match-kind.js
var require_internal_match_kind = __commonJS({
  'node_modules/@actions/glob/lib/internal-match-kind.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.MatchKind = void 0;
    var MatchKind;
    (function (MatchKind2) {
      MatchKind2[(MatchKind2['None'] = 0)] = 'None';
      MatchKind2[(MatchKind2['Directory'] = 1)] = 'Directory';
      MatchKind2[(MatchKind2['File'] = 2)] = 'File';
      MatchKind2[(MatchKind2['All'] = 3)] = 'All';
    })((MatchKind = exports2.MatchKind || (exports2.MatchKind = {})));
  },
});

// node_modules/@actions/glob/lib/internal-pattern-helper.js
var require_internal_pattern_helper = __commonJS({
  'node_modules/@actions/glob/lib/internal-pattern-helper.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.partialMatch = exports2.match = exports2.getSearchPaths = void 0;
    var pathHelper = __importStar(require_internal_path_helper());
    var internal_match_kind_1 = require_internal_match_kind();
    var IS_WINDOWS = process.platform === 'win32';
    function getSearchPaths(patterns) {
      patterns = patterns.filter((x) => !x.negate);
      const searchPathMap = {};
      for (const pattern of patterns) {
        const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
        searchPathMap[key] = 'candidate';
      }
      const result = [];
      for (const pattern of patterns) {
        const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
        if (searchPathMap[key] === 'included') {
          continue;
        }
        let foundAncestor = false;
        let tempKey = key;
        let parent = pathHelper.dirname(tempKey);
        while (parent !== tempKey) {
          if (searchPathMap[parent]) {
            foundAncestor = true;
            break;
          }
          tempKey = parent;
          parent = pathHelper.dirname(tempKey);
        }
        if (!foundAncestor) {
          result.push(pattern.searchPath);
          searchPathMap[key] = 'included';
        }
      }
      return result;
    }
    exports2.getSearchPaths = getSearchPaths;
    function match(patterns, itemPath) {
      let result = internal_match_kind_1.MatchKind.None;
      for (const pattern of patterns) {
        if (pattern.negate) {
          result &= ~pattern.match(itemPath);
        } else {
          result |= pattern.match(itemPath);
        }
      }
      return result;
    }
    exports2.match = match;
    function partialMatch(patterns, itemPath) {
      return patterns.some((x) => !x.negate && x.partialMatch(itemPath));
    }
    exports2.partialMatch = partialMatch;
  },
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  'node_modules/concat-map/index.js'(exports2, module2) {
    module2.exports = function (xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
      }
      return res;
    };
    var isArray =
      Array.isArray ||
      function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };
  },
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  'node_modules/balanced-match/index.js'(exports2, module2) {
    'use strict';
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
      var r = range(a, b, str);
      return (
        r && {
          start: r[0],
          end: r[1],
          pre: str.slice(0, r[0]),
          body: str.slice(r[0] + a.length, r[1]),
          post: str.slice(r[1] + b.length),
        }
      );
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  },
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  'node_modules/brace-expansion/index.js'(exports2, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = '\0SLASH' + Math.random() + '\0';
    var escOpen = '\0OPEN' + Math.random() + '\0';
    var escClose = '\0CLOSE' + Math.random() + '\0';
    var escComma = '\0COMMA' + Math.random() + '\0';
    var escPeriod = '\0PERIOD' + Math.random() + '\0';
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str
        .split('\\\\')
        .join(escSlash)
        .split('\\{')
        .join(escOpen)
        .split('\\}')
        .join(escClose)
        .split('\\,')
        .join(escComma)
        .split('\\.')
        .join(escPeriod);
    }
    function unescapeBraces(str) {
      return str
        .split(escSlash)
        .join('\\')
        .split(escOpen)
        .join('{')
        .split(escClose)
        .join('}')
        .split(escComma)
        .join(',')
        .split(escPeriod)
        .join('.');
    }
    function parseCommaParts(str) {
      if (!str) return [''];
      var parts = [];
      var m = balanced('{', '}', str);
      if (!m) return str.split(',');
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(',');
      p[p.length - 1] += '{' + body + '}';
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str) return [];
      if (str.substr(0, 2) === '{}') {
        str = '\\{\\}' + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return '{' + str + '}';
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced('{', '}', str);
      if (!m || /\$$/.test(m.pre)) return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(',') >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + '{' + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [''];
            return post.map(function (p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [''];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === '\\') c = '';
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join('0');
                if (i < 0) c = '-' + z + c.slice(1);
                else c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function (el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion) expansions.push(expansion);
        }
      }
      return expansions;
    }
  },
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  'node_modules/minimatch/minimatch.js'(exports2, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path = { sep: '/' };
    try {
      path = require('path');
    } catch (er) {}
    var GLOBSTAR = (minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {});
    var expand = require_brace_expansion();
    var plTypes = {
      '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
      '?': { open: '(?:', close: ')?' },
      '+': { open: '(?:', close: ')+' },
      '*': { open: '(?:', close: ')*' },
      '@': { open: '(?:', close: ')' },
    };
    var qmark = '[^/]';
    var star = qmark + '*?';
    var twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
    var twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';
    var reSpecials = charSet('().*{}+?[]^$\\!');
    function charSet(s) {
      return s.split('').reduce(function (set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function (p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      a = a || {};
      b = b || {};
      var t = {};
      Object.keys(b).forEach(function (k) {
        t[k] = b[k];
      });
      Object.keys(a).forEach(function (k) {
        t[k] = a[k];
      });
      return t;
    }
    minimatch.defaults = function (def) {
      if (!def || !Object.keys(def).length) return minimatch;
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig.minimatch(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function (def) {
      if (!def || !Object.keys(def).length) return Minimatch;
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      if (typeof pattern !== 'string') {
        throw new TypeError('glob pattern string required');
      }
      if (!options) options = {};
      if (!options.nocomment && pattern.charAt(0) === '#') {
        return false;
      }
      if (pattern.trim() === '') return p === '';
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      if (typeof pattern !== 'string') {
        throw new TypeError('glob pattern string required');
      }
      if (!options) options = {};
      pattern = pattern.trim();
      if (path.sep !== '/') {
        pattern = pattern.split(path.sep).join('/');
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.make();
    }
    Minimatch.prototype.debug = function () {};
    Minimatch.prototype.make = make;
    function make() {
      if (this._made) return;
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === '#') {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = (this.globSet = this.braceExpand());
      if (options.debug) this.debug = console.error;
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function (s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function (s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function (s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate) return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset) this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function (pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
      if (typeof pattern === 'undefined') {
        throw new TypeError('undefined pattern');
      }
      if (options.nobrace || !pattern.match(/\{.*\}/)) {
        return [pattern];
      }
      return expand(pattern);
    }
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      if (pattern.length > 1024 * 64) {
        throw new TypeError('pattern is too long');
      }
      var options = this.options;
      if (!options.noglobstar && pattern === '**') return GLOBSTAR;
      if (pattern === '') return '';
      var re = '';
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))' : '(?!\\.)';
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case '*':
              re += star;
              hasMagic = true;
              break;
            case '?':
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += '\\' + stateChar;
              break;
          }
          self.debug('clearStateChar %j %j', stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug('%s	%s %s %j', pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += '\\' + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case '/':
            return false;
          case '\\':
            clearStateChar();
            escaping = true;
            continue;
          case '?':
          case '*':
          case '+':
          case '@':
          case '!':
            this.debug('%s	%s %s %j <-- stateChar', pattern, i, re, c);
            if (inClass) {
              this.debug('  in class');
              if (c === '!' && i === classStart + 1) c = '^';
              re += c;
              continue;
            }
            self.debug('call clearStateChar %j', stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext) clearStateChar();
            continue;
          case '(':
            if (inClass) {
              re += '(';
              continue;
            }
            if (!stateChar) {
              re += '\\(';
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close,
            });
            re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
            this.debug('plType %j %j', stateChar, re);
            stateChar = false;
            continue;
          case ')':
            if (inClass || !patternListStack.length) {
              re += '\\)';
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === '!') {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case '|':
            if (inClass || !patternListStack.length || escaping) {
              re += '\\|';
              escaping = false;
              continue;
            }
            clearStateChar();
            re += '|';
            continue;
          case '[':
            clearStateChar();
            if (inClass) {
              re += '\\' + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case ']':
            if (i === classStart + 1 || !inClass) {
              re += '\\' + c;
              escaping = false;
              continue;
            }
            if (inClass) {
              var cs = pattern.substring(classStart + 1, i);
              try {
                RegExp('[' + cs + ']');
              } catch (er) {
                var sp = this.parse(cs, SUBPARSE);
                re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === '^' && inClass)) {
              re += '\\';
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + '\\[' + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug('setting tail', re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
          if (!$2) {
            $2 = '\\';
          }
          return $1 + $1 + $2 + '|';
        });
        this.debug('tail=%j\n   %s', tail, tail, pl, re);
        var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + '\\(' + tail;
      }
      clearStateChar();
      if (escaping) {
        re += '\\\\';
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case '.':
        case '[':
        case '(':
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split('(').length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
        }
        nlAfter = cleanAfter;
        var dollar = '';
        if (nlAfter === '' && isSub !== SUBPARSE) {
          dollar = '$';
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== '' && hasMagic) {
        re = '(?=.)' + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? 'i' : '';
      try {
        var regExp = new RegExp('^' + re + '$', flags);
      } catch (er) {
        return new RegExp('$.');
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function (pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false) return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? 'i' : '';
      var re = set
        .map(function (pattern) {
          return pattern
            .map(function (p) {
              return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
            })
            .join('\\/');
        })
        .join('|');
      re = '^(?:' + re + ')$';
      if (this.negate) re = '^(?!' + re + ').*$';
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function (list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function (f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = match;
    function match(f, partial) {
      this.debug('match', f, this.pattern);
      if (this.comment) return false;
      if (this.empty) return f === '';
      if (f === '/' && partial) return true;
      var options = this.options;
      if (path.sep !== '/') {
        f = f.split(path.sep).join('/');
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, 'split', f);
      var set = this.set;
      this.debug(this.pattern, 'set', set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename) break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate) return true;
          return !this.negate;
        }
      }
      if (options.flipNegate) return false;
      return this.negate;
    }
    Minimatch.prototype.matchOne = function (file, pattern, partial) {
      var options = this.options;
      this.debug('matchOne', { this: this, file, pattern });
      this.debug('matchOne', file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug('matchOne loop');
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false) return false;
        if (p === GLOBSTAR) {
          this.debug('GLOBSTAR', [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug('** at the end');
            for (; fi < fl; fi++) {
              if (file[fi] === '.' || file[fi] === '..' || (!options.dot && file[fi].charAt(0) === '.')) return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug('globstar found match!', fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === '.' || swallowee === '..' || (!options.dot && swallowee.charAt(0) === '.')) {
                this.debug('dot detected!', file, fr, pattern, pr);
                break;
              }
              this.debug('globstar swallow a segment, and continue');
              fr++;
            }
          }
          if (partial) {
            this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
            if (fr === fl) return true;
          }
          return false;
        }
        var hit;
        if (typeof p === 'string') {
          if (options.nocase) {
            hit = f.toLowerCase() === p.toLowerCase();
          } else {
            hit = f === p;
          }
          this.debug('string match', p, f, hit);
        } else {
          hit = f.match(p);
          this.debug('pattern match', p, f, hit);
        }
        if (!hit) return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        var emptyFileEnd = fi === fl - 1 && file[fi] === '';
        return emptyFileEnd;
      }
      throw new Error('wtf?');
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, '$1');
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
  },
});

// node_modules/@actions/glob/lib/internal-path.js
var require_internal_path = __commonJS({
  'node_modules/@actions/glob/lib/internal-path.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __importDefault =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.Path = void 0;
    var path = __importStar(require('path'));
    var pathHelper = __importStar(require_internal_path_helper());
    var assert_1 = __importDefault(require('assert'));
    var IS_WINDOWS = process.platform === 'win32';
    var Path = class {
      constructor(itemPath) {
        this.segments = [];
        if (typeof itemPath === 'string') {
          assert_1.default(itemPath, `Parameter 'itemPath' must not be empty`);
          itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
          if (!pathHelper.hasRoot(itemPath)) {
            this.segments = itemPath.split(path.sep);
          } else {
            let remaining = itemPath;
            let dir = pathHelper.dirname(remaining);
            while (dir !== remaining) {
              const basename = path.basename(remaining);
              this.segments.unshift(basename);
              remaining = dir;
              dir = pathHelper.dirname(remaining);
            }
            this.segments.unshift(remaining);
          }
        } else {
          assert_1.default(itemPath.length > 0, `Parameter 'itemPath' must not be an empty array`);
          for (let i = 0; i < itemPath.length; i++) {
            let segment = itemPath[i];
            assert_1.default(segment, `Parameter 'itemPath' must not contain any empty segments`);
            segment = pathHelper.normalizeSeparators(itemPath[i]);
            if (i === 0 && pathHelper.hasRoot(segment)) {
              segment = pathHelper.safeTrimTrailingSeparator(segment);
              assert_1.default(
                segment === pathHelper.dirname(segment),
                `Parameter 'itemPath' root segment contains information for multiple segments`
              );
              this.segments.push(segment);
            } else {
              assert_1.default(!segment.includes(path.sep), `Parameter 'itemPath' contains unexpected path separators`);
              this.segments.push(segment);
            }
          }
        }
      }
      toString() {
        let result = this.segments[0];
        let skipSlash = result.endsWith(path.sep) || (IS_WINDOWS && /^[A-Z]:$/i.test(result));
        for (let i = 1; i < this.segments.length; i++) {
          if (skipSlash) {
            skipSlash = false;
          } else {
            result += path.sep;
          }
          result += this.segments[i];
        }
        return result;
      }
    };
    exports2.Path = Path;
  },
});

// node_modules/@actions/glob/lib/internal-pattern.js
var require_internal_pattern = __commonJS({
  'node_modules/@actions/glob/lib/internal-pattern.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __importDefault =
      (exports2 && exports2.__importDefault) ||
      function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.Pattern = void 0;
    var os = __importStar(require('os'));
    var path = __importStar(require('path'));
    var pathHelper = __importStar(require_internal_path_helper());
    var assert_1 = __importDefault(require('assert'));
    var minimatch_1 = require_minimatch();
    var internal_match_kind_1 = require_internal_match_kind();
    var internal_path_1 = require_internal_path();
    var IS_WINDOWS = process.platform === 'win32';
    var Pattern = class {
      constructor(patternOrNegate, isImplicitPattern = false, segments, homedir) {
        this.negate = false;
        let pattern;
        if (typeof patternOrNegate === 'string') {
          pattern = patternOrNegate.trim();
        } else {
          segments = segments || [];
          assert_1.default(segments.length, `Parameter 'segments' must not empty`);
          const root = Pattern.getLiteral(segments[0]);
          assert_1.default(
            root && pathHelper.hasAbsoluteRoot(root),
            `Parameter 'segments' first element must be a root path`
          );
          pattern = new internal_path_1.Path(segments).toString().trim();
          if (patternOrNegate) {
            pattern = `!${pattern}`;
          }
        }
        while (pattern.startsWith('!')) {
          this.negate = !this.negate;
          pattern = pattern.substr(1).trim();
        }
        pattern = Pattern.fixupPattern(pattern, homedir);
        this.segments = new internal_path_1.Path(pattern).segments;
        this.trailingSeparator = pathHelper.normalizeSeparators(pattern).endsWith(path.sep);
        pattern = pathHelper.safeTrimTrailingSeparator(pattern);
        let foundGlob = false;
        const searchSegments = this.segments
          .map((x) => Pattern.getLiteral(x))
          .filter((x) => !foundGlob && !(foundGlob = x === ''));
        this.searchPath = new internal_path_1.Path(searchSegments).toString();
        this.rootRegExp = new RegExp(Pattern.regExpEscape(searchSegments[0]), IS_WINDOWS ? 'i' : '');
        this.isImplicitPattern = isImplicitPattern;
        const minimatchOptions = {
          dot: true,
          nobrace: true,
          nocase: IS_WINDOWS,
          nocomment: true,
          noext: true,
          nonegate: true,
        };
        pattern = IS_WINDOWS ? pattern.replace(/\\/g, '/') : pattern;
        this.minimatch = new minimatch_1.Minimatch(pattern, minimatchOptions);
      }
      match(itemPath) {
        if (this.segments[this.segments.length - 1] === '**') {
          itemPath = pathHelper.normalizeSeparators(itemPath);
          if (!itemPath.endsWith(path.sep) && this.isImplicitPattern === false) {
            itemPath = `${itemPath}${path.sep}`;
          }
        } else {
          itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        }
        if (this.minimatch.match(itemPath)) {
          return this.trailingSeparator
            ? internal_match_kind_1.MatchKind.Directory
            : internal_match_kind_1.MatchKind.All;
        }
        return internal_match_kind_1.MatchKind.None;
      }
      partialMatch(itemPath) {
        itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        if (pathHelper.dirname(itemPath) === itemPath) {
          return this.rootRegExp.test(itemPath);
        }
        return this.minimatch.matchOne(itemPath.split(IS_WINDOWS ? /\\+/ : /\/+/), this.minimatch.set[0], true);
      }
      static globEscape(s) {
        return (IS_WINDOWS ? s : s.replace(/\\/g, '\\\\'))
          .replace(/(\[)(?=[^/]+\])/g, '[[]')
          .replace(/\?/g, '[?]')
          .replace(/\*/g, '[*]');
      }
      static fixupPattern(pattern, homedir) {
        assert_1.default(pattern, 'pattern cannot be empty');
        const literalSegments = new internal_path_1.Path(pattern).segments.map((x) => Pattern.getLiteral(x));
        assert_1.default(
          literalSegments.every((x, i) => (x !== '.' || i === 0) && x !== '..'),
          `Invalid pattern '${pattern}'. Relative pathing '.' and '..' is not allowed.`
        );
        assert_1.default(
          !pathHelper.hasRoot(pattern) || literalSegments[0],
          `Invalid pattern '${pattern}'. Root segment must not contain globs.`
        );
        pattern = pathHelper.normalizeSeparators(pattern);
        if (pattern === '.' || pattern.startsWith(`.${path.sep}`)) {
          pattern = Pattern.globEscape(process.cwd()) + pattern.substr(1);
        } else if (pattern === '~' || pattern.startsWith(`~${path.sep}`)) {
          homedir = homedir || os.homedir();
          assert_1.default(homedir, 'Unable to determine HOME directory');
          assert_1.default(
            pathHelper.hasAbsoluteRoot(homedir),
            `Expected HOME directory to be a rooted path. Actual '${homedir}'`
          );
          pattern = Pattern.globEscape(homedir) + pattern.substr(1);
        } else if (IS_WINDOWS && (pattern.match(/^[A-Z]:$/i) || pattern.match(/^[A-Z]:[^\\]/i))) {
          let root = pathHelper.ensureAbsoluteRoot('C:\\dummy-root', pattern.substr(0, 2));
          if (pattern.length > 2 && !root.endsWith('\\')) {
            root += '\\';
          }
          pattern = Pattern.globEscape(root) + pattern.substr(2);
        } else if (IS_WINDOWS && (pattern === '\\' || pattern.match(/^\\[^\\]/))) {
          let root = pathHelper.ensureAbsoluteRoot('C:\\dummy-root', '\\');
          if (!root.endsWith('\\')) {
            root += '\\';
          }
          pattern = Pattern.globEscape(root) + pattern.substr(1);
        } else {
          pattern = pathHelper.ensureAbsoluteRoot(Pattern.globEscape(process.cwd()), pattern);
        }
        return pathHelper.normalizeSeparators(pattern);
      }
      static getLiteral(segment) {
        let literal = '';
        for (let i = 0; i < segment.length; i++) {
          const c = segment[i];
          if (c === '\\' && !IS_WINDOWS && i + 1 < segment.length) {
            literal += segment[++i];
            continue;
          } else if (c === '*' || c === '?') {
            return '';
          } else if (c === '[' && i + 1 < segment.length) {
            let set = '';
            let closed = -1;
            for (let i2 = i + 1; i2 < segment.length; i2++) {
              const c2 = segment[i2];
              if (c2 === '\\' && !IS_WINDOWS && i2 + 1 < segment.length) {
                set += segment[++i2];
                continue;
              } else if (c2 === ']') {
                closed = i2;
                break;
              } else {
                set += c2;
              }
            }
            if (closed >= 0) {
              if (set.length > 1) {
                return '';
              }
              if (set) {
                literal += set;
                i = closed;
                continue;
              }
            }
          }
          literal += c;
        }
        return literal;
      }
      static regExpEscape(s) {
        return s.replace(/[[\\^$.|?*+()]/g, '\\$&');
      }
    };
    exports2.Pattern = Pattern;
  },
});

// node_modules/@actions/glob/lib/internal-search-state.js
var require_internal_search_state = __commonJS({
  'node_modules/@actions/glob/lib/internal-search-state.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.SearchState = void 0;
    var SearchState = class {
      constructor(path, level) {
        this.path = path;
        this.level = level;
      }
    };
    exports2.SearchState = SearchState;
  },
});

// node_modules/@actions/glob/lib/internal-globber.js
var require_internal_globber = __commonJS({
  'node_modules/@actions/glob/lib/internal-globber.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __asyncValues =
      (exports2 && exports2.__asyncValues) ||
      function (o) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var m = o[Symbol.asyncIterator],
          i;
        return m
          ? m.call(o)
          : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
            (i = {}),
            verb('next'),
            verb('throw'),
            verb('return'),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i);
        function verb(n) {
          i[n] =
            o[n] &&
            function (v) {
              return new Promise(function (resolve, reject) {
                (v = o[n](v)), settle(resolve, reject, v.done, v.value);
              });
            };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
    var __await =
      (exports2 && exports2.__await) ||
      function (v) {
        return this instanceof __await ? ((this.v = v), this) : new __await(v);
      };
    var __asyncGenerator =
      (exports2 && exports2.__asyncGenerator) ||
      function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
        return (
          (i = {}),
          verb('next'),
          verb('throw'),
          verb('return'),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function verb(n) {
          if (g[n])
            i[n] = function (v) {
              return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume('next', value);
        }
        function reject(value) {
          resume('throw', value);
        }
        function settle(f, v) {
          if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
        }
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.DefaultGlobber = void 0;
    var core = __importStar(require_core());
    var fs2 = __importStar(require('fs'));
    var globOptionsHelper = __importStar(require_internal_glob_options_helper());
    var path = __importStar(require('path'));
    var patternHelper = __importStar(require_internal_pattern_helper());
    var internal_match_kind_1 = require_internal_match_kind();
    var internal_pattern_1 = require_internal_pattern();
    var internal_search_state_1 = require_internal_search_state();
    var IS_WINDOWS = process.platform === 'win32';
    var DefaultGlobber = class {
      constructor(options) {
        this.patterns = [];
        this.searchPaths = [];
        this.options = globOptionsHelper.getOptions(options);
      }
      getSearchPaths() {
        return this.searchPaths.slice();
      }
      glob() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
          const result = [];
          try {
            for (var _b = __asyncValues(this.globGenerator()), _c; (_c = yield _b.next()), !_c.done; ) {
              const itemPath = _c.value;
              result.push(itemPath);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          return result;
        });
      }
      globGenerator() {
        return __asyncGenerator(this, arguments, function* globGenerator_1() {
          const options = globOptionsHelper.getOptions(this.options);
          const patterns = [];
          for (const pattern of this.patterns) {
            patterns.push(pattern);
            if (
              options.implicitDescendants &&
              (pattern.trailingSeparator || pattern.segments[pattern.segments.length - 1] !== '**')
            ) {
              patterns.push(new internal_pattern_1.Pattern(pattern.negate, true, pattern.segments.concat('**')));
            }
          }
          const stack = [];
          for (const searchPath of patternHelper.getSearchPaths(patterns)) {
            core.debug(`Search path '${searchPath}'`);
            try {
              yield __await(fs2.promises.lstat(searchPath));
            } catch (err) {
              if (err.code === 'ENOENT') {
                continue;
              }
              throw err;
            }
            stack.unshift(new internal_search_state_1.SearchState(searchPath, 1));
          }
          const traversalChain = [];
          while (stack.length) {
            const item = stack.pop();
            const match = patternHelper.match(patterns, item.path);
            const partialMatch = !!match || patternHelper.partialMatch(patterns, item.path);
            if (!match && !partialMatch) {
              continue;
            }
            const stats = yield __await(DefaultGlobber.stat(item, options, traversalChain));
            if (!stats) {
              continue;
            }
            if (stats.isDirectory()) {
              if (match & internal_match_kind_1.MatchKind.Directory && options.matchDirectories) {
                yield yield __await(item.path);
              } else if (!partialMatch) {
                continue;
              }
              const childLevel = item.level + 1;
              const childItems = (yield __await(fs2.promises.readdir(item.path))).map(
                (x) => new internal_search_state_1.SearchState(path.join(item.path, x), childLevel)
              );
              stack.push(...childItems.reverse());
            } else if (match & internal_match_kind_1.MatchKind.File) {
              yield yield __await(item.path);
            }
          }
        });
      }
      static create(patterns, options) {
        return __awaiter(this, void 0, void 0, function* () {
          const result = new DefaultGlobber(options);
          if (IS_WINDOWS) {
            patterns = patterns.replace(/\r\n/g, '\n');
            patterns = patterns.replace(/\r/g, '\n');
          }
          const lines = patterns.split('\n').map((x) => x.trim());
          for (const line of lines) {
            if (!line || line.startsWith('#')) {
              continue;
            } else {
              result.patterns.push(new internal_pattern_1.Pattern(line));
            }
          }
          result.searchPaths.push(...patternHelper.getSearchPaths(result.patterns));
          return result;
        });
      }
      static stat(item, options, traversalChain) {
        return __awaiter(this, void 0, void 0, function* () {
          let stats;
          if (options.followSymbolicLinks) {
            try {
              stats = yield fs2.promises.stat(item.path);
            } catch (err) {
              if (err.code === 'ENOENT') {
                if (options.omitBrokenSymbolicLinks) {
                  core.debug(`Broken symlink '${item.path}'`);
                  return void 0;
                }
                throw new Error(
                  `No information found for the path '${item.path}'. This may indicate a broken symbolic link.`
                );
              }
              throw err;
            }
          } else {
            stats = yield fs2.promises.lstat(item.path);
          }
          if (stats.isDirectory() && options.followSymbolicLinks) {
            const realPath = yield fs2.promises.realpath(item.path);
            while (traversalChain.length >= item.level) {
              traversalChain.pop();
            }
            if (traversalChain.some((x) => x === realPath)) {
              core.debug(`Symlink cycle detected for path '${item.path}' and realpath '${realPath}'`);
              return void 0;
            }
            traversalChain.push(realPath);
          }
          return stats;
        });
      }
    };
    exports2.DefaultGlobber = DefaultGlobber;
  },
});

// node_modules/@actions/glob/lib/internal-hash-files.js
var require_internal_hash_files = __commonJS({
  'node_modules/@actions/glob/lib/internal-hash-files.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __asyncValues =
      (exports2 && exports2.__asyncValues) ||
      function (o) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var m = o[Symbol.asyncIterator],
          i;
        return m
          ? m.call(o)
          : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
            (i = {}),
            verb('next'),
            verb('throw'),
            verb('return'),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i);
        function verb(n) {
          i[n] =
            o[n] &&
            function (v) {
              return new Promise(function (resolve, reject) {
                (v = o[n](v)), settle(resolve, reject, v.done, v.value);
              });
            };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function (v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.hashFiles = void 0;
    var crypto = __importStar(require('crypto'));
    var core = __importStar(require_core());
    var fs2 = __importStar(require('fs'));
    var stream = __importStar(require('stream'));
    var util = __importStar(require('util'));
    var path = __importStar(require('path'));
    function hashFiles(globber) {
      var e_1, _a;
      var _b;
      return __awaiter(this, void 0, void 0, function* () {
        let hasMatch = false;
        const githubWorkspace = (_b = process.env['GITHUB_WORKSPACE']) !== null && _b !== void 0 ? _b : process.cwd();
        const result = crypto.createHash('sha256');
        let count = 0;
        try {
          for (var _c = __asyncValues(globber.globGenerator()), _d; (_d = yield _c.next()), !_d.done; ) {
            const file = _d.value;
            core.debug(file);
            if (!file.startsWith(`${githubWorkspace}${path.sep}`)) {
              core.debug(`Ignore '${file}' since it is not under GITHUB_WORKSPACE.`);
              continue;
            }
            if (fs2.statSync(file).isDirectory()) {
              core.debug(`Skip directory '${file}'.`);
              continue;
            }
            const hash = crypto.createHash('sha256');
            const pipeline = util.promisify(stream.pipeline);
            yield pipeline(fs2.createReadStream(file), hash);
            result.write(hash.digest());
            count++;
            if (!hasMatch) {
              hasMatch = true;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        result.end();
        if (hasMatch) {
          core.debug(`Found ${count} files to hash.`);
          return result.digest('hex');
        } else {
          core.debug(`No matches found for glob`);
          return '';
        }
      });
    }
    exports2.hashFiles = hashFiles;
  },
});

// node_modules/@actions/glob/lib/glob.js
var require_glob = __commonJS({
  'node_modules/@actions/glob/lib/glob.js'(exports2) {
    'use strict';
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.hashFiles = exports2.create = void 0;
    var internal_globber_1 = require_internal_globber();
    var internal_hash_files_1 = require_internal_hash_files();
    function create2(patterns, options) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield internal_globber_1.DefaultGlobber.create(patterns, options);
      });
    }
    exports2.create = create2;
    function hashFiles(patterns, options) {
      return __awaiter(this, void 0, void 0, function* () {
        let followSymbolicLinks = true;
        if (options && typeof options.followSymbolicLinks === 'boolean') {
          followSymbolicLinks = options.followSymbolicLinks;
        }
        const globber = yield create2(patterns, { followSymbolicLinks });
        return internal_hash_files_1.hashFiles(globber);
      });
    }
    exports2.hashFiles = hashFiles;
  },
});

// node_modules/@calyptia/fluent-bit-config-parser/dist/index.js
var require_dist = __commonJS({
  'node_modules/@calyptia/fluent-bit-config-parser/dist/index.js'(exports2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __defProps2 = Object.defineProperties;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
    var __defNormalProp2 = (obj, key, value) =>
      key in obj
        ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
        : (obj[key] = value);
    var __spreadValues2 = (a, b) => {
      for (var prop in b || (b = {})) if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
      if (__getOwnPropSymbols2)
        for (var prop of __getOwnPropSymbols2(b)) {
          if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
    var __markAsModule2 = (target) => __defProp2(target, '__esModule', { value: true });
    var __objRest2 = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols2)
        for (var prop of __getOwnPropSymbols2(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop)) target[prop] = source[prop];
        }
      return target;
    };
    var __commonJS2 = (cb, mod) =>
      function __require() {
        return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
    var __export = (target, all) => {
      __markAsModule2(target);
      for (var name in all) __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __reExport2 = (target, module22, desc) => {
      if ((module22 && typeof module22 === 'object') || typeof module22 === 'function') {
        for (let key of __getOwnPropNames2(module22))
          if (!__hasOwnProp2.call(target, key) && key !== 'default')
            __defProp2(target, key, {
              get: () => module22[key],
              enumerable: !(desc = __getOwnPropDesc2(module22, key)) || desc.enumerable,
            });
      }
      return target;
    };
    var __toModule2 = (module22) => {
      return __reExport2(
        __markAsModule2(
          __defProp2(
            module22 != null ? __create2(__getProtoOf2(module22)) : {},
            'default',
            module22 && module22.__esModule && 'default' in module22
              ? { get: () => module22.default, enumerable: true }
              : { value: module22, enumerable: true }
          )
        ),
        module22
      );
    };
    var require_rng = __commonJS2({
      'node_modules/uuid/dist/rng.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = rng;
        var _crypto = _interopRequireDefault(require('crypto'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var rnds8Pool = new Uint8Array(256);
        var poolPtr = rnds8Pool.length;
        function rng() {
          if (poolPtr > rnds8Pool.length - 16) {
            _crypto.default.randomFillSync(rnds8Pool);
            poolPtr = 0;
          }
          return rnds8Pool.slice(poolPtr, (poolPtr += 16));
        }
      },
    });
    var require_regex = __commonJS2({
      'node_modules/uuid/dist/regex.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _default =
          /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        exports3.default = _default;
      },
    });
    var require_validate = __commonJS2({
      'node_modules/uuid/dist/validate.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _regex = _interopRequireDefault(require_regex());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function validate2(uuid2) {
          return typeof uuid2 === 'string' && _regex.default.test(uuid2);
        }
        var _default = validate2;
        exports3.default = _default;
      },
    });
    var require_stringify = __commonJS2({
      'node_modules/uuid/dist/stringify.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _validate = _interopRequireDefault(require_validate());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var byteToHex = [];
        for (let i = 0; i < 256; ++i) {
          byteToHex.push((i + 256).toString(16).substr(1));
        }
        function stringify2(arr, offset = 0) {
          const uuid2 = (
            byteToHex[arr[offset + 0]] +
            byteToHex[arr[offset + 1]] +
            byteToHex[arr[offset + 2]] +
            byteToHex[arr[offset + 3]] +
            '-' +
            byteToHex[arr[offset + 4]] +
            byteToHex[arr[offset + 5]] +
            '-' +
            byteToHex[arr[offset + 6]] +
            byteToHex[arr[offset + 7]] +
            '-' +
            byteToHex[arr[offset + 8]] +
            byteToHex[arr[offset + 9]] +
            '-' +
            byteToHex[arr[offset + 10]] +
            byteToHex[arr[offset + 11]] +
            byteToHex[arr[offset + 12]] +
            byteToHex[arr[offset + 13]] +
            byteToHex[arr[offset + 14]] +
            byteToHex[arr[offset + 15]]
          ).toLowerCase();
          if (!(0, _validate.default)(uuid2)) {
            throw TypeError('Stringified UUID is invalid');
          }
          return uuid2;
        }
        var _default = stringify2;
        exports3.default = _default;
      },
    });
    var require_v1 = __commonJS2({
      'node_modules/uuid/dist/v1.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _rng = _interopRequireDefault(require_rng());
        var _stringify = _interopRequireDefault(require_stringify());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var _nodeId;
        var _clockseq;
        var _lastMSecs = 0;
        var _lastNSecs = 0;
        function v12(options, buf, offset) {
          let i = (buf && offset) || 0;
          const b = buf || new Array(16);
          options = options || {};
          let node = options.node || _nodeId;
          let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
          if (node == null || clockseq == null) {
            const seedBytes = options.random || (options.rng || _rng.default)();
            if (node == null) {
              node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
            }
            if (clockseq == null) {
              clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 16383;
            }
          }
          let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
          let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
          const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
          if (dt < 0 && options.clockseq === void 0) {
            clockseq = (clockseq + 1) & 16383;
          }
          if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
            nsecs = 0;
          }
          if (nsecs >= 1e4) {
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          }
          _lastMSecs = msecs;
          _lastNSecs = nsecs;
          _clockseq = clockseq;
          msecs += 122192928e5;
          const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
          b[i++] = (tl >>> 24) & 255;
          b[i++] = (tl >>> 16) & 255;
          b[i++] = (tl >>> 8) & 255;
          b[i++] = tl & 255;
          const tmh = ((msecs / 4294967296) * 1e4) & 268435455;
          b[i++] = (tmh >>> 8) & 255;
          b[i++] = tmh & 255;
          b[i++] = ((tmh >>> 24) & 15) | 16;
          b[i++] = (tmh >>> 16) & 255;
          b[i++] = (clockseq >>> 8) | 128;
          b[i++] = clockseq & 255;
          for (let n = 0; n < 6; ++n) {
            b[i + n] = node[n];
          }
          return buf || (0, _stringify.default)(b);
        }
        var _default = v12;
        exports3.default = _default;
      },
    });
    var require_parse = __commonJS2({
      'node_modules/uuid/dist/parse.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _validate = _interopRequireDefault(require_validate());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function parse3(uuid2) {
          if (!(0, _validate.default)(uuid2)) {
            throw TypeError('Invalid UUID');
          }
          let v;
          const arr = new Uint8Array(16);
          arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
          arr[1] = (v >>> 16) & 255;
          arr[2] = (v >>> 8) & 255;
          arr[3] = v & 255;
          arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
          arr[5] = v & 255;
          arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
          arr[7] = v & 255;
          arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
          arr[9] = v & 255;
          arr[10] = ((v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776) & 255;
          arr[11] = (v / 4294967296) & 255;
          arr[12] = (v >>> 24) & 255;
          arr[13] = (v >>> 16) & 255;
          arr[14] = (v >>> 8) & 255;
          arr[15] = v & 255;
          return arr;
        }
        var _default = parse3;
        exports3.default = _default;
      },
    });
    var require_v35 = __commonJS2({
      'node_modules/uuid/dist/v35.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = _default;
        exports3.URL = exports3.DNS = void 0;
        var _stringify = _interopRequireDefault(require_stringify());
        var _parse = _interopRequireDefault(require_parse());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function stringToBytes(str) {
          str = unescape(encodeURIComponent(str));
          const bytes = [];
          for (let i = 0; i < str.length; ++i) {
            bytes.push(str.charCodeAt(i));
          }
          return bytes;
        }
        var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
        exports3.DNS = DNS;
        var URL2 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
        exports3.URL = URL2;
        function _default(name, version2, hashfunc) {
          function generateUUID(value, namespace, buf, offset) {
            if (typeof value === 'string') {
              value = stringToBytes(value);
            }
            if (typeof namespace === 'string') {
              namespace = (0, _parse.default)(namespace);
            }
            if (namespace.length !== 16) {
              throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
            }
            let bytes = new Uint8Array(16 + value.length);
            bytes.set(namespace);
            bytes.set(value, namespace.length);
            bytes = hashfunc(bytes);
            bytes[6] = (bytes[6] & 15) | version2;
            bytes[8] = (bytes[8] & 63) | 128;
            if (buf) {
              offset = offset || 0;
              for (let i = 0; i < 16; ++i) {
                buf[offset + i] = bytes[i];
              }
              return buf;
            }
            return (0, _stringify.default)(bytes);
          }
          try {
            generateUUID.name = name;
          } catch (err) {}
          generateUUID.DNS = DNS;
          generateUUID.URL = URL2;
          return generateUUID;
        }
      },
    });
    var require_md5 = __commonJS2({
      'node_modules/uuid/dist/md5.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _crypto = _interopRequireDefault(require('crypto'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function md5(bytes) {
          if (Array.isArray(bytes)) {
            bytes = Buffer.from(bytes);
          } else if (typeof bytes === 'string') {
            bytes = Buffer.from(bytes, 'utf8');
          }
          return _crypto.default.createHash('md5').update(bytes).digest();
        }
        var _default = md5;
        exports3.default = _default;
      },
    });
    var require_v3 = __commonJS2({
      'node_modules/uuid/dist/v3.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _v = _interopRequireDefault(require_v35());
        var _md = _interopRequireDefault(require_md5());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var v32 = (0, _v.default)('v3', 48, _md.default);
        var _default = v32;
        exports3.default = _default;
      },
    });
    var require_v4 = __commonJS2({
      'node_modules/uuid/dist/v4.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _rng = _interopRequireDefault(require_rng());
        var _stringify = _interopRequireDefault(require_stringify());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function v42(options, buf, offset) {
          options = options || {};
          const rnds = options.random || (options.rng || _rng.default)();
          rnds[6] = (rnds[6] & 15) | 64;
          rnds[8] = (rnds[8] & 63) | 128;
          if (buf) {
            offset = offset || 0;
            for (let i = 0; i < 16; ++i) {
              buf[offset + i] = rnds[i];
            }
            return buf;
          }
          return (0, _stringify.default)(rnds);
        }
        var _default = v42;
        exports3.default = _default;
      },
    });
    var require_sha1 = __commonJS2({
      'node_modules/uuid/dist/sha1.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _crypto = _interopRequireDefault(require('crypto'));
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function sha1(bytes) {
          if (Array.isArray(bytes)) {
            bytes = Buffer.from(bytes);
          } else if (typeof bytes === 'string') {
            bytes = Buffer.from(bytes, 'utf8');
          }
          return _crypto.default.createHash('sha1').update(bytes).digest();
        }
        var _default = sha1;
        exports3.default = _default;
      },
    });
    var require_v5 = __commonJS2({
      'node_modules/uuid/dist/v5.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _v = _interopRequireDefault(require_v35());
        var _sha = _interopRequireDefault(require_sha1());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        var v52 = (0, _v.default)('v5', 80, _sha.default);
        var _default = v52;
        exports3.default = _default;
      },
    });
    var require_nil = __commonJS2({
      'node_modules/uuid/dist/nil.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _default = '00000000-0000-0000-0000-000000000000';
        exports3.default = _default;
      },
    });
    var require_version = __commonJS2({
      'node_modules/uuid/dist/version.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        exports3.default = void 0;
        var _validate = _interopRequireDefault(require_validate());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
        function version2(uuid2) {
          if (!(0, _validate.default)(uuid2)) {
            throw TypeError('Invalid UUID');
          }
          return parseInt(uuid2.substr(14, 1), 16);
        }
        var _default = version2;
        exports3.default = _default;
      },
    });
    var require_dist2 = __commonJS2({
      'node_modules/uuid/dist/index.js'(exports3) {
        'use strict';
        Object.defineProperty(exports3, '__esModule', {
          value: true,
        });
        Object.defineProperty(exports3, 'v1', {
          enumerable: true,
          get: function () {
            return _v.default;
          },
        });
        Object.defineProperty(exports3, 'v3', {
          enumerable: true,
          get: function () {
            return _v2.default;
          },
        });
        Object.defineProperty(exports3, 'v4', {
          enumerable: true,
          get: function () {
            return _v3.default;
          },
        });
        Object.defineProperty(exports3, 'v5', {
          enumerable: true,
          get: function () {
            return _v4.default;
          },
        });
        Object.defineProperty(exports3, 'NIL', {
          enumerable: true,
          get: function () {
            return _nil.default;
          },
        });
        Object.defineProperty(exports3, 'version', {
          enumerable: true,
          get: function () {
            return _version.default;
          },
        });
        Object.defineProperty(exports3, 'validate', {
          enumerable: true,
          get: function () {
            return _validate.default;
          },
        });
        Object.defineProperty(exports3, 'stringify', {
          enumerable: true,
          get: function () {
            return _stringify.default;
          },
        });
        Object.defineProperty(exports3, 'parse', {
          enumerable: true,
          get: function () {
            return _parse.default;
          },
        });
        var _v = _interopRequireDefault(require_v1());
        var _v2 = _interopRequireDefault(require_v3());
        var _v3 = _interopRequireDefault(require_v4());
        var _v4 = _interopRequireDefault(require_v5());
        var _nil = _interopRequireDefault(require_nil());
        var _version = _interopRequireDefault(require_version());
        var _validate = _interopRequireDefault(require_validate());
        var _stringify = _interopRequireDefault(require_stringify());
        var _parse = _interopRequireDefault(require_parse());
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }
      },
    });
    __export(exports2, {
      FluentBitSchema: () => FluentBitSchema2,
    });
    var getFluentBitSchema = (ast) => {
      return {
        config: ast.map((configNode) => {
          const _a = configNode,
            { name, id, command } = _a,
            optional = __objRest2(_a, ['name', 'id', 'command']);
          return { command, name, optional, id };
        }),
      };
    };
    var import_dist = __toModule2(require_dist2());
    var v1 = import_dist.default.v1;
    var v3 = import_dist.default.v3;
    var v4 = import_dist.default.v4;
    var v5 = import_dist.default.v5;
    var NIL = import_dist.default.NIL;
    var version = import_dist.default.version;
    var validate = import_dist.default.validate;
    var stringify = import_dist.default.stringify;
    var parse = import_dist.default.parse;
    var COMMANDS = /* @__PURE__ */ ((COMMANDS2) => {
      COMMANDS2['OUTPUT'] = 'OUTPUT';
      COMMANDS2['INPUT'] = 'INPUT';
      COMMANDS2['FILTER'] = 'FILTER';
      COMMANDS2['SERVICE'] = 'SERVICE';
      COMMANDS2['PARSER'] = 'PARSER';
      return COMMANDS2;
    })(COMMANDS || {});
    var FLUENTBIT_REGEX = /(?<![#][ ]*)\[[A-Z]{1,}\]/g;
    var EXCLUDED_TAGS = /* @__PURE__ */ new Set(['service', 'parser', 'node', 'upstream']);
    var isValidCommand = (value) => Object.keys(COMMANDS).includes(value);
    var isFluentBit = (config) => !!config.match(FLUENTBIT_REGEX);
    var isValidFluentBitSchemaType = (schema) => !!schema && !EXCLUDED_TAGS.has(schema.command.toLowerCase());
    var NEW_CHAR = '\n    ';
    function schemaToString(configValues) {
      const blocks = configValues.map((values) => {
        const _a = values,
          { command, id } = _a,
          rest = __objRest2(_a, ['command', 'id']);
        const properties = Object.entries(rest).reduce(
          (memo, [key, value]) => `${memo}${NEW_CHAR}${key}  ${value}`,
          ''
        );
        return [`[${command.toUpperCase()}]`, properties].join('');
      });
      return blocks.join('\n\n');
    }
    function normalizeField(field) {
      const normalizedField = field.toLowerCase();
      return normalizedField === 'match_regex' ? 'match' : normalizedField;
    }
    function parse2(config) {
      if (!config.replace(/\s/g, '')) {
        throw new Error('Invalid Config file');
      }
      const fields = config.match(FLUENTBIT_REGEX);
      let prev;
      if (!fields) {
        throw new Error('We could not find fields in the configuration');
      }
      const indexes = fields.map((field, key) => {
        if (key) {
          prev = config.indexOf(field, prev + fields[key - 1].length);
          return prev;
        }
        prev = config.indexOf(field);
        return prev;
      });
      const parsedByBlock = indexes.map((index, key) => config.slice(index, indexes[key + 1]));
      const parsedBlocksByLines = parsedByBlock.map((val) =>
        val.split('\n').filter((elm) => !!elm.replace(/\s/g, '').length)
      );
      const configBlocks = parsedBlocksByLines.map((val) => {
        const blockSchema = {};
        const [commandField, ...blocks] = val;
        const command = commandField.replace(/[\[\]]/g, '');
        if (!isValidCommand(command)) {
          throw new Error(`Command is not valid, we got ${command}, it should be ${Object.keys(COMMANDS)}`);
        }
        for (const block of blocks) {
          let temp = block.replace(/\s+/g, ' ');
          if (temp[0] === ' ') {
            temp = temp.substring(1);
          }
          if (temp[0] === '#') {
            continue;
          }
          const [field, ...properties] = temp.split(' ').filter(Boolean);
          blockSchema[normalizeField(field)] = properties.reduce((acc, cur) => acc + cur + ' ', ' ').slice(1, -1);
        }
        if (
          blockSchema.name &&
          (blockSchema.name.includes('fluentbit_metrics') || blockSchema.name.includes('calyptia'))
        ) {
          return null;
        }
        return __spreadProps2(__spreadValues2({}, blockSchema), { command, id: v4() });
      });
      return configBlocks.filter(isValidFluentBitSchemaType);
    }
    var FluentBitSchema2 = class {
      constructor(source) {
        this._ast = parse2(source);
        this._source = source;
      }
      static isFluentBitConfiguration(source) {
        return isFluentBit(source);
      }
      get source() {
        return this._source;
      }
      get schema() {
        return getFluentBitSchema(this._ast);
      }
      toString() {
        return schemaToString(this._ast);
      }
    };
  },
});

// @types/node-fetch/index.ts
var require_node_fetch = __commonJS({
  '@types/node-fetch/index.ts'() {},
});

// src/index.ts
var import_core = __toModule(require_core());
var glob = __toModule(require_glob());

// src/utils/readContent.ts
var import_fs = __toModule(require('fs'));
var import_util = __toModule(require('util'));
var readFile = (0, import_util.promisify)(import_fs.default.readFile);
var readContent = async (filePath) => {
  const content = await readFile(filePath, { encoding: 'utf-8' });
  return content;
};

// src/index.ts
var import_fluent_bit_config_parser = __toModule(require_dist());
var import_node_fetch = __toModule(require_node_fetch());

// src/utils/constants.ts
var CALYPTIA_API_ENDPOINT = 'https://cloud-api.calyptia.com';
var CALYPTIA_API_VALIDATION_PATH = 'v1/config_validate/fluentbit';

// src/utils/normalizeErrors.ts
function normalizeErrors(filePath, _a) {
  var _b = _a,
    { runtime } = _b,
    errors = __objRest(_b, ['runtime']);
  const annotations = Object.entries(errors).reduce((memo, [title, issues]) => {
    if (Object.keys(issues).length) {
      const errGroup = Object.entries(issues).map(([group, problems]) => `[${group}]: ${problems.join(',')}`);
      return [...memo, { file: filePath, message: `${errGroup.join('\n')}`, title }];
    }
    return memo;
  }, []);
  return annotations;
}

// src/index.ts
var InputValues = /* @__PURE__ */ ((InputValues2) => {
  InputValues2['CONFIG_LOCATION_GLOB'] = 'CONFIG_LOCATION_GLOB';
  InputValues2['CALYPTIA_API_KEY'] = 'CALYPTIA_API_KEY';
  InputValues2['GITHUB_TOKEN'] = 'GITHUB_TOKEN';
  return InputValues2;
})(InputValues || {});
var getActionInput = () => {
  return Object.keys(InputValues).reduce((memo, prop) => {
    const value = (0, import_core.getInput)(prop);
    return value ? __spreadProps(__spreadValues({}, memo), { [prop]: value }) : memo;
  }, {});
};
var main = async () => {
  try {
    const input = getActionInput();
    const globber = await glob.create(input.CONFIG_LOCATION_GLOB, { matchDirectories: false });
    let annotations = [];
    for await (const filePath of globber.globGenerator()) {
      (0, import_core.debug)(`evaluating file ${filePath}`);
      const content = await readContent(filePath);
      if (import_fluent_bit_config_parser.FluentBitSchema.isFluentBitConfiguration(content)) {
        (0, import_core.debug)(`File ${filePath} seems to be fluent-bit config, validating...`);
        const URL2 = `${CALYPTIA_API_ENDPOINT}/${CALYPTIA_API_VALIDATION_PATH}`;
        const headers = {
          'Content-Type': 'application/json',
          'x-project-token': input.CALYPTIA_API_KEY,
        };
        try {
          const config = new import_fluent_bit_config_parser.FluentBitSchema(content);
          const response = await (0, import_node_fetch.default)(URL2, {
            method: 'POST',
            body: JSON.stringify(config.schema),
            headers,
          });
          const data = await response.json();
          if (response.status === 200) {
            (0, import_core.debug)(`[${filePath}]: ${JSON.stringify(data)}`);
            const errors = normalizeErrors(filePath, data.errors);
            if (errors.length) {
              (0, import_core.debug)(`${filePath}, Found errors: ${JSON.stringify(errors, null, 2)}`);
              annotations = [...annotations, ...errors];
            }
          } else {
            (0, import_core.setFailed)(`The request failed:  ${JSON.stringify(data)}`);
          }
        } catch (e) {
          (0, import_core.setFailed)(`something went very wrong ${JSON.stringify(e.message)}`);
        }
      }
    }
    if (annotations.length) {
      for (const annotation of annotations) {
        (0, import_core.error)(new Error('Linting Error'), annotation);
      }
      (0, import_core.setFailed)('We found errors in your configurations');
    }
  } catch (error2) {
    (0, import_core.setFailed)(JSON.stringify(error2));
  }
};

// index.ts
main();
