# node-neato
Drive Neato Robot with NodeJS

## Overview
This code acts as a NodeJS based server to control a Neato Botvac D Series. The server connects to the Neato via the Micro USB port inside of the dust bin area of the Neato. We can control the robot using a set of commands while in TESTMODE. A full list of the commands can be found here: [https://www.neatorobotics.com/resources/programmersmanual_20140305.pdf]. We control the Neato with an on-board computer (Raspberry Pi 2) with a WiFi connection. A controller connects to the server on port 3000 and sends commands, such as drive commands.

## Installation & Operation
- Clone this repo
- npm install
- Run server using `node neato-server.js` - this will open a websocket server on port 3000
- Have a controller connect to the server and send commands to control the bot OR control using the command line to test drive.
- Ctrl+C to stop server

## Implemented Commands

**SetMotors**
`SetMotors LWheelDist [mm] RWheelDist [mm] Speed [mm/s]`

The `SetMotors` command will drive the a set distance for each wheel [in mm] at a specific speed [in mm/s]. This is a little odd since you don't have direct control over the speed of the motors. Instead, you need to control the distance and set the speed to turn the robot. Here are some examples commands:

*Forward 100mm in 1 second*
`SetMotors LWheelDist 100 RWheelDist 100 Speed 100`

*Backward 100mm in 1 second*
`SetMotors LWheelDist -100 RWheelDist -100 Speed 100`

*Pivot left*
`SetMotors LWheelDist -100 RWheelDist 100 Speed 100`

*Pivot Right*
`SetMotors LWheelDist 100 RWheelDist -100 Speed 100`

*Curved Path Left*
`SetMotors LWheelDist 100 RWheelDist 300 Speed 50`
Note: To curve the robot you will need to think about how long each wheel will drive for. Remember this is really implemented in your controller. The server just passes along the message.





