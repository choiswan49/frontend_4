const user = {
    firstname: 'swan',
    lastname: 'choi'
}
const {firstname, lastname} = user;
console.log(firstname, lastname);

const {firstname : fn, lastname : ln} = user;
console.log(fn, ln);

const {
    firstname : fname = hello, 
    lastname : lname,
    age = 20
} = user;
console.log(fname, lname, age);

const userTwo = {
    firstname : 'minju',
    address : {
        zipcode : '03625',
        city : 'Seoul'
    }
}

const {address} = userTwo;
console.log(address); // { zipcode: '03625', city: 'Seoul' } // 객체

const {address : {city}} = userTwo;
console.log(city); // Seoul // 객체가 가지고 있는 속성

const {x, ...rest} = { x : 1, y: 2, z: 3};
console.log(x, rest); // 1 { y: 2, z: 3 }