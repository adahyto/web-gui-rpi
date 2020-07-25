const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const handles = require('express-handlebars');

// const { dialLed } = require('./services/leds'); // GPIO control

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.engine('handlebars', handles({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const leds = require('./api/leds/index');
const wifi = require('./api/wifi/index');

app.use('/', leds);
app.use('/wifi', wifi);

const server = app.listen(port, () => console.log(`working on ${port}...`));

const serverIO = socketIO(server);

const nWifi = require('node-wifi');

nWifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

serverIO.on('connection', client => {
  console.log('SOCKET: ', 'connected id:', client.id);

  client.on('dial-led', data => {
    console.log(data);
    // dialLed(data.r, data, g, data.b); // GPIO control
  });

  client.on('wifi-scan', data => {
    nWifi.scan((err, networks) => {
      if (err) {
        serverIO.emit('scan-res', 'error occurred');
      } else {
        serverIO.emit('scan-res', networks);
      }
    });
  });

  client.on('wifi-connect', data => {
    nWifi.connect({ ssid: data.ssid, password: data.password }, err => {
      if (err) {
        serverIO.emit('wifi-connected', 'error occurred');
      } else {
        serverIO.emit('wifi-connected', 'connected');
      }
    });
  });

  client.on('wifi-disconnect', data => {
    nWifi.disconnect(err => {
      if (err) {
        serverIO.emit('wifi-disconnected', 'error occurred');
      } else {
        serverIO.emit('wifi-disconnected', 'disconnected');
      }
    });
  });

  client.on('wifi-terminate', data => {
    nWifi.deleteConnection({ ssid: data.ssid }, err => {
      if (err) {
        serverIO.emit('wifi-terminated', 'error occurred');
      } else {
        serverIO.emit('wifi-terminated', 'terminated');
      }
    });
  });

  client.on('wifi-current', data => {
    nWifi.getCurrentConnections(function(err, currentConnections) {
      if (err) {
        serverIO.emit('wifi-current-res', 'error occurred');
      }
      serverIO.emit('wifi-current-res', currentConnections);
    });
  });
});

