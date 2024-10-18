// ------------------------ 회원가입 TAP 시작 ------------------------

const buyerJoin = document.querySelector(".buyer_join");
const sellerJoin = document.querySelector(".seller_join");
const whiteBox = document.querySelector(".join_white_box");
const whiteBoxR = document.querySelector(".join_white_box_R");

buyerJoin.addEventListener("click", () => {
  buyerJoin.classList.add("btn_on");
  buyerJoin.classList.remove("btn_off");
  sellerJoin.classList.add("btn_off");
  whiteBoxR.classList.add("hide");
  whiteBox.classList.remove("hide");
});
sellerJoin.addEventListener("click", () => {
  sellerJoin.classList.add("btn_on");
  sellerJoin.classList.remove("btn_off");
  buyerJoin.classList.add("btn_off");
  whiteBox.classList.add("hide");
  whiteBoxR.classList.remove("hide");
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
      joinId.style.cssText = "border:1px solid #eb5757";
    }
  }
});

// ------------------------ 아이디 중복검사 종료------------------------

// ------------------------ 유효성 검사------------------------

const joinForm = document.querySelector("form");
const joinResult = document.querySelector(".joinBtn");
const checkBox = document.querySelector("#check_agree");

// 초기화 - 가입하기 버튼 비활성화 및 초기 CSS 스타일 설정
joinResult.disabled = true;
joinResult.style.backgroundColor = "#ccc";
joinResult.style.color = "#fff";

//유효성 검사 함수 생성
function validateForm() {
  // 인풋 요소 선택
  const joinId = joinForm.querySelector("#id");
  const joinPw = joinForm.querySelector("#pw");
  const joinPwConfirm = joinForm.querySelector("#pwConfirm");
  const joinName = joinForm.querySelector("#name");
  const firstPhoneNumber = document.getElementById("firstPhoneNumber");
  const secondPhoneNumber = document.getElementById("secondPhoneNumber");
  const thirdPhoneNumber = document.getElementById("thirdPhoneNumber");
  const checkBoxOne = document.querySelector(
    ".confirmCircle_pw, .confirmCircle_pw_on"
  );
  const checkBoxTwo = document.querySelector(
    ".confirmCircle_pwC, .confirmCircle_pwC_on"
  );

  // 에러 메세지 출력 요소 선택
  const idError = joinForm.querySelector(".idMessage");
  const pwError = joinForm.querySelector(".pwMessage");
  const pwConfirmError = joinForm.querySelector(".pwcMessage");
  const nameError = joinForm.querySelector(".nameMessage");
  const numError = joinForm.querySelector(".numberMessage");

  // 초기화
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

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const idPattern = /^[a-zA-Z0-9]{1,20}$/;

  let isValid = true; // 유효성 여부 체크 변수

  // 아이디 유효성 검사
  if (!joinId.value) {
    joinId.setCustomValidity("필수 정보입니다.");
    idError.style.color = "#eb5757";
    isValid = false;
  } else if (!idPattern.test(joinId.value)) {
    joinId.setCustomValidity(
      "20자 이내의 영문 소문자, 대문자, 숫자만 사용가능합니다."
    );
    idError.style.color = "#eb5757";
    joinId.style.cssText = "border:1px solid #eb5757";
    isValid = false;
  }

  // 비밀번호 유효성 검사
  if (!joinPw.value) {
    joinPw.setCustomValidity("필수 정보입니다.");
    pwError.style.color = "#eb5757";
    isValid = false;
    checkBoxOne.classList.replace("confirmCircle_pw_on", "confirmCircle_pw");
  } else if (!passwordPattern.test(joinPw.value)) {
    joinPw.setCustomValidity(
      "8자 이상, 영문 대,소문자, 숫자, 특수문자를 사용하세요."
    );
    pwError.style.color = "#eb5757";
    joinPw.style.cssText = "border:1px solid #eb5757";
    isValid = false;
    checkBoxOne.classList.replace("confirmCircle_pw_on", "confirmCircle_pw");
  }

  if (!joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("필수 정보입니다.");
    pwConfirmError.style.color = "#eb5757";
    isValid = false;
    checkBoxTwo.classList.replace("confirmCircle_pwC_on", "confirmCircle_pwC");
  } else if (joinPw.value !== joinPwConfirm.value) {
    joinPwConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    pwConfirmError.style.color = "#eb5757";
    joinPwConfirm.style.cssText = "border:1px solid #eb5757";
    isValid = false;
    checkBoxOne.classList.replace("confirmCircle_pw_on", "confirmCircle_pw");
    checkBoxTwo.classList.replace("confirmCircle_pwC_on", "confirmCircle_pwC");
  } else if (isValid) {
    checkBoxOne.classList.replace("confirmCircle_pw", "confirmCircle_pw_on");
    checkBoxTwo.classList.replace("confirmCircle_pwC", "confirmCircle_pwC_on");
  }

  // 이름 유효성 검사
  if (!joinName.value) {
    joinName.setCustomValidity("필수 정보입니다.");
    nameError.style.color = "#eb5757";
    isValid = false;
  }

  // 전화번호 유효성 검사
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

  // 체크박스 검증
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

// 포커스 아웃 이벤트를 통해 유효성 검사
joinForm.addEventListener("focusout", validateForm);
checkBox.addEventListener("click", validateForm);

// 제출하기 이벤트리스너
// 제출하기 이벤트리스너
joinResult.addEventListener("click", async (event) => {
  event.preventDefault();

  validateForm();

  if (!joinResult.disabled) {
    const fullPhoneNumber = `${
      document.getElementById("firstPhoneNumber").value
    }${joinForm.querySelector("#secondPhoneNumber").value}${
      joinForm.querySelector("#thirdPhoneNumber").value
    }`;

    // 전화번호 중복 검사
    try {
      const phoneResponse = await fetch(
        "https://estapi.openmarket.weniv.co.kr/accounts/buyer/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: joinForm.querySelector("#id").value,
            password: joinForm.querySelector("#pw").value,
            name: joinForm.querySelector("#name").value,
            phone_number: fullPhoneNumber,
          }),
        }
      );

      if (!phoneResponse.ok) {
        const errorData = await phoneResponse.json();
        const numError = joinForm.querySelector(".numberMessage");
        if (errorData.phone_number && errorData.phone_number != null) {
          numError.textContent = "이미 사용중인 휴대폰 번호입니다.";
          numError.style.color = "#EB5757";
          return;
        } else if (errorData.username && errorData.username != null) {
          const idError = joinForm.querySelector(".idMessage");
          idError.textContent = "이미 사용중인 아이디 입니다.";
          idError.style.color = "#EB5757";
        }
      } else {
        const errorData = await phoneResponse.json();
        numError.textContent = "오류가발생했습니다.";
        numError.style.color = "#EB5757";
        console.log(errorData);
        return;
      }
    } catch (error) {
      console.error("에러:", error);
      return;
    }

    const data = {
      username: joinForm.querySelector("#id").value,
      password: joinForm.querySelector("#pw").value,
      name: joinForm.querySelector("#name").value,
      phone_number: fullPhoneNumber,
      user_type: "BUYER",
    };

    try {
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/accounts/buyer/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("회원가입 성공:", result);

        window.location.href = "./login.html";
      } else {
        const errorData = await response.json();
        console.error("회원가입 중 오류 발생:", errorData);
      }
    } catch (error) {
      console.error("서버와 통신 중 오류 발생:", error);

      window.location.href = "./error.html";
    }
  }
});
