const {format } = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message)=>{
    const dateTime = `${format(new Date(), 'yy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, "logs"))){
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }

        await fsPromises.appendFile(
            path.join(__dirname, "logs", "logEvents.txt"), logItem
        )
    }catch(err){
        console.log(err)
    }
}

// let count = 0;
// let timer = setInterval(()=>{
//     logEvents(++count);
//     if(count === 10) clearInterval(timer);
// }, 2000)

module.exports = logEvents;

