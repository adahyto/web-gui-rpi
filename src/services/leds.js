const { Gpio } = require('onoff');

const rPin = new Gpio(26, 'out');
const gPin = new Gpio(19, 'out');
const bPin = new Gpio(13, 'out');

exports.dialLed = (r, g, b) => {
  rPin.writeSync(r ? 1 : 0);
  gPin.writeSync(g ? 1 : 0);
  bPin.writeSync(b ? 1 : 0);
}
