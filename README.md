# 🛒 OPEN MARKET SERVICE

![프로젝트 기간](https://img.shields.io/badge/프로젝트_기간-2024.10.14~2024.10.21_필수기능_구현-fab2ac?style=flat&logoColor=white)<br>
![추가 기능 구현](https://img.shields.io/badge/구매자_페이지_추가_구현-2025.01.28~2025.02.03-fab2ac?style=flat&logoColor=white)<br>
![추가 기능 구현](https://img.shields.io/badge/판매자_페이지_추가_구현-2025.02.04~2025.02.05-fab2ac?style=flat&logoColor=white)<br>
![추가 기능 구현](https://img.shields.io/badge/최종_QA/QC-2025.02.05~2025.02.07-fab2ac?style=flat&logoColor=white)

> 배포주소: https://siwoon1602.github.io/OpenMarket_Service/

> 테스트 계정  
> 구매자 (buyer): ID: buyer1 / PW: weniv1234  
> 판매자 (seller): ID: seller1 / PW: weniv1234

## 🔧 사용 기술스택

<div style="display: flex">
    <img src="./imges/HTMLCSS.png" width="100" alt="HTML/CSS">
    <img src="./imges/JavaScript.png" width="100" alt="JavaScript">
</div>

## 1. 프로젝트의 목표와 기능

### 1.1 프로젝트 목표

- 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하며 구매자는 구매하는 서비스입니다.
- 서버 API를 제공받으며 API를 사용하여 기능을 구현합니다.
- 바닐라 자바스크립트를 이용한 API 통신과 DOM 활용 그 외 자바스크립트 능률을 향상시킵니다.

### 1.2 구현페이지

#### ✨ 구매자 페이지! ✨

구매자 페이지:

- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 상품 결제 페이지
- 검색 결과 페이지
- 마이페이지 (주문확인)
- 주문 상세정보확인 및 주문취소 페이지

#### ✨ 판매자 페이지! ✨

- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 검색 결과 페이지
- 판매자 센터 페이지 (판매자 대시보드)
- 판매 상품 업로드 페이지
- 판매 상품 수정 페이지

### 1.3 팀 구성

## 🙋‍♂️ Developer

|                              FrontEnd                               |
| :-----------------------------------------------------------------: |
| <img src="./assets/윤슌.jpg" width="100" height="100" alt="윤시운"> |
|               [윤시운](https://github.com/siwoon1602)               |

## 2. 요구사항과 기능 명세

### 2.1 구매자 페이지

#### 로그인 페이지

| 📌  |            기능             | 내용                                              | 상태 |
| :-: | :-------------------------: | :------------------------------------------------ | :--: |
|  1  | 아이디, 비밀번호 유효성검사 | 유효성검사 실패시 경고문구                        |  ✅  |
|  2  |     유효성검사 실패 시      | 로그인 불가                                       |  ✅  |
|  3  | 입력창에 값이 비어있는 경우 | 비어있는 입력창에 focus이벤트 발생 및 로그인 불가 |  ✅  |
|  4  |  아이디 비밀번호 불일치 시  | 비밀번호 입력창에 focus이벤트 발생 및 빈칸 처리   |  ✅  |
|  5  |         로그인 성공         | 로그인 버튼을 누른 페이지로 이동                  |  ✅  |

#### 회원가입 페이지

| 📌  |                기능                | 내용                                     | 상태 |
| :-: | :--------------------------------: | :--------------------------------------- | :--: |
|  1  | 유효한 입력창 + 회원가입 동의 체크 | 회원가입 버튼 활성화                     |  ✅  |
|  2  |        입력창 값 미입력 시         | 미입력 입력창에 필수정보 입니다 경고문구 |  ✅  |
|  3  |           회원가입 성공            | 로그인 페이지로 이동                     |  ✅  |
|  4  |    아이디 중복확인 버튼 클릭 시    | 중복인 경우 입력창 하단 경고 문구        |  ✅  |
|  5  |   구매회원 가입 탭 클릭, 가입 시   | 구매자로 회원가입                        |  ✅  |
|  6  |   판매회원 가입 탭 클릭, 가입 시   | 판매자로 회원가입                        |  ✅  |

#### 상품목록 페이지

| 📌  |         기능          | 내용                             | 상태 |
| :-: | :-------------------: | :------------------------------- | :--: |
|  1  | 리스트의 상품 클릭 시 | 일치하는 상품 상세 페이지로 이동 |  ✅  |
|  2  |       상품 정보       | 판매자, 상품명, 가격 노출        |  ✅  |

#### 상품상세 페이지

| 📌  |      기능      | 내용                                                          | 상태 |
| :-: | :------------: | :------------------------------------------------------------ | :--: |
|  1  |  Page Open 시  | productId에 해당하는 상품을 불러오고, 해당 상품 정보를 보여줌 |  ✅  |
|  2  | 상품 수량 변경 | + 와 - 버튼 외 수량 변경 불가                                 |  ✅  |
|  3  | 재고수량 체크  | 현재 상품의 재고 수량 초과시 +버튼 비활성화                   |  ✅  |
|  4  |  재고 품절 시  | 현재 상품의 재고 수량이 0일시 구매,장바구니 버튼 비활성화     |  ✅  |
|  5  |  총 가격 계산  | 선택된 옵션에 맞춰서 가격을 계산하고, 총 가격 노출            |  ✅  |

### 2.2 구매자 추가 구현 페이지 (2025 . 01. 28 ~ 2025. 02. 03)

#### 장바구니 페이지

| 📌  |        기능        | 내용                                                                                     | 상태 |
| :-: | :----------------: | :--------------------------------------------------------------------------------------- | :--: |
|  1  |    Page Open 시    | 사용자가 추가한 장바구니 상품을 불러오고 화면에 보여줌                                   |  ✅  |
|  2  | 개별 상품금액 계산 | 상품가격과 수량을 자동으로 계산하여 보여줌                                               |  ✅  |
|  3  |    결제예정금액    | 선택한 상품의 금액과 상품할인 배송비를 합친<br>결제 예정 금액을 자동으로 계산하여 보여줌 |  ✅  |
|  4  |   개별 상품 주문   | 해당 상품의 order를 생성함                                                               |  ✅  |
|  5  | 장바구니 상품 주문 | 장바구니 내부의 선택된 상품의 order를 생성함                                             |  ✅  |
|  6  |   전체상품 선택    | 장바구니 내부의 모든 상품을 선택함                                                       |  ✅  |
|  7  | 장바구니 상품 삭제 | 장바구니안의 상품을 삭제함                                                               |  ✅  |

#### 주문 페이지

| 📌  |     기능      | 내용                                                                           | 상태 |
| :-: | :-----------: | :----------------------------------------------------------------------------- | :--: |
|  1  | Page Open 시  | 주문할 상품 정보를 화면에 보여줌                                               |  ✅  |
|  2  | 최종결제 정보 | 주문할 상품의 총 금액을 계산해서 보여줌                                        |  ✅  |
|  3  | 우편번호 검색 | 클릭시 우편번호 검색 팝업이 생성됨<br>우편번호 선택시 input에 값이 부여됨      |  ✅  |
|  4  |  유효성 검사  | 모든 input , 결제수단 , 주문내용 동의가 check<br>되면 결제하기 버튼이 활성화됨 |  ✅  |
|  6  | 주문생성 성공 | 주문생성이 성공하면 alert이 생성되고 이전페이지로 돌아감                       |  ✅  |

#### 주문목록 페이지 (마이페이지)

| 📌  |     기능     | 내용                                                   | 상태 |
| :-: | :----------: | :----------------------------------------------------- | :--: |
|  1  | Page Open 시 | 사용자가 생성한 주문정보를 리스트로 화면에 보여줌      |  ✅  |
|  2  |   주문상태   | 사용자가 생성한 주문상태를 보여줌                      |  ✅  |
|  3  |   상세보기   | 클릭시 해당 주문의 상세정보를 볼수있는 페이지로 이동함 |  ✅  |

#### 주문상세 페이지

| 📌  |     기능     | 내용                                                                    | 상태 |
| :-: | :----------: | :---------------------------------------------------------------------- | :--: |
|  1  | Page Open 시 | 선택한 주문의 상세정보를 화면에 보여줌<br>input 값은 수정할 수 없습니다 |  ✅  |
|  2  |   주문취소   | 선택한 주문(장바구니) 가 주문취소 상태로 변경 됩니다                    |  ✅  |

#### 검색 결과 페이지

| 📌  |       기능       | 내용                                                                    | 상태 |
| :-: | :--------------: | :---------------------------------------------------------------------- | :--: |
|  1  | 검색 버튼 클릭시 | 검색데이터 x = 데이터 없음 alert<br>검색데이터 o = 검색된 상품을 보여줌 |  ✅  |

### 2.3 판매자 추가 구현 페이지 (2025 . 02. 03 ~ 2025. 02. 04)

#### 판매자 센터

| 📌  |         기능         | 내용                                                           | 상태 |
| :-: | :------------------: | :------------------------------------------------------------- | :--: |
|  1  |     Page Open 시     | 로그인한 판매자의 스토어명과 등록된 상품을 리스트형태로 보여줌 |  ✅  |
|  2  | 등록된 상품이 없을시 | 상품이 없다는 문구를 보여줌                                    |  ✅  |
|  3  |   상품업로드 버튼    | 상품업로드 페이지로 이동함                                     |  ✅  |
|  4  |      수정 버튼       | 해당상품을 수정하는 페이지로 이동함                            |  ✅  |
|  5  |      삭제 버튼       | 클릭시 삭제 여부를 묻는 alert 발생 <br> 예 버튼 클릭시 삭제 됨 |  ✅  |

#### 상품업로드 페이지

| 📌  |     기능      | 내용                                                                                   | 상태 |
| :-: | :-----------: | :------------------------------------------------------------------------------------- | :--: |
|  1  | 이미지 업로드 | 이미지 업로드 영역 클릭시 업로드 창이 열림<br>업로드가 완료되면 이미지 영역에서 보여줌 |  ✅  |
|  2  |   배송방법    | 버튼 클릭시 색상이 바뀌고 배송방법을 저장함                                            |  ✅  |
|  3  |   저장하기    | input이 비어있는경우 실패 alert <br> 상품등록 성공시 성공 alert후 판매자센터로 이동    |  ✅  |

#### 상품수정 페이지

| 📌  |     기능     | 내용                                                                             | 상태 |
| :-: | :----------: | :------------------------------------------------------------------------------- | :--: |
|  1  | Page Open 시 | 해당 상품의 현재 등록 데이터와 이미지를 가져와 화면에 보여줌                     |  ✅  |
|  2  |   저장하기   | input이 비어있는경우 실패 alert<br> 수정 성공시 성공 alsert후 판매자 센터로 이동 |  ✅  |
|  3  |     취소     | 이전 페이지로 이동                                                               |  ✅  |

## 3. 프로젝트 구조

```
📦 Openmartket_Service
 ┣ 📂 asset
 ┣ 📂 images
 ┣ 📂 js
 ┃ ┣ 📜 cart.js
 ┃ ┣ 📜 config.js
 ┃ ┣ 📜 detail.js
 ┃ ┣ 📜 editItem.js
 ┃ ┣ 📜 join.js
 ┃ ┣ 📜 login.js
 ┃ ┣ 📜 main.js
 ┃ ┣ 📜 myPage.js
 ┃ ┣ 📜 orderEdit.js
 ┃ ┣ 📜 payment.js
 ┃ ┣ 📜 search.js
 ┃ ┣ 📜 searchPage.js
 ┃ ┣ 📜 sellerCenter.js
 ┃ ┗ 📜 uploadItem.js
 ┣ 📂 style
 ┃ ┣ 📜 cart.css
 ┃ ┣ 📜 common.css
 ┃ ┣ 📜 detail.css
 ┃ ┣ 📜 editItem.css
 ┃ ┣ 📜 error.css
 ┃ ┣ 📜 join.css
 ┃ ┣ 📜 joinSucced.css
 ┃ ┣ 📜 login.css
 ┃ ┣ 📜 main.css
 ┃ ┣ 📜 myPage.css
 ┃ ┣ 📜 orderEdit.css
 ┃ ┣ 📜 payment.css
 ┃ ┣ 📜 reset.css
 ┃ ┣ 📜 searchPage.css
 ┃ ┣ 📜 sellerCenter.css
 ┃ ┗ 📜 uploadItem.css
 ┣ 📜 cart.html
 ┣ 📜 constructionZone.html
 ┣ 📜 detail.html
 ┣ 📜 editItem.html
 ┣ 📜 error.html
 ┣ 📜 index.html
 ┣ 📜 join.html
 ┣ 📜 joinSucceed.html
 ┣ 📜 login.html
 ┣ 📜 myPage.html
 ┣ 📜 orderEdit.html
 ┣ 📜 payment.html
 ┣ 📜 searchPage.html
 ┣ 📜 sellerCenter.html
 ┣ 📜 uploadItem.html
 ┗ 📜 README.md
```

## 4. 개발 일정

```mermaid
gantt
title 프로젝트 개발 타임라인
    dateFormat  YYYY-MM-DD
    axisFormat %m/%d

    section 초기 셋업
    프로젝트 시작           :2024-10-11, 1d
    초기 마크업 및 CSS      :2024-10-11, 2d

    section 로그인/회원가입
    로그인 페이지 구현      :2024-10-13, 2d
    회원가입 페이지 개발    :2024-10-14, 3d
    벨리데이션 구현         :2024-10-15, 2d
    API 연동                :2024-10-14, 2d

    section 메인 페이지
    레이아웃 구현           :2024-10-14, 2d
    상품 리스트 기능        :2024-10-15, 2d
    토큰 기반 화면 처리     :2024-10-15, 1d

    section 상세 페이지
    상세 페이지 마크업      :2024-10-16, 1d
    모달창 구현             :2024-10-16, 2d
    상품 정보 탭 기능       :2024-10-16, 1d

    section 기능 개선
    재고 관리 기능          :2024-10-17, 2d
    모달창 개선             :2024-10-17, 2d
    경로 및 배포 수정       :2024-10-17, 2d

    section 최종 개선
    README 업데이트         :2024-10-18, 4d
    코드 정리 및 개선       :2024-10-21, 1d
```

## 5. 와이어프레임 / UI

### 페이지 구성

#### 로그인 페이지

![로그인 페이지](./imges/login.png)
![로그인 검증](./imges/login_va.png)

#### 회원가입 페이지

![회원가입 페이지](./imges/join2.png)
![회원가입 검증](./imges//회원가입%20벨리데이션.png)

#### 상품 목록 페이지

![메인 페이지](./imges/main.png)

#### 상품 상세 페이지

![상세 페이지](./imges/detail.png)
![상세 페이지 모달](./imges/detail_modalOn.png)

#### 공통 모달

![메인 모달](./imges/main_modal.png)

#### 에러페이지

![에러 페이지](./imges/127-0-0-1-5500-error-html.png)

## 6. 에러와 해결방법

- **라우터 구현 이슈**: 라우터를 제대로 이해하지 못해 적용에 실패했으나, API 응답값의 ID를 URL에 활용하여 동적 라우팅을 구현했습니다.

- **로그인 TAP 구현**: z-index만으로는 테두리선과 텍스트 위치가 맞지 않아, 이미지를 활용한 border 처리 방식으로 해결했습니다.

- **페이지 새로고침 이슈**: 로그인 후 이전 페이지에서 DOM이 업데이트되지 않는 문제를 pageshow 이벤트를 사용하여 해결했습니다.

## 7. 개발하며 느낀점

- API를 통한 서버와의 데이터 통신 경험을 쌓을 수 있었습니다.
- 새로운 함수, DOM 이벤트, 데이터 접근법 등을 학습하며 성장했습니다.
- 로컬 개발환경과 배포환경의 차이점을 이해하고, QA/QC의 중요성을 깨달았습니다.
- 프로젝트 기획, 시간 분배, 요구사항 파악의 중요성을 체감했습니다.

## 8. 추후 개발 계획

- React 학습 후 코드 리팩토링 예정
- 판매자 페이지 추가 구현 예정
