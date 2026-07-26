const __dirname = import.meta.dirname;
import cluster from 'cluster'
import os from 'os'
import path from 'path'
import { connectionOptions } from '../main.js'
import { makeWASocket } from './simple.js'

var conn
export default {
    Cluster() {
        if (cluster.isMaster || !cluster.isWorker) {
            if (!os.cpus().length <= 1) throw new Error(`Requires at least 1 cores, but you only have ${os.cpus().length} cores`)
            cluster.setupMaster({
                exec: path.join(__dirname, './cluster.js')
            })
            // for (let i = 0; i < 3; i++)
                cluster.fork()
            console.log(cluster.workers)
        } else {
            // console.log(cluster.workers)
            // if (cluster.worker.id == 1) this.baileys()
        }
    },
    baileys() {
        conn = makeWASocket(connectionOptions)
        for (let event of Object.keys(conn.ev._events)) {
            conn.ev.on(event, (...updates) => {
                event, updates
            })
        }
    },
    convert() {

    }
}

if (cluster.isWorker) module.exports.Cluster()