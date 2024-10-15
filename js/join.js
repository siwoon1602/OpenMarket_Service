// ------------------------ 회원가입 TAP 시작 ------------------------

const buyerJoin = document.querySelector(".buyer_join");
const sellerJoin = document.querySelector(".seller_join");
const whiteBox = document.querySelector(".join_white_box");

buyerJoin.addEventListener("click", () => {
  buyerJoin.classList.add("btn_on");
  buyerJoin.classList.remove("btn_off");
  sellerJoin.classList.add("btn_off");
  whiteBox.style.cssText =
    "  width: 274px; height: 7px; background-color: white; position: absolute; left: 1px; z-index: 15;";
});
sellerJoin.addEventListener("click", () => {
  sellerJoin.classList.add("btn_on");
  sellerJoin.classList.remove("btn_off");

  buyerJoin.classList.add("btn_off");
});

// ------------------------ 회원가입 TAP 종료------------------------

// ------------------------ 아이디 중복검사------------------------

const idCheck = document.querySelector(".checkId");

idCheck.addEventListener("click", async (event) => {
  event.preventDefault();
  const joinId = joinForm.querySelector("#id");
  const idError = joinForm.querySelector(".idMessage");

  const response = await fetch(
    "https://estapi.openmarket.weniv.co.kr/accounts/validate-username/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: joinId.value,
      }),
    }
  );

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
      idError.style.cssText =
        "font-size: 16px; margin-bottom:26px; align-self: flex-start; ";
    }
  }
});

// ------------------------ 아이디 중복검사------------------------

// ------------------------ 유효성 검사------------------------

const joinForm = document.querySelector("form");
const joinResult = document.querySelector(".joinBtn");
const checkBox = document.querySelector("#check_agree");

// 초기화 - 가입하기 버튼 비활성화 및 초기 CSS 스타일 설정
joinResult.disabled = true;
joinResult.style.backgroundColor = "#ccc";
joinResult.style.color = "#fff";

function validateForm() {
  // 인풋 요소 선택
  const joinId = joinForm.querySelector("#id");
  const joinPw = joinForm.querySelector("#pw");
  const joinPwConfirm = joinForm.querySelector("#pwConfirm");
  const joinName = joinForm.querySelector("#name");

  // 에러 메세지 출력 요소 선택
  const idError = joinForm.querySelector(".idMessage");
  const pwError = joinForm.querySelector(".pwMessage");
  const pwConfirmError = joinForm.querySelector(".pwcMessage");
  const nameError = joinForm.querySelector(".nameMessage");

  // 초기화
  joinId.setCustomValidity("");
  joinPw.setCustomValidity("");
  joinPwConfirm.setCustomValidity("");
  joinName.setCustomValidity("");
  idError.textContent = "";
  pwError.textContent = "";
  pwConfirmError.textContent = "";
  nameError.textContent = "";

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const idPattern = /^[a-zA-Z0-9]{1,20}$/;

  let isValid = true; // 유효성 여부 체크 변수

  // 아이디를 입력하지 않은 경우
  if (!joinId.value) {
    joinId.setCustomValidity("필수 정보입니다.");
    idError.style.color = "#eb5757";
    isValid = false;
  } else if (!idPattern.test(joinId.value)) {
    joinId.setCustomValidity(
      "20자 이내의 영문 소문자, 대문자, 숫자만 사용가능합니다."
    );
    idError.style.color = "#eb5757";
    isValid = false;
  }

  // else {
  //   joinId.setCustomValidity("멋진 아이디네요 :)");
  //   idError.style.color = "#21BF48";
  // }

  // 비밀번호를 입력하지 않은 경우
  if (!joinPw.value) {
    joinPw.setCustomValidity("필수 정보입니다.");
    pwError.style.color = "#eb5757";
    isValid = false;
  } else if (!passwordPattern.test(joinPw.value)) {
    joinPw.setCustomValidity(
      "8자 이상, 영문 대,소문자, 숫자, 특수문자를 사용하세요."
    );
    pwError.style.color = "#eb5757";
    isValid = false;
  }

  // 비밀번호 확인 창을 입력하지 않은 경우
  if (!joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("필수 정보입니다.");
    pwConfirmError.style.color = "#eb5757";
    isValid = false;
  } else if (joinPw.value !== joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    pwConfirmError.style.color = "#eb5757";
    isValid = false;
  }

  // 이름을 입력하지 않은 경우
  if (!joinName.value) {
    joinName.setCustomValidity("필수 정보입니다.");
    nameError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
  }

  // 메세지를 출력합니다.
  if (!joinId.checkValidity()) {
    idError.textContent = joinId.validationMessage;
  }
  if (!joinPw.checkValidity()) {
    pwError.textContent = joinPw.validationMessage;
  }
  if (!joinPwConfirm.checkValidity()) {
    pwConfirmError.textContent = joinPwConfirm.validationMessage;
  }
  if (!joinName.checkValidity()) {
    nameError.textContent = joinName.validationMessage;
  }

  if (!checkBox.checked) {
    isValid = false;
  } else {
    isValid = true;
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

// 포커스 아웃 이벤트를 통해 유효성 검사
joinForm.addEventListener("focusout", validateForm);
checkBox.addEventListener("click", validateForm);

// 가입하기 버튼 클릭 이벤트 리스너
joinResult.addEventListener("click", (event) => {
  event.preventDefault();
  joinForm.submit();
});
