
var debug = require('debug')('ftpget');
var FTP = require('ftp');

/**
 * Connects to `host`, gets `path` and returns a promise
 * resolving to the file’s content.
 * @param  {string} host
 * @param  {string} path
 * @return {Promise}
 */
function ftpget(host, path) {
  'use strict';

  debug('call', host, path);

  return new Promise(function (resolve, reject) {

    var c = new FTP();

    c.on('ready', function () {

      debug('ready');

      c.get(path, false, function (getError, stream) {

        debug('get');

        if ( getError ) {
          debug('getError', getError);
          c.end();
          reject(getError);
          return;
        }

        stream.once('error', function (streamError) {
          debug('streamError', streamError);
          c.end();
          reject(streamError);
        });

        var buf = '';

        stream.on('data', function (chunk) {
          debug('data');
          buf += chunk;
        });

        stream.once('end', function () {
          debug('end');
          c.end();
          resolve(buf);
        });

      });

    });

    c.on('error', function (ftpError) {
      debug('ftpError', ftpError);
      c.end();
      reject(ftpError);
    });

    c.connect({
      host: host,
      keepalive: 500
    });

  });

};

module.exports = ftpget;
