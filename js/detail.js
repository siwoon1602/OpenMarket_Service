// 토큰을 보유하고 있으면 header의 HTML 요소가 변경되게끔 설정
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

    const userMenuTwoElement = document.querySelector("#userMenu2");
    const headerModal = document.querySelector(".header_modal");
    const modalContent = document.querySelector(".box");

    // header에 마이페이지 click 이벤트
    userMenuTwoElement.addEventListener("click", () => {
      const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
      const userMenuTwoText = document.querySelector("#userinterface_first");

      const userBasicColor = "./assets/icon-user-2.svg";
      const userChangeColor = "./assets/icon-user.svg";

      // 1. 모달창 ON / OFF 기능
      // 2. 마이페이지의 TEXT 색상을 변경
      headerModal.classList.toggle("hide");
      userMenuTwoText.classList.toggle("maincolor");

      // 3. 마이페이지의 ICON 색상을 변경
      if (userMenuTwoIcon.getAttribute("src") === userBasicColor) {
        userMenuTwoIcon.setAttribute("src", userChangeColor);
      } else {
        userMenuTwoIcon.setAttribute("src", userBasicColor);
      }
    });

    // header 모달창 바깥을 클릭했을 때 모달창 닫기
    document.addEventListener("click", (e) => {
      const headerModal = document.querySelector(".header_modal");
      const userMenuTwo = document.querySelector("#userMenu2");

      if (!headerModal.contains(e.target) && !userMenuTwo.contains(e.target)) {
        headerModal.classList.add("hide");

        const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
        const userMenuTwoText = document.querySelector("#userinterface_first");

        userMenuTwoIcon.setAttribute("src", "./assets/icon-user-2.svg");
        userMenuTwoText.classList.remove("maincolor");
      }
    });

    // header 모달창 내부 로그아웃 버튼 click 이벤트 발생시 토큰삭제
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
    }
  }
}

// 화면이 보여질때마다 토큰이 있는지 확인
window.addEventListener("pageshow", updateUserMenuBasedOnToken);

// 구매하기 버튼 click시 로그인 요청 모달 ON / OFF
window.addEventListener("load", function () {
  const modal = document.querySelector(".modal");
  const productArea = document.querySelector(".product");

  // 로그인 요청 모달 바깥 화면 클릭시 모달 OFF
  modal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) modal.close();
  });

  // 로그인 요청 모달 close 버튼 클릭시 모달 OFF
  const closeBtn = document.querySelector(".close_btn");
  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  // 로그인 요청 모달 "아니오" 버튼 클릭시 모달 OFF
  const noBtn = document.querySelector(".no_btn");
  noBtn.addEventListener("click", () => {
    modal.close();
  });

  // 로그인 요청 모달 "예" 버튼 클릭시 모달 OFF 하고 login 페이지로 이동
  const yesBtn = document.querySelector(".yes_btn");
  yesBtn.addEventListener("click", () => {
    modal.close();
    window.location.href = "./login.html";
  });

  const tapOne = document.querySelector(".btn_tap");
  const tapTwo = document.querySelector(".review_tap");
  const tapThree = document.querySelector(".qna_tap");
  const tapFour = document.querySelector(".info_tap");

  // 상세페이지 하단 TAP click이벤트 발생시 색상변환 기능
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

  // 상품 목록 api 호출
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

        const nowSellButton = productArea.querySelector(".now_sell");
        const inCartButton = productArea.querySelector(".in_cart");
        const minusBtn = document.querySelector(".minus");
        const plusBtn = document.querySelector(".plus");
        const eaInput = document.querySelector(".ea");
        const eaSum = document.querySelector(".count");
        const price = document.querySelector(".price");
        const countArea = document.querySelector(".count_area");

        // 재고가 0인경우 구매버튼과 장바구니 버튼을 비활성화
        if (data.stock === 0) {
          eaInput.value = 0;
          plusBtn.setAttribute("disabled", true);
          nowSellButton.style.backgroundColor = "#C4C4C4";
          nowSellButton.setAttribute("disabled", true);
          nowSellButton.textContent = "구매불가";
          inCartButton.style.backgroundColor = "#C4C4C4";
          inCartButton.setAttribute("disabled", true);
          minusBtn.style.backgroundColor = "#C4C4C4";
          plusBtn.style.backgroundColor = "#C4C4C4";
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
          // 구매하기 click 이벤트 발생시 토큰 미보유시 모달창 ON
          if (!token) {
            modal.showModal();
          }
        });

        // 장바구니 click 이벤트 발생시 토큰 미보유시 모달창 ON
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
