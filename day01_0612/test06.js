const obj = { x : 1, y : 2 }
const copyone = obj;
const copytwo = {...obj};
copyone.x = "hello";

console.log(obj === copyone, obj === copytwo, obj, copyone, copytwo);
// true false { x: 'hello', y: 2 } { x: 'hello', y: 2 } { x: 1, y: 2 }

const merge = { a : 3, b : 4, ...obj};
console.log(merge); // { a: 3, b: 4, x: 'hello', y: 2 }

// Object.assign() : 객체 복사
// Object.keys() : 객체의 키 값 배열로
// Object.values() : 객체의 vale 값 배열로
// Object.entries() : {키 : value}  배열로 

keys = Object.keys(merge);
values = Object.values(merge);
entries = Object.entries(merge);
console.log(keys); // [ 'a', 'b', 'x', 'y' ]
console.log(values); // [ 3, 4, 'hello', 2 ]
console.log(entries); // [ [ 'a', 3 ], [ 'b', 4 ], [ 'x', 'hello' ], [ 'y', 2 ] ]

const copyObj = Object.assign({}, merge);

console.log(copyObj === merge); // false
// 영향 없도록 하기 위한 모듈: __lowdash : 같은 주소를 바라보지 않도록 함