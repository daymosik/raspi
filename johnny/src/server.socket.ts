// import servoFn from './johny/components/servo';
// import Exploration from './johny/functions/exploration';
// import exploration from './johny/raspi.ts';
import ledRGBFn from './components/led-rgb'
import motorsFn from './components/motors'
import Player from './functions/play'
import Speech from './functions/speech'
import yamaha from './functions/yamaha'

// tslint:disable-next-line no-var-requires
const server = require('http').createServer()
// tslint:disable-next-line no-var-requires
let io = require('socket.io')
const speach = new Speech()
const player = new Player()

server.listen(8090)
io = io.listen(server)

io.on('connection', (client) => {

  client.on('event', () => {
    // TODO
  })
  client.on('disconnect', () => console.log('Client disconnected.'))

  // Johnny
  client.on('command.moveMotor', (data) => motorsFn[data.command](data.speed))
  // client.on('command.moveServo', data => servoFn[data.command](data.speed));
  client.on('command.changeRGBColor', (data) => ledRGBFn.changeRGBColor(data.color))
  client.on('command.turnOffRGB', () => ledRGBFn.ledRGB && ledRGBFn.ledRGB.off())

  client.on('command.speak', (data) => speach.speak(data.text))
  client.on('command.playRandomSound', () => player.playRandomSound())

  client.on('command.yamaha.turnOn', () => yamaha.turnOn())
  client.on('command.yamaha.turnOff', () => yamaha.turnOff())
  client.on('command.yamaha.turnOnTv', () => yamaha.turnOnTv())
  client.on('command.yamaha.turnOnAppleTv', () => yamaha.turnOnAppleTv())
  client.on('command.yamaha.turnOnPlaystation', () => yamaha.turnOnPlaystation())
  client.on('command.yamaha.volumeUp', () => yamaha.volumeUp())
  client.on('command.yamaha.volumeDown', () => yamaha.volumeDown())

  console.log('Client connected.')
})

export default io