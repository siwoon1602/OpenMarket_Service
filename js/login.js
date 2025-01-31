const loginForm = document.querySelector(".login_box");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // 인풋요소 선택
  const userId = loginForm.querySelector("#id");
  const userPw = loginForm.querySelector("#password");

  // 에러 메세지 출력 요소 선택
  const loginError = loginForm.querySelector(".loginerror");

  // 초기화
  userId.setCustomValidity("");
  userPw.setCustomValidity("");
  loginError.textContent = "";

  // 에러 메세지 셋팅
  if (!userId.value) {
    userId.setCustomValidity("아이디를 입력해주세요");
  }

  if (!userPw.value) {
    userPw.setCustomValidity("비밀번호를 입력해주세요");
  }

  // 에러 메세지 출력
  if (!userId.checkValidity()) {
    loginError.textContent = userId.validationMessage;
    loginError.style.cssText =
      "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    userId.focus();
    return;
  }

  if (!userPw.checkValidity()) {
    loginError.textContent = userPw.validationMessage;
    loginError.style.cssText =
      "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    userPw.focus();
    return;
  }

  // 구매자 로그인 버튼 활성화 여부 확인
  const buyerLogin = document.querySelector(".buyer_login");
  const sellerLogin = document.querySelector(".seller_login");

  let userType = "";
  if (buyerLogin.classList.contains("btn_off")) {
    userType = "SELLER";
  } else if (sellerLogin.classList.contains("btn_off")) {
    userType = "BUYER";
  } else {
    loginError.textContent = "로그인 유형을 선택해주세요.";
    loginError.style.cssText =
      "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    return;
  }

  // 로그인 요청
  try {
    const response = await fetch(
      "https://estapi.openmarket.weniv.co.kr/accounts/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userId.value,
          password: userPw.value,
          login_type: userType,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.user.user_type === userType) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("userType", data.user.user_type);
        localStorage.setItem("userName", data.user.username);
        window.history.back();
        setTimeout(() => {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          localStorage.removeItem("userName");

          window.location.href = "./login.html";
        }, 5 * 60 * 1000);

        window.history.back();
      } else {
        loginError.textContent = "아이디 비밀번호가 일치하지 않습니다";
        loginError.style.cssText =
          "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
        userPw.focus();
        userPw.value = ""; // 비밀번호 필드 초기화
      }
    } else {
      loginError.textContent = "아이디 비밀번호가 일치하지 않습니다";
      loginError.style.cssText =
        "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    loginError.textContent = "로그인 요청 중 오류가 발생했습니다.";
    loginError.style.cssText =
      "color: #EB5757; font-size: 16px; margin-bottom:26px; align-self: flex-start";
  }
});

// 에러 메시지 초기화
const userId = loginForm.querySelector("#id");
const userPw = loginForm.querySelector("#password");
const loginError = loginForm.querySelector(".loginerror");

userId.addEventListener("input", () => {
  if (loginError.textContent === userId.validationMessage) {
    loginError.textContent = "";
  }
  userId.setCustomValidity("");
});

userPw.addEventListener("input", () => {
  if (loginError.textContent === userPw.validationMessage) {
    loginError.textContent = "";
  }
  userPw.setCustomValidity("");
});
// ------------------------ 로그인 validation 종료 ------------------------

const buyerLogin = document.querySelector(".buyer_login");
const sellerLogin = document.querySelector(".seller_login");
const whiteArea = document.querySelector(".white_box");

buyerLogin.addEventListener("click", () => {
  sellerLogin.classList.add("btn_off");
  buyerLogin.classList.add("btn_on");
  buyerLogin.classList.remove("btn_off");
  whiteArea.classList.remove("white_box");
  whiteArea.classList.add("white_box");
});
sellerLogin.addEventListener("click", () => {
  sellerLogin.classList.add("btn_on");
  sellerLogin.classList.remove("btn_off");
  whiteArea.classList.remove("white_box");
  whiteArea.classList.add("white_box_R");
  buyerLogin.classList.add("btn_off");
});

// ------------------------ 회원 로그인 TAP 종료------------------------

// ------------------------ 회원가입로 이동------------------------
const joinBtn = document.querySelector(".joinPage");

joinBtn.addEventListener("click", () => {
  window.location.href = "./join.html";
});
