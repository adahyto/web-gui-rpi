let isConnected = false;

const connection = io('http://localhost:3000');

connection.on('connect', () => {
  isConnected = true;
});
connection.on('disconnect', () => {
  isConnected = false;
});

const emitWifiScanEvent = event => {
  if (!isConnected) {
    return alert('Connection closed!');
  }
  connection.emit('wifi-scan', { scan: true });
};

const emitWifiConnectEvent = event => {
  connection.emit('wifi-connect', { event });
};

const emitWifiDisconnectEvent = event => {
  connection.emit('wifi-disconnect');
};

const emitWifiCurrentEvent = event => {
  connection.emit('wifi-current');
};

connection.on('scan-res', data => {
  console.log(data);
});

connection.on('wifi-connected', data => {
  console.log(data);
});

connection.on('wifi-disconnected', data => {
  console.log(data);
});

connection.on('wifi-current-res', data => {
  console.log(data);
});

connection.on('wifi-terminated', data => {
  console.log(data);
});

const btnScan = document.getElementById('btn-scan');
const btnDisconnect = document.getElementById('btn-disconnect');
btnScan.addEventListener('click', emitWifiScanEvent);
btnDisconnect.addEventListener('click', emitWifiDisconnectEvent);