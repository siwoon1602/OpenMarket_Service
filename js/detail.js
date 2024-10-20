// ---------------------------- 토큰 보유시 화면변경 함수 ---------------------------------
function updateUserMenuBasedOnToken() {
  const token = localStorage.getItem("token");
  const userMenuTwo = document.querySelector("#userMenu2");

  if (token && userMenuTwo) {
    userMenuTwo.innerHTML = `
      <a href="#" target="_self">
        <img src="./assets/icon-user.svg" alt="" />
        <span id="userinterface_first">마이페이지</span>
      </a>
      <div class="header_modal hide">
        <div class="triangle"></div>
        <div class="box">
          <button>마이페이지</button>
          <button id="logout">로그아웃</button>
        </div>
      </div>`;

    // ---------------------------- 마이페이지 클릭시 모달창 ON/OFF + 아이콘,색상변환  ---------------------------------
    const userMenuTwoElement = document.querySelector("#userMenu2");
    userMenuTwoElement.addEventListener("click", () => {
      const headerModal = document.querySelector(".header_modal");
      const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
      const userMenuTwoText = document.querySelector("#userinterface_first");

      const userBasicColor = "./assets/icon-user-2.svg";
      const userChangeColor = "./assets/icon-user.svg";

      headerModal.classList.toggle("hide");
      userMenuTwoText.classList.toggle("maincolor");

      if (userMenuTwoIcon.getAttribute("src") === userBasicColor) {
        userMenuTwoIcon.setAttribute("src", userChangeColor);
      } else {
        userMenuTwoIcon.setAttribute("src", userBasicColor);
      }
    });

    const userMenuOneElement = document.querySelector("#userMenu1");
    userMenuOneElement.addEventListener("click", () => {
      const userMenuOneIcon = document.querySelector("#userMenu1 a img");
      const userMenuOneText = document.querySelector("#userinterface_second");

      const cartBasicColor = "./assets/icon-shopping-cart-2.svg";
      const cartChangeColor = "./assets/icon-shopping-cart.svg";

      userMenuOneText.classList.toggle("maincolor");

      if (userMenuOneElement.getAttribute("src") === userBasicColor) {
        userMenuOneIcon.setAttribute("src", cartChangeColor);
      } else {
        userMenuOneIcon.setAttribute("src", cartBasicColor);
      }
    });

    // ---------------------------- 마이페이지 클릭시 모달창 로그아웃 기능  ---------------------------------
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
    }
  }
}
// ---------------------------- 마이페이지 클릭시 모달창 로그아웃 종료  ---------------------------------

// 화면이 보여질때마다 토큰이 있는지 확인
window.addEventListener("pageshow", updateUserMenuBasedOnToken);

// ---------------------------- 구매하기 버튼 클릭시 모달창 ON/OFF --------------------------------------------
window.addEventListener("load", function () {
  const modal = document.querySelector(".modal");

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
    window.location.href = "./login.html";
  });

  // ---------------------------- 상세페이지 하단 TAP 클릭시 색 전환 ---------------------------------------------

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

  //--------------------------- 상품별 상세페이지 호출-------------------------------------

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    document.querySelector(".product_area").innerHTML =
      "상품 ID가 유효하지 않습니다.";
    return;
  }

  // 상품 상세정보를 불러와 페이지에 뿌립니다.
  fetch(`https://estapi.openmarket.weniv.co.kr/products/${productId}/`)
    .then((response) => response.json())
    .then((data) => {
      // 배송유형에 따라서 다르게 표시

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
              <li>${data.price.toLocaleString()}</li>
            </ul>
            <ul>
              <li class="shipping_area">
                <span class="shipping_method">${shippingMethod}</span>
                <span class="shipping_fee">${data.shipping_fee.toLocaleString()}원</span>
                <span class="shipping_fee">현재 재고수량 : ${data.stock}</span>
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
                  <strong class="price">${data.price.toLocaleString()}</strong>
               </div>
              </li>
              <li class="button_area">
                <button type="button" class="now_sell">바로 구매</button>
                <button type="button" class="in_cart">장바구니</button>
              </li>
            </ul>
          </div>
        `;
        //--------------------------- 상품별 상세페이지 호출 종료-------------------------------------

        //--------------------------- 상품 상세정보 유저 인터페이스 시작 -------------------------------------

        const nowSellButton = productArea.querySelector(".now_sell");
        const inCartButton = productArea.querySelector(".in_cart");
        const minusBtn = document.querySelector(".minus");
        const plusBtn = document.querySelector(".plus");
        const eaInput = document.querySelector(".ea");
        const eaSum = document.querySelector(".count");
        const price = document.querySelector(".price");
        const countArea = document.querySelector(".count_area");

        // 재고가 0인경우 구매버튼과 장바구니 버튼을 비활성화하는 코드
        if (data.stock === 0) {
          eaInput.value = 0;
          plusBtn.setAttribute("disabled", true);
          nowSellButton.style.backgroundColor = "gray";
          nowSellButton.setAttribute("disabled", true);
          nowSellButton.textContent = "구매불가";
          inCartButton.style.backgroundColor = "gray";
          inCartButton.setAttribute("disabled", true);
        } else {
          // 수량 조절 기능 플러스 부분
          plusBtn.addEventListener("click", () => {
            eaInput.value = parseInt(eaInput.value) + 1;
            eaSum.textContent = eaInput.value;

            let totalPrice = parseInt(eaInput.value) * data.price;
            price.textContent = totalPrice.toLocaleString();

            if (parseInt(eaInput.value) >= data.stock) {
              plusBtn.setAttribute("disabled", true);
            }
          });
          // 수량 조절 기능 마이너스 부분
          minusBtn.addEventListener("click", () => {
            if (eaInput.value > 1) eaInput.value = parseInt(eaInput.value) - 1;
            eaSum.textContent = eaInput.value;

            let totalPrice = parseInt(eaInput.value) * data.price;
            price.textContent = totalPrice.toLocaleString();

            if (parseInt(eaInput.value) < data.stock) {
              plusBtn.removeAttribute("disabled");
            }
          });
          // 재고가 1개인 경우를 대비해서 마우스 오버로확인하여 비활성화처리
          countArea.addEventListener("mouseover", () => {
            if (parseInt(eaInput.value) >= data.stock) {
              plusBtn.setAttribute("disabled", true);
            } else if (parseInt(eaInput.value) < data.stock) {
              plusBtn.removeAttribute("disabled");
            }
          });
        }

        // 구매버튼 클릭시 발생하는 모달 이벤트

        nowSellButton.addEventListener("click", () => {
          const token = localStorage.getItem("token");
          if (!token) {
            modal.showModal();
          }
        });

        inCartButton.addEventListener("click", () => {
          const token = localStorage.getItem("token");
          if (!token) {
            modal.showModal();
          }
        });
      }
    })
    .catch((error) => {
      productArea.innerHTML = "상품을 불러오는 데 실패했습니다.";
      console.error("Error fetching product data:", error);
    });
});
//--------------------------- 상품 상세정보 유저 인터페이스 종료 -------------------------------------
