export default {
  before: async function all(m) {
    const jakarta = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const current = new Date(jakarta);
    
    if (current.getHours() === 0 && current.getMinutes() === 0) {
      let list = Object.entries(global.db.data.users);
      list.forEach(([user, data]) => {
        data.limit = 100; //sesuaikan dengan limit yang dibutuhkan
      });
      
      console.log('Limit user berhasil direset pada', current);
    }
  }
}
