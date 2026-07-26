import fs from 'fs';

async function sKata() {
    return new Promise((resolve, reject) => {
        let kbbi = JSON.parse(fs.readFileSync('./lib/json/kbbi.json', 'utf-8'));
        let huruf = random(['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'u', 'w']);
        let res = kbbi.filter(v => v.startsWith(huruf));
        resolve({
            status: true, kata: random(res)
        });
    });
}

async function cKata(input) {
    return new Promise((resolve, reject) => {
        let kbbi = JSON.parse(fs.readFileSync('./lib/json/kbbi.json', 'utf-8'));
        if (!kbbi.find(v => v == input.toLowerCase())) {
            return resolve({
                creator: '@neoxrs – Wildan Izzudin', status: false
            });
        }
        //halo
        resolve({
            creator: '@neoxrs – Wildan Izzudin', status: true
        });
    });
}

function random(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export {
    sKata,
    cKata
};
