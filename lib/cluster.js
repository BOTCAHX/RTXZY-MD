// lib/cluster.js — mode cluster (multi-worker, eksperimental).
// CATATAN: mode ini belum aktif (di-comment di main.js). Worker menjalankan
// cluster.js, dan import '../main.js' akan mengeksekusi entry bot penuh di worker
// (termasuk global.conn + handler) — jadi zapo() di bawah hanya cadangan.
const __dirname = import.meta.dirname;
import cluster from 'cluster'
import os from 'os'
import path from 'path'
import simple from './simple.js'
import { makeWASocketBase, connectionOptions } from '../main.js'

var conn

export function Cluster() {
    if (cluster.isPrimary || !cluster.isWorker) {
        if (os.cpus().length <= 1) throw new Error(`Requires at least 2 cores, but you only have ${os.cpus().length} cores`)
        cluster.setupMaster({
            exec: path.join(__dirname, './cluster.js')
        })
        cluster.fork()
        // console.log(cluster.workers)
    } else {
        zapo()
    }
}

export function zapo() {
    // koneksi per-worker: conn = koneksi ke zapo (makeWASocketBase) + fungsi-fungsi simple
    conn = simple.attach(makeWASocketBase(connectionOptions))
}

if (cluster.isWorker) Cluster()

export default { Cluster, zapo }
