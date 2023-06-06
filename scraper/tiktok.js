const axios = require("axios").default;
const cheerio = require("cheerio");
const fetch = require("node-fetch")

function tiktok(url) {
    return new Promise(async (resolve, reject) => {
      const getDataInput = await axios.get('https://musicaldown.com/id');
      const $ = cheerio.load(getDataInput.data);
      let inputData = new Array();
      $('form').find('input').get().map(map => {
        inputData.push({
          name: $(map).attr('name'),
          value: $(map).attr('value')
        });
      });
      const link = new URL(url);
      axios({
        method: 'POST',
        url: 'https://musicaldown.com/id/download',
        data: `${inputData[0]['name']}=${encodeURIComponent(link['origin'] + link['pathname'])}&${inputData[1]['name']}=${inputData[1]['value']}&${inputData[2]['name']}=${inputData[2]['value']}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Origin': 'https://musicaldown.com',
          'Referer': 'https://musicaldown.com/id',
          'Cookie': getDataInput['headers']['set-cookie']
        }
      }).then(response => {
        axios({
          method: 'POST',
          url: 'https://musicaldown.com/id/mp3',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36',
            'Cookie': getDataInput['headers']['set-cookie']
          }
        }).then(({ data }) => {
          const $ = cheerio.load(response['data']);
          const _ = cheerio.load(data);
          let video = new Array();
          let audio = new Array();
          let result = new Object();
          $('a[target=\'_blank\']').get().map(output => {
            video.push($(output).attr('href'));
          });
          _('a.waves-effect').get().map(output => {
            audio.push($(output).attr('href'));
          });
          result['title'] = $('title').text().trim();
          result['title_audio'] = _('title').text().split(' |')[0];
          result['thumbnail'] = $('img.responsive-img').attr('src');
          result['video'] = video.filter(output => output.includes('/video/'));
          result['audio'] = audio.filter(output => {
            if (!/https:\/\//.test(output)) return;
            return output;
          });
          resolve(result);
        }).catch(reject);
      }).catch(reject);
    });
  }
async function ttdl(url) {
  const web = await fetch("https://api.tiklydown.me/api/download?url=" + encodeURIComponent(url))
  const data = await web.json()
  return data
} 


module.exports = {
  tiktok,
  ttdl
}
