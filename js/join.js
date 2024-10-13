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

document.getElementById("check_agree").addEventListener("change", () => {
  const checkBox = document.querySelector("#check_agree");
  const joinResult = document.querySelector(".joinBtn");
  if (checkBox.checked) {
    // 체크박스가 체크되면 버튼의 disabled 속성 제거
    joinResult.removeAttribute("disabled");
    joinResult.style.cssText =
      " margin-top: 34px;  background-color: var(--maincolor);color: white; padding: 19px 207px;border-radius: 10px;";
  } else {
    // 체크박스가 체크 해제되면 버튼을 다시 disabled 상태로 설정
    joinResult.setAttribute("disabled", true);
    joinResult.style.cssText =
      " margin-top: 34px;background-color: #c4c4c4;color: white;padding: 19px 207px;border-radius: 10px;";
  }
});

// ------------------------ 가입하기 버튼 종료------------------------
