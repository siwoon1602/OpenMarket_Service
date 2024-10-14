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

// ------------------------ 가입하기 버튼 ------------------------

// document.getElementById("check_agree").addEventListener("change", () => {
//   const checkBox = document.querySelector("#check_agree");
//   const joinResult = document.querySelector(".joinBtn");
//   if (checkBox.checked) {
//     // 체크박스가 체크되면 버튼의 disabled 속성 제거
//     joinResult.removeAttribute("disabled");
//     joinResult.style.cssText =
//       " margin-top: 34px;  background-color: var(--maincolor);color: white; padding: 19px 207px;border-radius: 10px;";
//   } else {
//     // 체크박스가 체크 해제되면 버튼을 다시 disabled 상태로 설정
//     joinResult.setAttribute("disabled", true);
//     joinResult.style.cssText =
//       " margin-top: 34px;background-color: #c4c4c4;color: white;padding: 19px 207px;border-radius: 10px;";
//   }
// });

// ------------------------ 가입하기 버튼 종료------------------------

// ------------------------ 유효성 검사------------------------
// 1. 경우에 따른 메세지를 등록할겁니다. 2. 에러메세지를 출력합니다.

const joinForm = document.querySelector("form");
const joinResult = document.querySelector(".joinBtn");
const checkBox = document.querySelector("#check_agree");

// 초기화 - 가입하기 버튼 비활성화 및 초기 CSS 스타일 설정
joinResult.disabled = true;
joinResult.style.backgroundColor = "#ccc"; // 비활성화 상태 배경색
joinResult.style.color = "#fff"; // 비활성화 상태 글자색

// 유효성 검사를 위한 함수
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
    isValid = false; // 유효성 체크를 통과하지 못함
  } else if (!idPattern.test(joinId.value)) {
    joinId.setCustomValidity(
      "20자 이내의 영문 소문자, 대문자, 숫자만 사용가능합니다."
    );
    idError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
  } else {
    joinId.setCustomValidity("멋진 아이디네요 :)");
    idError.style.color = "#21BF48";
  }

  // 비밀번호를 입력하지 않은 경우
  if (!joinPw.value) {
    joinPw.setCustomValidity("필수 정보입니다.");
    pwError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
  } else if (!passwordPattern.test(joinPw.value)) {
    joinPw.setCustomValidity(
      "8자 이상, 영문 대,소문자, 숫자, 특수문자를 사용하세요."
    );
    pwError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
  }

  // 비밀번호 확인 창을 입력하지 않은 경우
  if (!joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("필수 정보입니다.");
    pwConfirmError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
  } else if (joinPw.value !== joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    pwConfirmError.style.color = "#eb5757";
    isValid = false; // 유효성 체크를 통과하지 못함
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
    isValid = false; // 유효성 체크를 통과하지 못함
  } else {
    isValid = true;
  }

  // 유효성 검사 통과 시 가입하기 버튼 활성화
  if (isValid) {
    joinResult.disabled = false; // 버튼 활성화
    joinResult.style.backgroundColor = "#21BF48"; // 활성화 상태 배경색
    joinResult.style.color = "#fff"; // 활성화 상태 글자색
  } else {
    joinResult.disabled = true; // 버튼 비활성화
    joinResult.style.backgroundColor = "#ccc"; // 비활성화 상태 배경색
    joinResult.style.color = "#fff"; // 비활성화 상태 글자색
  }
}

// 포커스 아웃 이벤트를 통해 유효성 검사
joinForm.addEventListener("focusout", validateForm);

// 가입하기 버튼 클릭 이벤트 리스너
joinResult.addEventListener("click", (event) => {
  event.preventDefault(); // 기본 제출 방지

  // 폼 제출
  joinForm.submit(); // 유효성 검사를 통과했을 때만 이 코드에 도달합니다.
});
