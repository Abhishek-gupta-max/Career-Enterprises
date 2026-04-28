const https = require('https'); 
https.get('https://career-enterprises-q1ny.vercel.app/', (res) => { 
  let data = ''; 
  res.on('data', c => data += c); 
  res.on('end', () => { 
    const m = data.match(/src="(\/assets\/index-[^"]+\.js)"/); 
    if(m) { 
      https.get('https://career-enterprises-q1ny.vercel.app' + m[1], (res2) => { 
        let d = ''; 
        res2.on('data', c => d += c); 
        res2.on('end', () => { 
          console.log('Contains string path:', d.includes('/src/assets/owner.jpg')); 
          console.log('Contains hashed path:', /owner-[a-zA-Z0-9_-]+\.jpg/.test(d)); 
          console.log('Contains card ravi hashed path:', /card_ravi-[a-zA-Z0-9_-]+\.jpg/.test(d)); 
        }); 
      }); 
    } 
  }); 
});
