# 오픈마켓 서비스

> 배포주소 : https://siwoon1602.github.io/OpenMarket_Service/ </br>
> 🛠 사용 기술스택 : <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> </br>

## 1. 프로젝트의 목표와 기능

### 1.1 프로젝트 목표

- 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하며 구매자는 구매하는 서비스입니다.
- 서버 API를 제공받으며 API를 사용하여 기능을 구현 합니다.
- 바닐라 자바스크립트를 이용한 API 통신과 DOM 활용 그 외 자바스크립트 능률을 향상시킵니다.

### 1.2 구현페이지

✨필수 구현!✨

구매자 페이지

- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지

✨선택 구현!✨

판매자 페이지

- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지

### 1.3 팀 구성

- 윤시운 ( 이번 project는 개인 프로젝트 입니다.)

## 2. 요구사항과 기능 명세

<img src="./imges/need.jpg">

## 3. 프로젝트 구조

📦Openmartket_Service  
 ┣ 📂asset  
 ┣ 📂images  
 ┣ 📂js  
 ┃ ┣ 📜detail.js  
 ┃ ┣ 📜join.js  
 ┃ ┣ 📜login.js  
 ┃ ┗ 📜main.js  
 ┣ 📂style  
 ┃ ┣ 📜common.css  
 ┃ ┣ 📜detail.css  
 ┃ ┣ 📜error.css  
 ┃ ┣ 📜join.css  
 ┃ ┣ 📜login.css  
 ┃ ┣ 📜main.css  
 ┃ ┗ 📜reset.css  
 ┣ 📜details.html  
 ┣ 📜error.html  
 ┣ 📜index.html  
 ┣ 📜join.html  
 ┣ 📜login.html  
 ┗ 📜README.md

### 4. 와이어프레임 / UI

<img src="./imges/ui.png">

#### 필수 구현페이지

<table>
        <tr>
            <td>회원가입</td>
            <td>로그인</td>
        </tr>
        <tr>
            <td>
		<img src="./imges/join.png" width="100%">
            </td>
            <td>
                <img src="./imges/login.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>상품 목록</td>
            <td>상품 상세</td>
        </tr>
        <tr>
            <td>
                <img src="./imges/main.png" width="100%">
            </td>
            <td>
                <img src="./imges/detail.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>상품목록 모달 ON</td>
            <td>상품상세 모달 ON</td>
        </tr>
        <tr>
            <td>
                <img src="./imges/main_modalOn.png" width="100%">
            </td>
            <td>
                <img src="./imges/detail_modalOn.png" width="100%">
            </td>
        </tr>
      
</table>

## 5. 에러와 해결방법

- a
- b
- c

## 6. 개발하며 느낀점

- 지금것 로컬에서 화면,기능 구현만 해왔는데 , API를 통해 서버와 데이터를 주고 받으며 데이터를 활용 해보는 좋은 개발 경험이였습니다.

- 사용해보지 못했거나 존재조차 몰랐던 함수 , DOM 이벤트 , 데이터 접근법 등을 사용해보고 알게되었고 아직도 많은 정보들이 많고 공부의 필요성을 느꼈습니다.

- 로컬에서 개발할때와 배포했을때의 개발환경은 다르고
  QA/QC는 필수적으로 진행해야한다는걸 알았습니다.

## 7. 추후 개발 계획

- 추후 React 지식 습득 후 코드 리팩토링 예정
- 필수 구현페이지 외 선택 구현 (판매자페이지) 페이지 추가 예정
