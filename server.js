const express = require('express')
const path = require('path')
const SocketIO = require('socket.io')
const qrcode = require('qrcode')
const fetch = require('node-fetch')

function connect(conn, PORT) {
    let app = global.app = express()

    // app.use(express.static(path.join(__dirname, 'views')))
    let _qr = 'invalid'

    conn.ev.on('connection.update', function appQR({ qr }) {
        if (qr) _qr = qr
    })

    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(_qr))
    })

    let server = app.listen(PORT, () => {
      console.log('App listened on port', PORT)
      if (opts['keepalive']) keepAlive()
    })
    let io = SocketIO(server)
    io.on('connection', socket => {
        let { unpipeEmit } = pipeEmit(conn, socket, 'conn-')
        socket.on('disconnect', unpipeEmit)
    })
}

function pipeEmit(event, event2, prefix = '') {
    let old = event.emit
    event.emit = function (event, ...args) {
        old.emit(event, ...args)
        event2.emit(prefix + event, ...args)
    }
    return {
        unpipeEmit() {
            event.emit = old
        }
    }
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  if (/(\/\/|\.)undefined\./.test(url)) return
  setInterval(()=> {
    fetch(url).catch(console.error)
  }, 5 * 1000 * 60)
}


module.exports = connect
