const str =  'https://www.google.com/search?q=git&sxsrf=APwXEde91uHz8CBEOWGZvwpM9aKYJ4imig%3A1686653648429&source=hp&ei=0EqIZK6kGNewoATR7rKYBg&iflsig=AOEireoAAAAAZIhY4E8h9iDxRnlIt2hLU9fsJ3bg3FaW&ved=0ahUKEwiuzMm8isD_AhVXGIgKHVG3DGMQ4dUDCAs&uact=5&oq=git&gs_lcp=Cgdnd3Mtd2l6EAMyEQguEIAEELEDEIMBEMcBENEDMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIFCAAQgAQyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBUABYqQJghQRoAHAAeACAAegBiAG3A5IBAzItMpgBAKABAQ&sclient=gws-wiz';
// regExp

// url?query 구분
// url
const url = require('url');
// parse : 문자열을 url 객체로 만들어주기
// format : url을 문자열로 만들어주기
let urlParse = url.parse(str);
// console.log(urlParse);
console.log(urlParse.search);
console.log(urlParse.query);
console.log(urlParse.pathname);
console.log(urlParse.href);

const qs = require('querystring');
// parse : url에서 ? 뒤의 쿼리를 뽑아내는 것
// format : 쿼리를 문자열로 만들어주기
// query
// key=value
// const param = qs.parse(str); // 주소 자체는 도메인 주소와 path까지 분리
const param = qs.parse(urlParse.query);
console.log("==========================================param==============================================");
console.log(param);