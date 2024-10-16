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

const closeBtn = document.querySelector(".close_btn");
closeBtn.addEventListener("click", () => {
  console.log("닫혀라!");
  modal.close();
});
