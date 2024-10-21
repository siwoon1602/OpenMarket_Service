<!-- logo -->

# OPEN MARTKET_SERVICE <br><br>

[<img src="https://img.shields.io/badge/프로젝트 기간-2024.10.14~2024.10.21-fab2ac?style=flat&logo=&logoColor=white" />]()

> 배포주소 : https://siwoon1602.github.io/OpenMarket_Service/ </br>

🔧🪛사용 기술스택 :<br>
<img src="./imges/HTMLCSS.png" width="80px"> <img src="./imges/JavaScript.png" width="80px"> </br>

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

<img src="./imges/요구사항.png">

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

#### 페이지 구성

- 로그인 페이지

<div>
    <img src="./imges/login2.png" width=300px>
    <img src="./imges/login_va.png" width=300px>
</div><br><br>

- 회원가입 페이지

<div>
    <img src="./imges/join2.png" width=300px>
    <img src="./imges/회원가입 벨리데이션.png" width=300px>
</div><br><br>

- 상품 목록 페이지

<img src="./imges/main.png" width=100%>
<br><br>

- 상품 상세 페이지

<img src="./imges/detail.png" width=100%>
<img src="./imges/detail_modalOn.png" width=100%>
<br><br>

- 상품 상세 페이지 & 상품 목록페이지 공통 모달

<img src="./imges/main_modal.png" width=200px>

## 5. 에러와 해결방법

- 라우터를 제대로 이해못하고 만들어 적용하려다 실패하였고 다른 방법을 찾았습니다 api응답값을 이용하여 동적으로 생성해낸 상품들마다의 id값을 url에 부여하고 응답데이터의 id값과 url의 id값이 일치하면 해당 id의 응답값을 동적으로 화면에 뿌려주게끔 설계했습니다

- 로그인 TAP 구현시 z-index를 활용해서 만들어보려고 했으나 z-index 속성만으로는 테두리선이 안맞거나 텍스트 위치가 틀어지는 현상이 발생하였고, 다른 사이트에서 비슷한 화면을 찾아보고 이미지를 통해 border를 가리는 방식으로 화면을 구현했습니다.

- 로그인 페이지에서 토큰을 로컬 스토리지에 저장한 후 이전 페이지로 돌아가면 해당 페이지의 HTML 요소가 업데이트되지 않는 현상이 발생하여 pageshow 이벤트를 사용하여 페이지가 보여질 때마다 토큰을 확인하고 DOM을 업데이트 할 수있도록 해결하였습니다.

## 6. 개발하며 느낀점

- 지금것 로컬에서 화면,기능 구현만 해왔는데 , API를 통해 서버와 데이터를 주고 받으며 데이터를 활용 해보는 좋은 개발 경험이였습니다.

- 사용해보지 못했거나 존재조차 몰랐던 함수 , DOM 이벤트 , 데이터 접근법 등을 사용해보고 알게되었고 아직도 많은 정보들이 많고 공부의 필요성을 느꼈습니다.

- 로컬에서 개발할때와 배포했을때의 개발환경은 다르고
  QA/QC는 필수적으로 진행해야한다는걸 알았습니다.

## 7. 추후 개발 계획

- 추후 React 지식 습득 후 코드 리팩토링 예정
- 필수 구현페이지 외 선택 구현 (판매자페이지) 페이지 추가 예정
