[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
# Penjelasan 
 
> **Warning**:Jika ingin database terkoneksi ke MongoDb 
maka di haruskan daftar terlebih dahulu 
akun mongodb anda, Namun sc ini ada akun
Mongo gratis :


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

```bash
web: node . --server
db: node . --db "mongodb+srv://botwa:Jxrt6KiUNOOccDuo@cluster0.dytrn2e.mongodb.net/?retryWrites=true&w=majority" --autocleartmp --restrict
```
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)


>Salin Semua text di atas lalu paste kedalam file 
>Bernama Procfile
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

>Sc ini cocok bagi pemula / yang baru memulai 
>Membuat bot karena fitur nya mudah di mengerti
>dan juga gampang instalasi nya
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
 

## Session Multi auth
```bash
(async () => {
require('./config')
const {
  useSingleFileAuthState,
  useMultiFileAuthState,
  DisconnectReason
} = require('@adiwajshing/baileys')

// menggunakan multi auth file

// if (opts['cluster']) {
//   require('./lib/cluster').Cluster()
// }
const authFile = `${opts._[0] || 'sessions'}`
global.isInit = !fs.existsSync(authFile)
const { state, saveState, saveCreds } = await useMultiFileAuthState(authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: P({ level: 'silent'}), // bisa ke debug/trace 
  version: [2, 2204, 13]
}

//file sessions ada di folder sessions 
```
> Sessions bukan .data.json jadi pengguna mengharuskan menggunakan sessions terbaru
> Sessions tidak bersifat satu/single tapi multi/banyak
