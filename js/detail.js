// ---------------------------- 모달창 구현---------------------------------------------
// DOMContentLoaded를 사용하여 모든 요소가 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");

  // 제품 정보를 표시할 제품 영역
  const productArea = document.querySelector(".product");

  // 모달창 바깥을 클릭하면 모달창이 닫히게 함
  modal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) modal.close();
  });

  // 클로즈 버튼을 누르면 모달창이 닫힘
  const closeBtn = document.querySelector(".close_btn");
  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  // 아니오 버튼을 눌러도 모달창이 닫힘
  const noBtn = document.querySelector(".no_btn");
  noBtn.addEventListener("click", () => {
    modal.close();
  });

  // 예 버튼을 누르면 모달창을 닫고 로그인 페이지로 이동
  const yesBtn = document.querySelector(".yes_btn");
  yesBtn.addEventListener("click", () => {
    modal.close();
    window.location.href = "/login.html";
  });

  // ---------------------------- 상세페이지 기능 TAP---------------------------------------------

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

  // ---------------------------- 상세페이지 TAP 기능 종료---------------------------------------------

  //--------------------------- 상품 상세페이지 호출-------------------------------------
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
      let shippingMethod = data.shipping_method;
      if (shippingMethod === "PARCEL") {
        shippingMethod = "택배배송";
      } else {
        shippingMethod = "직접배송";
      }
      if (data.id == productId) {
        productArea.innerHTML = ` 
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
                <span class="shipping_method">${shippingMethod}</span>
                <span class="shipping_fee">${data.shipping_fee}원</span>
              </li>
              <li class="count_area">
                <button class="minus"></button>
                <input type="text" value="1" class="ea">
                <button class="plus"></button>
              </li>
              <li class="price_area">
                <span>총 상품 금액</span>
               <div>
                  <em class="count">1</em>
                  <strong class="price">${data.price}</strong>
               </div>
              </li>
              <li class="button_area">
                <button type="button" class="now_sell">바로 구매</button>
                <button type="button" class="in_cart">장바구니</button>
              </li>
            </ul>
          </div>
        `;

        //--------------------------- 상품 상세페이지 호출 종료-------------------------------------

        //--------------------------- 사용자 인터페이스 조작 기능 시작-------------------------------------
        const nowSellButton = productArea.querySelector(".now_sell");
        nowSellButton.addEventListener("click", () => {
          const token = localStorage.getItem("token");
          if (!token) {
            modal.showModal();
          }
        });
        const minusBtn = document.querySelector(".minus");
        const plusBtn = document.querySelector(".plus");
        const eaInput = document.querySelector(".ea");
        const eaSum = document.querySelector(".count");
        const price = document.querySelector(".price");
        const countArea = document.querySelector(".count_area");

        plusBtn.addEventListener("click", () => {
          eaInput.value = parseInt(eaInput.value) + 1;
          eaSum.textContent = eaInput.value;
          price.textContent = parseInt(eaInput.value) * data.price;

          if (parseInt(eaInput.value) >= data.stock) {
            plusBtn.setAttribute("disabled", true);
          }
        });
        minusBtn.addEventListener("click", () => {
          if (eaInput.value > 1) eaInput.value = parseInt(eaInput.value) - 1;
          eaSum.textContent = eaInput.value;
          price.textContent = parseInt(eaInput.value) * data.price;

          if (parseInt(eaInput.value) < data.stock) {
            plusBtn.removeAttribute("disabled");
          }
        });

        countArea.addEventListener("mouseover", () => {
          if (parseInt(eaInput.value) >= data.stock) {
            plusBtn.setAttribute("disabled", true);
          } else if (parseInt(eaInput.value) < data.stock) {
            plusBtn.removeAttribute("disabled");
          }
        });
      } else {
        productArea.innerHTML = `상품정보를 모르겠습니다!`;
      }
    })

    .catch((error) => {
      productArea.innerHTML = "에러!!!";
    });
});
//--------------------------- 사용자 인터페이스 조작 기능 시작-------------------------------------
