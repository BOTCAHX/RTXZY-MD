// let fetch = require('node-fetch')
// let crypto = require('crypto')
// let handler = async (m, { text }) => {
  // if (!text) return m.reply('Example: username,email,nomor telepon') 
  // let [username, email, nomor] = text.split(',')
  // let password = crypto.randomBytes(5).toString('hex')
  // try {
    // let res = await fetch(`https://api.botcahx.live/users/register-json?username=${username}&email=${email}&password=${password}&confirmPassword=${password}`)
    // let result = await res.json()
    // let jids = m.quoted ? m.quoted.sender : `${nomor}@s.whatsapp.net`
    // if (result?.result.includes("Success Send Email")) {
      // conn.sendMessage(jids, {
        // text: `*Detail Akun Anda*\n\nEmail: ${email}\nUsername: ${username}\nPassword: ${password}\nWebsite: https://api.botcahx.live\n\n📍 Mesage: ${result.result}`,
      // }, 'conversation')
      // m.reply('Akun berhasil dibuat dan detail akun sudah dikirim ke nomor yang terdaftar!')
    // } else {
      // m.reply(`Gagal Send Email to: ${result?.result.includes("Gagal Send Email to:") ? 'Email tidak terkirim. Harap periksa kembali alamat email Anda.' : result?.message ?? 'unknown'}`)
    // }
  // } catch (e) {
    // console.log(e)
    // throw `Terjadi kesalahan pada saat membuat akun`
  // }
// }
// handler.command = handler.help = ['register', 'addusr']
// handler.tags = ['main']
// handler.premium = false
// handler.group = false
// handler.owner = false
// module.exports = handler



// let fetch = require('node-fetch')
// let crypto = require('crypto')
// let handler = async (m, { text, command, usedPrefix }) => {
  // if (!text) return m.reply(`*Format:* username,gmail,phonenumber\n\n\n*Example*: ${usedPrefix}${command} asep,example@gmail.com,62813958616951\n\nIf the account is not sent, it means that the format of the *number/gmail* that you entered is wrong.`) 
  // let [username, email, nomor] = text.split(',')
  // let password = crypto.randomBytes(5).toString('hex')
  // try {
    // let res = await fetch(`https://api.botcahx.live/users/register-json?username=${username}&email=${email}&password=${password}&confirmPassword=${password}`)
    // let result = await res.json()
    // let jids = m.quoted ? m.quoted.sender : `${nomor}@s.whatsapp.net`
    // if (result?.result.includes("Success Send Email")) {
      // conn.sendMessage(jids, {
        // text: `*Your Account Details*\n\nEmail: ${email}\nUsername: ${username}\nPassword: ${password}\nWebsite: https://api.botcahx.live\n\n📍 Message: ${result.result}`,
      // }, 'conversation')
      // m.reply('Account has been successfully created and has been sent to the registered number!')
    // } else {
      // m.reply(`Failed to Send Email to: ${result?.result.includes("Gagal Send Email to:") ? 'Email was not sent. Please check your email address again.' : result?.message ?? 'unknown'}`)
    // }
  // } catch (e) {
    // console.log(e)
    // throw `An error occurred while creating an account`
  // }
// }
// handler.command = handler.help = ['register', 'addusr']
// handler.tags = ['main']
// handler.premium = false
// handler.group = false
// handler.owner = false
// module.exports = handler

let fetch = require('node-fetch')
let crypto = require('crypto')
let handler = async (m, { text, command, usedPrefix }) => {
  if (!text) return m.reply(`*Format:* username,gmail,phonenumber\n\n\n*Example*: ${usedPrefix}${command} asep,example@gmail.com,62813958616951\n\nIf the account is not sent, it means that the format of the *number/gmail* that you entered is wrong.`) 
  let [username, email, nomor] = text.split(',')
  let password = crypto.randomBytes(5).toString('hex')
  try {
    let res = await fetch(`https://api.botcahx.live/users/register-json?username=${username}&email=${email}&password=${password}&confirmPassword=${password}`)
    let result = await res.json()
    let jids = m.quoted && m.quoted.sender ? m.quoted.sender : `${nomor}@s.whatsapp.net`
    if (result?.result.includes("Success Send Email")) {
      conn.sendMessage(jids, {
        text: `*Your Account Details*\n\nEmail: ${email}\nUsername: ${username}\nPassword: ${password}\nWebsite: https://api.botcahx.live\n\n📍 Message: ${result.result}`,
      }, 'conversation')
      await delay(5000)
      m.reply('Account has been successfully created and has been sent to the registered number!')
    } else {
      m.reply(`Failed to Send Email to: ${result?.result.includes("Gagal Send Email to:") ? 'Email was not sent. Please check your email address again.' : result?.message ?? 'unknown'}`)
    }
  } catch (e) {
    console.log(e)
    throw `An error occurred while creating an account`
  }
}

handler.command = handler.help = ['register', 'addusr']
handler.tags = ['main']
handler.premium = false
handler.group = false
handler.owner = false
module.exports = handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}