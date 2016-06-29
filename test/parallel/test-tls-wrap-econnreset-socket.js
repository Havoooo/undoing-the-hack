'use strict';

const common = require('../common');
const assert = require('assert');
const net = require('net');
const tls = require('tls');

const server = net.createServer((c) => {
  c.end();
}).listen(() => {
  const port = server.address().port;

  const socket = new net.Socket();

  tls.connect({ socket })
      .once('error', common.mustCall((e) => {
        assert.strictEqual(e.code, 'ECONNRESET');
        assert.strictEqual(e.path, undefined);
        assert.strictEqual(e.host, common.localhostIPv4);
        assert.strictEqual(e.port, port);
        server.close();
      }, 'the request must emit error'));

  socket.connect(port);
});
