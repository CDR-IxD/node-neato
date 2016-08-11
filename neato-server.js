var SerialPort = require("serialport");
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  //console.log('got "keypress"', key);
  drive(key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.exit();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

// Setup the connection to the Neato
var port = new SerialPort("/dev/ttyACM0", {
  baudRate: 115200
});

// Open the port and put the robot into testmode ON so we can drive
port.on('open', function() {
  port.write('testmode on' + '\n', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Neato Ready!');
  });

  //testPath();
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// drive the robot on a sample path
function testPath() {
  port.write('SetMotor LWheelDist 500 RWheelDist 500 Speed 50' + '\n');
}


//drive the robot with keypresses
function drive(key) {
  var dist = 20;
  switch (key.name) {
    case 'w': //fwd
      port.write('SetMotor LWheelDist 20 RWheelDist 20 Speed 100' + '\n');
      break;
    case 'a': //left
      port.write('SetMotor LWheelDist -20 RWheelDist 20 Speed 100' + '\n');
      break;
    case 's': //back
      port.write('SetMotor LWheelDist -20 RWheelDist -20 Speed 100' + '\n');
      break;
    case 'd': //right
      port.write('SetMotor LWheelDist 20 RWheelDist -20 Speed 100' + '\n');
      break;
    case 'q': //slight - left
      port.write('SetMotor LWheelDist 10 RWheelDist 20 Speed 100' + '\n');
      break;
    case 'e': //slight - right
      port.write('SetMotor LWheelDist 20 RWheelDist 10 Speed 100' + '\n');
      break;
    //default:

  }
}
