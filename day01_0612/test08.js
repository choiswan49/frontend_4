const {format} = require('date-fns');

const today = new Date();
console.log(today);
const todayFromat = format(today, 'yy-MM-dd hh:mm');
console.log(todayFromat);

// node가 npm 처리