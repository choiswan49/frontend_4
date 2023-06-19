console.log('node.js'); // html 형식
console.dir('directory json'); // json 형식
console.count(); 
console.count(); 
console.count(); // count를 자동으로 출력

console.time('for start');
let sum = 0;

for (let a=0; a<1000; a++){
    sum+=a;
}
console.log(sum);