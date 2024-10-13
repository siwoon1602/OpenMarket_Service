// ------------------------ 로그인 validation 시작 ------------------------
const loginForm = document.querySelector(".login_box");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 인풋요소 선택
  const userId = loginForm.querySelector("#id");
  const userPw = loginForm.querySelector("#password");

  // 에러 메세지 출력 요소 선택
  const loginError = loginForm.querySelector(".loginerror");

  userId.setCustomValidity("");
  userPw.setCustomValidity("");
  loginError.textContent = "";

  if (!userId.value) {
    userId.setCustomValidity("아이디를 입력해주세요");
  }

  if (!userPw.value) {
    userPw.setCustomValidity("비밀번호를 입력해주세요");
  }

  // 메세지를 출력
  if (!userId.checkValidity()) {
    loginError.textContent = userId.validationMessage;
    loginError.style.cssText =
      "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
  }

  if (!userPw.checkValidity()) {
    loginError.textContent = userPw.validationMessage;
    loginError.style.cssText =
      "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
  }

  // 폼 내용 제출
  if (userId.checkValidity() && userPw.checkValidity()) {
    event.target.submit();
  }
});

// ------------------------ 로그인 validation 종료 ------------------------

// ------------------------ 회원 로그인 TAP 시작 ------------------------

const buyerLogin = document.querySelector(".buyer_login");
const sellerLogin = document.querySelector(".seller_login");
const whiteArea = document.querySelector(".white_box");

buyerLogin.addEventListener("click", () => {
  buyerLogin.classList.add("btn_on");
  buyerLogin.classList.remove("btn_off");
  whiteArea.classList.remove("white_box");
  whiteArea.classList.add("white_box");
  sellerLogin.classList.add("btn_off");
});
sellerLogin.addEventListener("click", () => {
  sellerLogin.classList.add("btn_on");
  sellerLogin.classList.remove("btn_off");
  whiteArea.classList.remove("white_box");
  whiteArea.classList.add("white_box_R");
  buyerLogin.classList.add("btn_off");
});

// ------------------------ 회원 로그인 TAP 종료------------------------
