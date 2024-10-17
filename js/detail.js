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

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    document.querySelector(".product_area").innerHTML =
      "상품 ID가 유효하지 않습니다.";
    return;
  }

  fetch(`https://estapi.openmarket.weniv.co.kr/products/${productId}/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(typeof productId);
      console.log(typeof data.id);
      const productArea = document.querySelector(".product");
      if (data.id == productId) {
        productArea.innerHTML = `    <section class="product">
      <h2 class="sr-only">상품 상세정보</h2>
      <div class="img_area">
        <img src="${data.image}" alt="" class="thumbnail">
      </div>
      <div class="info_area">
        <ul class="product_info">
          <li>${data.seller.store_name}</li>
          <li>${data.name}</li>
          <li>${data.price}</li>
        </ul>
        <ul>
          <li class="shipping_area">
            <span class="shipping_method">${data.shipping_method}</span>
            <span class="shipping_fee">${data.shipping_fee}원</span>
          </li>
          <li class="count_area">
            <button class="minus"></button>
            <input type="text" value="1" class="ea">
            <button class="plus"></button>
          </li>
          <li class="price_area">
            <span>총 상품 금액</span>
            <em class="count">1</em>
            <strong class="price">${data.price}</strong>
          </li>
          <li class="button_area">
            <button type="button" class="now_sell">바로 구매</button>
            <button type="button" class="in_cart">장바구니</button>

          </li>
          </ul>
      </div>
    </section>`;
      } else {
        document.querySelector(
          ".product"
        ).innerHTML = `상품정보를 모르겠습니다!`;
      }

      if (data.shipping_method == "PARCEL") {
        data.shipping_method = "무료배송";
      }
    })
    .catch((error) => {
      console.error("에러발생!!!!!!", error);
      document.querySelector(".product").innerHTML =
        "상품 정보를 찾을 수 없습니다.";
    });
});
