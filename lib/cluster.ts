
// lib/cluster.js — cluster mode (multi-worker, experimental).
// NOTE: This mode is NOT enabled (commented out in main.js). Workers run
// cluster.ts, and importing '../main.ts' executes the full bot entry in the
// worker (including global.conn + handler) — so zapo() below is only a fallback.
const __dirname = import.meta.dirname;
import cluster from 'cluster'
import os from 'os'
import path from 'path'
import simple from './simple.ts'
import { makeWASocketBase, connectionOptions } from '../main.ts'

var conn

export function Cluster() {
    if (cluster.isPrimary || !cluster.isWorker) {
        if (os.cpus().length <= 1) throw new Error(`Requires at least 2 cores, but you only have ${os.cpus().length} cores`)
        cluster.setupMaster({
            exec: path.join(__dirname, './cluster.ts')
        })
        cluster.fork()
    } else {
        zapo()
    }
}

export function zapo() {
    // per-worker connection: conn = zapo connection (makeWASocketBase) + simple helpers
    conn = simple.attach(makeWASocketBase(connectionOptions))
}

if (cluster.isWorker) Cluster()

export default { Cluster, zapo }
