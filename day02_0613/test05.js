// 모듈
// 1. 내장 모듈 : os, fs, path, url, querystring
// 2. 외부 모듈 : date-fns
// 3. 사용자 모듈 : hello모듈

const{format} = require('date-fns');
console.log(format(new Date(), 'yyyy-MM-dd'));

/*
-프로젝트 초기화
    %npm init -y
-프로젝트 구성하는 모듈 설치
    %npm i 모듈명 모듈명 ...
    설치된 모듈정보를 package.json에 등록

    .gitignore : node_modules 폴더 제외하기
-프로젝트 복원
    %npm install

-모듈 삭제 : package.json의 dependencies 항목도 지우고 실제 node_modules에 있는 파일도 지움
    %npm uninstall date-fns

-@babel : ECMAScript

-github push
    echo "# day02_0613" >> README.md 파일 만들기
    git init
    git add .
    git commit -m "first commit"
    git branch -M master
    git remote add origin https://github.com/choiswan49/day02_0613.git
    git config --list -> ESC :Q
    git config --global user.name "choiswan49"
    git config --global user.email "evaswan429@gmail.com"
    git push -u origin master

    git status : 상태확인

    // 두번째부터는 다음 반복
    git add .
    git commit -m ""
    git push -u origin master

    git add <file>...
    git restore <file>...
    personal access tokens > Tokens(classic)
    Generate new token  > repo 선택 > 하단 generate

    // git download : 수정ㅇ해서 재업 불가
    // git pull
*/