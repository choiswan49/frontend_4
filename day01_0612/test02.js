// 디스트럭쳐링
// 배열, 오브젝트의 구조를 깨서 필요한 값으로 변환

let ary = [1, 2, 3];
// let one = ary[0];
// let two = ary[1];
// let three = ary[2];


let [one, two, three] = ary; // 배열 순차적으로 꺼냄: 이터러블

console.log(one, two, three);

const user = {
    username : 'kim',
    age : 20,
    subject : 'nodejs'
}

// let username = user.name;
// let age = user.age;
// let subject = user.subject;

const {username, age, subject} = user; // 객체는 순서 X, 같은 속성명으로 꺼내옴

console.log(username, age, subject);