// node가 이벤트를 사용하는 방법
// const EventEmitter = require('events');
// const myEvent = new EventEmitter();
// process는 EventEmitter를 상속 받음

process.on('hello', ()=>{
    console.log('hello event 발생')
})

process.on('javascript', ()=>{
    console.log('javascript event 발생')
})
process.on('bye', ()=>{
    const err = new Error();
})

process.emit('hello');
process.emit('javascript');
process.emit('bye');

process.on('exit',()=>{
    console.log('종료');
})

// 에러 발생 시 동작
process.on('uncaughtException',(err)=>{
    console.log(err);
    process.exit(1); // 즉시 종료
})