// ... spread(전개) 연산자
// 구조를 깨서 펼치는 용도

console.log([1, 2, 3]);
console.log(...[1, 2, 3]); // 1 2 3 // 배열이 아님

console.log('HELLO'); // HELLO
console.log(...'HELLO'); // H E L L O

const ary = [1, 2, 3];
// 최대값
const maxNum = Math.max(...ary);
console.log(maxNum);

// // 같은 주소를 사용하므로 원본도 수정되거나 지워짐
// function spreadHandle(rest){
//     rest[0] = 'hello'
//     console.log(rest);
// }
// spreadHandle(ary); // [ 'hello', 2, 3 ]
// console.log(ary); // [ 'hello', 2, 3 ]


function spreadHandle(...rest){
    rest[0] = 'hello'
    console.log(rest);
}
spreadHandle(...ary); // [ 'hello', 2, 3 ]
console.log(ary); // [ 1, 2, 3 ]

const twoAry = ary;
const threeAry = [...ary];
ary[0] = 'javascript'
console.log(twoAry, threeAry, ary); // [ 'javascript', 2, 3 ] [ 1, 2, 3 ] [ 'javascript', 2, 3 ]

console.log(twoAry === ary); // true
console.log(threeAry === ary); // false