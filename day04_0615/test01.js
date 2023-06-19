const fs = require('fs');

if( !fs.existsSync('myfloder') ){
    fs.mkdir('myfloder', (err)=>console.log(err));
}

if (fs.existsSync('myfloder')){
    fs.rmdir('myfloder', (err)=>console.log(err))
}