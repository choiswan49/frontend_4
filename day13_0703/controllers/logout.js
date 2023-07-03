const getLogOut = (req, res)=>{
    console.log('logout session: ', req.session); // 확인용

    req.session.destroy((err)=>{
        console.log('session destroy');
        console.log(err)
    })
    
    res.send({success : true, message : 'session delete'});
}
const postLogOut = (req, res)=>{
    res.clearCookie('username');
    // 브랜드 네임 쿠키는 남겨두고 30일 후에 삭제
    // 인증된 사용자 쿠키만 삭제
    res.send({success : true});
}
module.exports = {getLogOut, postLogOut};