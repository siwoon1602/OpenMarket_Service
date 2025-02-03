import { API_BASE_URL } from "./config.js";

let userCategory = "BUYER"; // 기본값

const buyerJoin = document.querySelector(".buyer_join");
const sellerJoin = document.querySelector(".seller_join");
const whiteBox = document.querySelector(".join_white_box");
const whiteBoxR = document.querySelector(".join_white_box_R");
const joinForm = document.querySelector(".join_box");
const joinResult = document.querySelector(".joinBtn");
const checkBox = document.querySelector("#check_agree");

// 구매회원용 HTML
const buyerHTML = `
      <div class="idForm">
        <div class="idAlign">
          <label for="id">아이디</label>
          <input type="text" name="id" id="id" class="join_id"  novalidate/>
        </div>
        <button type="submit" class="checkId">중복확인</button>
      </div>
      <span class="idMessage"></span>

      <div class="pwForm">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw" id="pw" class="join_pw" novalidate/>
        <div id="confirmCircle_pw" class="confirmCircle_pw"></div>
      </div>
      <span class="pwMessage"></span>

      <div class="pwForm">
        <label for="pwConfirm">비밀번호 재확인</label>
        <input type="password" name="pwConfirm" id="pwConfirm" class="join_pwConfirm"novalidate />
        <div id="confirmCircle_pwC" class="confirmCircle_pwC"></div>
      </div>
      <span class="pwcMessage"></span>

      <div class="nameForm">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="join_name" novalidate/>
      </div>
      <span class="nameMessage"></span>

      <div class="numberForm">
        <label for="firstPhoneNumber">휴대폰 번호</label>
        <div class="phonNumber">
          <select name="fistPhoneNumber" id="firstPhoneNumber" >
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
          </select>
          <input type="text" class="numInput" id="secondPhoneNumber" maxlength="4" />
          <input type="text" class="numInput" id="thirdPhoneNumber" maxlength="4" />
        </div>
        <span class="numberMessage"></span>
      </div>
`;

// 판매회원용 HTML
const sellerHTML = `
      <div class="idForm">
        <div class="idAlign">
          <label for="id">아이디</label>
          <input type="text" name="id" id="id" class="join_id" novalidate/>
        </div>
        <button type="submit" class="checkId">중복확인</button>
      </div>
      <span class="idMessage"></span>

      <div class="pwForm">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw" id="pw" class="join_pw"novalidate />
        <div id="confirmCircle_pw" class="confirmCircle_pw"></div>
      </div>
      <span class="pwMessage"></span>

      <div class="pwForm">
        <label for="pwConfirm">비밀번호 재확인</label>
        <input type="password" name="pwConfirm" id="pwConfirm" class="join_pwConfirm" novalidate/>
        <div id="confirmCircle_pwC" class="confirmCircle_pwC"></div>
      </div>
      <span class="pwcMessage"></span>

      <div class="nameForm">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="join_name" novalidate/>
      </div>
      <span class="nameMessage"></span>

      <div class="numberForm">
        <label for="firstPhoneNumber">휴대폰 번호</label>
        <div class="phonNumber">
          <select name="fistPhoneNumber" id="firstPhoneNumber">
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
          </select>
          <input type="text" class="numInput" id="secondPhoneNumber" maxlength="4" />
          <input type="text" class="numInput" id="thirdPhoneNumber" maxlength="4" />
        </div>
        <span class="numberMessage"></span>
      </div>


            <div class="businessForm">
        <div class="businessFormAlign">
          <label for="businessNumber">사업자 등록번호</label>
          <input type="text" name="businessNumber" id="businessNumber" class="join_business" novalidate/>
        </div>
        <button type="submit" class="checkBusinessNumber">인증</button>
      </div>
      <span class="businessMessage"></span>



      <div class="storeForm">
        <label for="storeName">스토어 이름</label>
        <input type="text" name="storeName" id="storeName" class="join_store"novalidate />
      </div>
        <span class="storeMessage"></span>


`;

// 구매회원 클릭 이벤트
buyerJoin.addEventListener("click", () => {
  buyerJoin.classList.add("btn_on");
  buyerJoin.classList.remove("btn_off");
  sellerJoin.classList.add("btn_off");
  whiteBoxR.classList.add("hide");
  whiteBox.classList.remove("hide");
  userCategory = "BUYER";
  joinForm.innerHTML = sellerHTML;
  joinForm.setAttribute("novalidate", "");

  setupEventListeners();
});

// 판매회원 클릭 이벤트
sellerJoin.addEventListener("click", () => {
  sellerJoin.classList.add("btn_on");
  sellerJoin.classList.remove("btn_off");
  buyerJoin.classList.add("btn_off");
  whiteBox.classList.add("hide");
  whiteBoxR.classList.remove("hide");
  userCategory = "SELLER";

  joinForm.innerHTML = sellerHTML;
  joinForm.setAttribute("novalidate", "");

  setupEventListeners();
});

// 가입하기 버튼 비활성화 및 초기 CSS 스타일 설정
joinResult.disabled = true;
joinResult.style.backgroundColor = "#ccc";
joinResult.style.color = "#fff";

// 아이디 패스워드 유효성 검사 함수
function validateForm() {
  const joinId = document.querySelector("#id");
  const joinPw = document.querySelector("#pw");
  const joinPwConfirm = document.querySelector("#pwConfirm");
  const joinName = document.querySelector("#name");
  const firstPhoneNumber = document.getElementById("firstPhoneNumber");
  const secondPhoneNumber = document.getElementById("secondPhoneNumber");
  const thirdPhoneNumber = document.getElementById("thirdPhoneNumber");
  const checkBoxOne = document.querySelector("#confirmCircle_pw");
  const checkBoxTwo = document.querySelector("#confirmCircle_pwC");

  // 에러 메세지 출력 요소 선택
  const idError = document.querySelector(".idMessage");
  const pwError = document.querySelector(".pwMessage");
  const pwConfirmError = document.querySelector(".pwcMessage");
  const nameError = document.querySelector(".nameMessage");
  const numError = document.querySelector(".numberMessage");

  // 판매자 전용 필드
  let storeError, businessError, storeName, businessNumber;
  if (userCategory === "SELLER") {
    storeName = document.querySelector("#storeName");
    businessNumber = document.querySelector("#businessNumber");
    storeError = document.querySelector(".storeMessage");
    businessError = document.querySelector(".businessMessage");
  }

  // 메세지 초기화
  joinId.setCustomValidity("");
  joinId.style.cssText = "border:1px solid #C4C4C4;";
  joinPw.setCustomValidity("");
  joinPw.style.cssText = "border:1px solid #C4C4C4;";
  joinPwConfirm.setCustomValidity("");
  joinPwConfirm.style.cssText = "border:1px solid #C4C4C4;";
  joinName.setCustomValidity("");

  idError.textContent = "";
  pwError.textContent = "";
  pwConfirmError.textContent = "";
  nameError.textContent = "";
  numError.textContent = "";

  if (userCategory === "SELLER") {
    storeError.textContent = "";
    businessError.textContent = "";
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const idPattern = /^[a-zA-Z0-9]{1,20}$/;

  let isValid = true;

  // 아이디 유효성 검사
  if (!joinId.value) {
    joinId.setCustomValidity("필수 정보입니다.");
    idError.textContent = joinId.validationMessage;
    idError.style.color = "#eb5757";
    isValid = false;
  } else if (!idPattern.test(joinId.value)) {
    joinId.setCustomValidity(
      "20자 이내의 영문 소문자, 대문자, 숫자만 사용가능합니다."
    );
    idError.textContent = joinId.validationMessage;
    idError.style.color = "#eb5757";
    joinId.style.cssText = "border:1px solid #eb5757";
    isValid = false;
  }

  // 비밀번호 유효성 검사
  if (!joinPw.value) {
    joinPw.setCustomValidity("필수 정보입니다.");
    pwError.textContent = joinPw.validationMessage;
    pwError.style.color = "#eb5757";
    isValid = false;
    checkBoxOne.classList.remove("confirmCircle_pw_on");
  } else if (!passwordPattern.test(joinPw.value)) {
    joinPw.setCustomValidity(
      "8자 이상, 영문 대,소문자, 숫자, 특수문자를 사용하세요."
    );
    pwError.textContent = joinPw.validationMessage;
    pwError.style.color = "#eb5757";
    joinPw.style.cssText = "border:1px solid #eb5757";
    isValid = false;
    checkBoxOne.classList.remove("confirmCircle_pw_on");
  } else {
    checkBoxOne.classList.add("confirmCircle_pw_on");
  }

  // 비밀번호 재확인 유효성 검사
  if (!joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("필수 정보입니다.");
    pwConfirmError.textContent = joinPwConfirm.validationMessage;
    pwConfirmError.style.color = "#eb5757";
    isValid = false;
    checkBoxTwo.classList.remove("confirmCircle_pwC_on");
  } else if (joinPw.value !== joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    pwConfirmError.textContent = joinPwConfirm.validationMessage;
    pwConfirmError.style.color = "#eb5757";
    joinPwConfirm.style.cssText = "border:1px solid #eb5757";
    isValid = false;
    checkBoxTwo.classList.remove("confirmCircle_pwC_on");
  } else {
    checkBoxTwo.classList.add("confirmCircle_pwC_on");
  }

  // 이름 유효성 검사
  if (!joinName.value) {
    joinName.setCustomValidity("필수 정보입니다.");
    nameError.textContent = joinName.validationMessage;
    nameError.style.color = "#eb5757";
    isValid = false;
  }

  // 휴대폰번호 유효성 검사
  const phoneNumberPattern = /^\d{3}-\d{4}-\d{4}$/;
  const fullPhoneNumber = `${firstPhoneNumber.value}-${secondPhoneNumber.value}-${thirdPhoneNumber.value}`;

  if (
    !firstPhoneNumber.value ||
    !secondPhoneNumber.value ||
    !thirdPhoneNumber.value
  ) {
    numError.textContent = "휴대폰 번호를 입력해주세요.";
    numError.style.color = "#eb5757";
    isValid = false;
  } else if (!phoneNumberPattern.test(fullPhoneNumber)) {
    numError.textContent = "휴대폰 번호 양식이 알맞지 않습니다.";
    numError.style.color = "#eb5757";
    isValid = false;
  }

  // 판매자 추가 필드 유효성 검사
  if (userCategory === "SELLER") {
    if (!storeName.value) {
      storeError.textContent = "필수 정보입니다.";
      storeError.style.color = "#eb5757";
      isValid = false;
    }

    if (!businessNumber.value) {
      businessError.textContent = "필수 정보입니다.";
      businessError.style.color = "#eb5757";
      isValid = false;
    } else if (!/^\d{10}$/.test(businessNumber.value)) {
      businessError.textContent = "올바른 사업자 등록번호를 입력해주세요.";
      businessError.style.color = "#eb5757";
      isValid = false;
    }
  }

  // 체크박스 체크 유무 확인
  if (!checkBox.checked) {
    isValid = false;
  }

  // 유효성 검사 통과 시 가입하기 버튼 활성화
  if (isValid) {
    joinResult.disabled = false;
    joinResult.style.backgroundColor = "#21BF48";
    joinResult.style.color = "#fff";
  } else {
    joinResult.disabled = true;
    joinResult.style.backgroundColor = "#ccc";
    joinResult.style.color = "#fff";
  }
}

// 아이디 중복 확인
async function handleIdCheck(event) {
  event.preventDefault();
  const joinId = document.querySelector("#id");
  const idError = document.querySelector(".idMessage");

  try {
    const response = await fetch(`${API_BASE_URL}accounts/validate-username/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: joinId.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.message) {
        joinId.setCustomValidity("");
        idError.textContent = "멋진 아이디네요! :)";
        idError.style.color = "#21BF48";
      } else {
        idError.textContent = "알 수 없는 오류가 발생했습니다.";
        idError.style.color = "#EB5757";
      }
    } else {
      const errorData = await response.json();
      if (errorData.error) {
        idError.textContent = "이미 사용중인 아이디 입니다";
        idError.style.color = "#EB5757";
        joinId.style.cssText = "border:1px solid #eb5757";
      }
    }
  } catch (error) {
    console.error("서버 통신 오류:", error);
    idError.textContent = "서버 통신 중 오류가 발생했습니다.";
    idError.style.color = "#EB5757";
  }
}

// 사업자등록번호 체크
async function handleBusinessCheck(event) {
  event.preventDefault();
  const businessNumberInput = document.querySelector("#businessNumber");
  const businessError = document.querySelector(".businessMessage");

  try {
    const response = await fetch(
      `${API_BASE_URL}accounts/seller/validate-registration-number/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_registration_number: businessNumberInput.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.message) {
        businessNumberInput.setCustomValidity("");
        businessError.textContent = "사업자등록번호가 인증되었습니다.";
        businessError.style.color = "#21BF48";
      } else {
        businessError.textContent = "알 수 없는 오류가 발생했습니다.";
        businessError.style.color = "#EB5757";
      }
    } else {
      const errorData = await response.json();
      if (errorData.detail) {
        businessError.textContent = "이미 등록된 사업자등록번호입니다.";
        businessError.style.color = "#EB5757";
        businessNumberInput.style.cssText = "border:1px solid #eb5757";
      }
    }
  } catch (error) {
    console.error("서버 통신 오류:", error);
    businessError.textContent = "서버 통신 중 오류가 발생했습니다.";
    businessError.style.color = "#EB5757";
  }
}

// 회원가입 제출 처리
async function handleJoinSubmit(event) {
  event.preventDefault();

  // 가입버튼 클릭시 유효성 검사를 다시 한번 진행
  validateForm();

  if (!joinResult.disabled) {
    const fullPhoneNumber = `${
      document.getElementById("firstPhoneNumber").value
    }${document.querySelector("#secondPhoneNumber").value}${
      document.querySelector("#thirdPhoneNumber").value
    }`;

    // 공통 데이터
    const data = {
      username: document.querySelector("#id").value,
      password: document.querySelector("#pw").value,
      name: document.querySelector("#name").value,
      phone_number: fullPhoneNumber,
      user_type: userCategory,
    };

    // 판매자인 경우 추가 데이터
    if (userCategory === "SELLER") {
      data.store_name = document.querySelector("#storeName").value;
      data.company_registration_number =
        document.querySelector("#businessNumber").value;
    }

    try {
      const endpoint =
        userCategory === "BUYER"
          ? `${API_BASE_URL}accounts/buyer/signup/`
          : `${API_BASE_URL}accounts/seller/signup/`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("회원가입 성공:", responseData);
        window.location.href = "./joinSucceed.html";
        return;
      }

      // 에러 처리
      const numError = document.querySelector(".numberMessage");
      const idError = document.querySelector(".idMessage");

      if (responseData.phone_number) {
        numError.textContent = "이미 사용중인 휴대폰 번호입니다.";
        numError.style.color = "#EB5757";
      } else if (responseData.username) {
        idError.textContent = "이미 사용중인 아이디 입니다.";
        idError.style.color = "#EB5757";
      } else {
        console.error("회원가입 중 오류 발생:", responseData);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("서버와 통신 중 오류 발생:", error);
      window.location.href = "./error.html";
    }
  }
}

// 초기 이벤트 리스너 설정
function setupEventListeners() {
  const idCheck = document.querySelector(".checkId");
  const businessCheck = document.querySelector(".checkBusinessNumber");

  joinForm.addEventListener("focusout", validateForm);
  checkBox.addEventListener("click", validateForm);
  idCheck.addEventListener("click", handleIdCheck);
  joinResult.addEventListener("click", handleJoinSubmit);
  if (userCategory === "SELLER" && businessCheck) {
    businessCheck.addEventListener("click", handleBusinessCheck);
  }
}

// 페이지 로드 시 초기 설정
window.addEventListener("load", () => {
  // 기본 구매회원 폼으로 시작
  userCategory = "BUYER";
  joinForm.innerHTML = buyerHTML;
  joinForm.setAttribute("novalidate", "");
  setupEventListeners();
});
