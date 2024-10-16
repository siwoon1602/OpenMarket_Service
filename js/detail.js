// ---------------------------- 모달창 구현---------------------------------------------

//토큰을 보유하지않고 구매버튼을 누르면 모달창 보여줌
const modal = document.querySelector(".modal");
const sellBtn = document
  .querySelector(".now_sell")
  .addEventListener("click", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      modal.showModal();
    }
  });

//모달창 바깥을 클릭하면 모달창이 닫히게함
modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) modal.close();
});

// 클로즈 버튼을 누르면 모달창이 닫힘
const closeBtn = document.querySelector(".close_btn");
closeBtn.addEventListener("click", () => {
  modal.close();
});
//아니오버튼을 눌러도 모달창이 닫힘
const noBtn = document.querySelector(".no_btn");
noBtn.addEventListener("click", () => {
  modal.close();
});
//예 버튼을 누르면 모달창을 닫고 로그인 페이지로 이동합니다.
const yesBtn = document.querySelector(".yes_btn");
yesBtn.addEventListener("click", () => {
  modal.close();
  window.location.href = "/login.html";
});
// ---------------------------- 모달창 구현 종료---------------------------------------------

// ---------------------------- 상세페이지 TAP---------------------------------------------

const tapOne = document.querySelector(".btn_tap");
const tapTwo = document.querySelector(".review_tap");
const tapThree = document.querySelector(".qna_tap");
const tapFour = document.querySelector(".info_tap");

tapOne.addEventListener("click", () => {
  tapOne.classList.replace("btn_off", "btn_on");
  tapTwo.classList.replace("btn_on", "btn_off");
  tapThree.classList.replace("btn_on", "btn_off");
  tapFour.classList.replace("btn_on", "btn_off");
});
tapTwo.addEventListener("click", () => {
  tapTwo.classList.replace("btn_off", "btn_on");
  tapOne.classList.replace("btn_on", "btn_off");
  tapThree.classList.replace("btn_on", "btn_off");
  tapFour.classList.replace("btn_on", "btn_off");
});
tapThree.addEventListener("click", () => {
  tapThree.classList.replace("btn_off", "btn_on");
  tapOne.classList.replace("btn_on", "btn_off");
  tapTwo.classList.replace("btn_on", "btn_off");
  tapFour.classList.replace("btn_on", "btn_off");
});
tapFour.addEventListener("click", () => {
  tapFour.classList.replace("btn_off", "btn_on");
  tapOne.classList.replace("btn_on", "btn_off");
  tapTwo.classList.replace("btn_on", "btn_off");
  tapThree.classList.replace("btn_on", "btn_off");
});
// ---------------------------- 상세페이지 TAP 종료---------------------------------------------
