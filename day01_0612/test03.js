// 배열
const [a, b] = [1, 2];
console.log(a, b);

const [c, d] = [3];
console.log(c, d); // 3 undefined // 모자라면 정의 x

const [e, f] = [4, 5, 6];
console.log(e, f); // 4 5 // 남는 건 문제 발생 x

const [g, , i] = [7, 8, 9];
console.log(g, i); // 7 9 // 순서대로 꺼내올 수 o

const [j=99, k, l=12] = [10, 11];
console.log(j, k, l); // 10 11 12 // 기본 값 < 전달되는 값 

const [m, ...other] = [13, 14, 15];
console.log(m, other); // 13 [14, 15]
// ... : 나머지 연산자, 스프레드 연산자