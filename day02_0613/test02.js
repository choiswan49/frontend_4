// process: 현재 실행되고 있는 프로그램
let count = 0;

// argv : 파라미터 정보 2개
// function 함수명(파라미터, ...){}
console.log(process.argv);
console.log(process.argv[0]);

// argv를 추가할 수 있음
// node test02.js hello js html css

console.log('argv count : ' , process.argv.length);
const aryArgv = process.argv;

aryArgv.forEach(data=>{
    console.log(data)
})

// 환경변수 env: 비밀번호, 환경설정
// process.env