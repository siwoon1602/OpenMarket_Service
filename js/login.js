// ------------------------ 로그인 validation 시작 ------------------------
// const loginForm = document.querySelector(".login_box");

// loginForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   // 인풋요소 선택
//   const userId = loginForm.querySelector("#id");
//   const userPw = loginForm.querySelector("#password");

//   // 에러 메세지 출력 요소 선택
//   const loginError = loginForm.querySelector(".loginerror");

//   userId.setCustomValidity("");
//   userPw.setCustomValidity("");
//   loginError.textContent = "";

//   // 에러 메세지 셋팅
//   if (!userId.value) {
//     userId.setCustomValidity("아이디를 입력해주세요");
//   }

//   if (!userPw.value) {
//     userPw.setCustomValidity("비밀번호를 입력해주세요");
//   }

//   // 에러 메세지 출력
//   if (!userId.checkValidity()) {
//     loginError.textContent = userId.validationMessage;
//     loginError.style.cssText =
//       "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
//   }

//   if (!userPw.checkValidity()) {
//     loginError.textContent = userPw.validationMessage;
//     loginError.style.cssText =
//       "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
//   }

//   // 폼 내용 제출
//   if (userId.checkValidity() && userPw.checkValidity()) {
//     event.target.submit();
//   }
// });

// const userId = loginForm.querySelector("#id");
// const userPw = loginForm.querySelector("#password");
// const loginError = loginForm.querySelector(".loginerror");

// // input 이벤트로 에러 메시지 초기화
// userId.addEventListener("input", () => {
//   if (loginError.textContent === userId.validationMessage) {
//     loginError.textContent = "";
//   }
//   userId.setCustomValidity("");
// });

// userPw.addEventListener("input", () => {
//   if (loginError.textContent === userPw.validationMessage) {
//     loginError.textContent = "";
//   }
//   userPw.setCustomValidity(""); // 커스텀 메시지 초기화
// });

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
      "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    return;
  }

  if (!userPw.checkValidity()) {
    loginError.textContent = userPw.validationMessage;
    loginError.style.cssText =
      "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    return;
  }

  // 폼 내용 제출
  if (userId.checkValidity() && userPw.checkValidity()) {
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
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공:", data);

        localStorage.setItem("token", data.token);
        // window.location.href = "/index.html";
      } else {
        loginError.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
        loginError.style.cssText =
          "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
      }
    } catch (error) {
      console.error("오류 발생:", error);
      loginError.textContent = "서버에 문제가 발생했습니다. 다시 시도하세요.";
      loginError.style.cssText =
        "color: red; font-size: 16px; margin-bottom:26px; align-self: flex-start";
    }
  }
});

// input 이벤트로 에러 메시지 초기화
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
  userPw.setCustomValidity(""); // 커스텀 메시지 초기화
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

// ------------------------ 회원가입 페이지로 변경------------------------
const joinBtn = document.querySelector(".joinPage");

joinBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <header class="header">
      <h2 class="sr-only">HODU!</h2>
      <a href="/" alt="HODU!"></a>
    </header>
    <ul class="join_tablist">
      <li class="buyer_join btn_on">구매회원가입</li>
      <div class="join_white_box"></div>
      <li class="seller_join btn_off">판매회원가입</li>
    </ul>
    <form action="" class="join_box" method="post">
      <div class="idForm">
        <div class="idAlign">
          <label for="id">아이디</label>
          <input type="text" name="id" id="id" class="join_id" />
        </div>
        <button type="button" class="checkId">중복확인</button>
      </div>
      <span class="idMessage"></span>
      <div class="pwForm">
        <label for="pw">비밀번호</label>
        <input type="password" name="pw" id="pw" class="join_pw" />
        <div class="confirmCircle_pw"></div>
      </div>
      <span class="pwMessage"></span>
      <div class="pwForm">
        <label for="pwConfirm">비밀번호 재확인</label>
        <input type="password" name="pwConfirm" id="pwConfirm" class="join_pwConfirm" />
           <div class="confirmCircle_pwC"></div>
      </div>
          <span class="pwcMessage"></span>
      <div class="nameForm">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="join_name" />

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
          <input type="text" class="numInput" maxlength="4" />
          <input type="text" class="numInput" maxlength="4"/>
        </div>
        <span class="numberMessage"></span>
      </div>
    </form>
    <div class="agreeArea">
      <p class="agreeCheck">
        <input type="checkbox" id="check_agree">호두샵의 <span class="strong">이용약관</span> 및 <span class="strong">개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.
      </p>
      <button type="submit" class="joinBtn" disabled>가입하기 </button>
    </div>
  `;

  const script = document.createElement("script");
  script.src = "./js/join.js";
  document.body.append(script);
});
// ------------------------ 회원가입 페이지로 변경------------------------
