const { Configuration, OpenAIApi } = require("openai")
var aiapi = global.apikeyaAi
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `

const configuration = new Configuration({
  apiKey: aiapi,
});
const openai = new OpenAIApi(configuration);
	const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.data.choices[0].message.content}`);        
        }
          
handler.command = handler.help = ['ai'];
handler.tags = ['internet'];
module.exports = handler;
