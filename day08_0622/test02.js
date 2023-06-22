const str = `
<div class="popup-contents" id="pop_cont" style="top:50%;width:650px;margin:-258px 0 0 -325px; display:none; z-index:999">
</div>
`

const firstDel = str.substring(2);
// console.log(firstDel);
const lastDel = firstDel.substring(0, firstDel.length-2);
// console.log(lastDel);

const midStr1 = lastDel.indexOf('>');
// console.log(midStr1);
const reStr1 = lastDel.replace('>', ''); // 부등호를 공백으로 바꾸기
const reStr = reStr1.replace('</', ''); // 부등호를 공백으로 바꾸기
// console.log(reStr);

const attrAry = reStr.split(' ');
console.log(attrAry);

// string 문자열 조작 : 다소 옛 방식
// regExp : 정규표현식(문자열 처리하는 새로운 언어)