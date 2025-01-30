// 토큰을 보유하고 있으면 header의 HTML 요소가 변경되게끔 설정
function updateUserMenuBasedOnToken() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const userMenuTwo = document.querySelector("#userMenu2");
  const userMenu = document.querySelector(".user_menu");

  console.log("현재 상태:", { token, userType });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  const handleModalToggle = (e) => {
    e.preventDefault(); // 링크 기본 동작 방지
    const headerModal = document.querySelector(".header_modal");
    const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
    const userMenuOneText = document.querySelector("#userinterface_first");
    const userBasicColor = "./assets/icon-user.svg";
    const userChangeColor = "./assets/icon-user-2.svg";

    if (!token || !headerModal) return;

    headerModal.classList.toggle("hide");
    if (userMenuOneText) {
      userMenuOneText.classList.toggle("maincolor");
    }

    if (userMenuTwoIcon) {
      userMenuTwoIcon.setAttribute(
        "src",
        userMenuTwoIcon.getAttribute("src") === userBasicColor
          ? userChangeColor
          : userBasicColor
      );
    }
  };

  if (token && userType === "BUYER") {
    userMenuTwo.innerHTML = `
          <a href="#" target="_self">
              <img src="./assets/icon-user.svg" alt="" />
              <span id="userinterface_first">마이페이지</span>
          </a>
          <div class="header_modal buyer_modal hide">
              <div class="triangle"></div>
              <div class="box">
                  <button>마이페이지</button>
                  <button class="logout-btn">로그아웃</button>
              </div>
          </div>
      `;

    const buyerLogoutBtn = userMenuTwo.querySelector(".logout-btn");
    if (buyerLogoutBtn) {
      buyerLogoutBtn.addEventListener("click", handleLogout);
    }
    // 구매자용 모달 토글 이벤트 추가
    userMenuTwo.addEventListener("click", handleModalToggle);
  } else if (token && userType === "SELLER") {
    userMenu.innerHTML = `
        <li id="userMenu2">
            <a href="#" target="_self">
                <img src="./assets/icon-user.svg" alt="" />
                <span id="userinterface_first">마이페이지</span>
            </a>
            <div class="header_modal seller_modal hide">
                <div class="triangle"></div>
                <div class="box">
                    <button class="logout-btn">로그아웃</button>
                </div>
            </div>
        </li>
        <li id="userMenu1">
            <a href="./sellerCenter.html">
                <button class="sellerCenter-btn"> 
                    <img src="./assets/icon-shopping-bag.png" alt="" id="sellerCenter-icon">판매자 센터
                </button>
            </a>
        </li>
    `;

    const sellerLogoutBtn = userMenu.querySelector(".logout-btn");
    if (sellerLogoutBtn) {
      sellerLogoutBtn.addEventListener("click", handleLogout);
    }
    // 판매자용 모달 토글 이벤트 추가
    const newUserMenuTwo = userMenu.querySelector("#userMenu2");
    if (newUserMenuTwo) {
      newUserMenuTwo.addEventListener("click", handleModalToggle);
    }
  }

  // 모달창 외부 클릭시 닫기 이벤트
  document.addEventListener("click", (e) => {
    const headerModal = document.querySelector(".header_modal");
    const userMenuTwo = document.querySelector("#userMenu2");
    const token = localStorage.getItem("token");

    if (
      token &&
      headerModal &&
      !headerModal.contains(e.target) &&
      !userMenuTwo.contains(e.target)
    ) {
      headerModal.classList.add("hide");

      const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
      const userMenuOneText = document.querySelector("#userinterface_first");

      if (userMenuTwoIcon) {
        userMenuTwoIcon.setAttribute("src", "./assets/icon-user.svg");
      }
      if (userMenuOneText) {
        userMenuOneText.classList.remove("maincolor");
      }
    }
  });
}

// 화면이 보여질때마다 토큰이 있는지 확인
window.addEventListener("pageshow", updateUserMenuBasedOnToken);

// 구매하기 버튼 click시 로그인 요청 모달 ON / OFF
window.addEventListener("load", function () {
  const modal = document.querySelector(".modal");
  const productArea = document.querySelector(".product");

  // 모달 요소가 존재하는 경우에만 이벤트 리스너 추가
  if (modal) {
    // 로그인 요청 모달 바깥 화면 클릭시 모달 OFF
    modal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) modal.close();
    });

    // 로그인 요청 모달 close 버튼 클릭시 모달 OFF
    const closeBtn = document.querySelector(".close_btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.close();
      });
    }

    // 로그인 요청 모달 "아니오" 버튼 클릭시 모달 OFF
    const noBtn = document.querySelector(".no_btn");
    if (noBtn) {
      noBtn.addEventListener("click", () => {
        modal.close();
      });
    }

    // 로그인 요청 모달 "예" 버튼 클릭시 모달 OFF 하고 login 페이지로 이동
    const yesBtn = document.querySelector(".yes_btn");
    if (yesBtn) {
      yesBtn.addEventListener("click", () => {
        modal.close();
        window.location.href = "./login.html";
      });
    }
  }

  const tapOne = document.querySelector(".btn_tap");
  const tapTwo = document.querySelector(".review_tap");
  const tapThree = document.querySelector(".qna_tap");
  const tapFour = document.querySelector(".info_tap");

  // 상세페이지 하단 TAP click이벤트 발생시 색상변환 기능
  if (tapOne && tapTwo && tapThree && tapFour) {
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
  }

  // 상품 목록 api 호출
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    if (document.querySelector(".product_area")) {
      document.querySelector(".product_area").innerHTML =
        "상품 ID가 유효하지 않습니다.";
    }
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

      if (data.id == productId && productArea) {
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
                <input type="text" value="1" class="ea" disabled>
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

        if (
          nowSellButton &&
          inCartButton &&
          minusBtn &&
          plusBtn &&
          eaInput &&
          eaSum &&
          price &&
          countArea
        ) {
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
              if (eaInput.value > 1)
                eaInput.value = parseInt(eaInput.value) - 1;
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
          if (modal) {
            nowSellButton.addEventListener("click", () => {
              const token = localStorage.getItem("token");
              // 구매하기 click 이벤트 발생시 토큰 미보유시 모달창 ON
              if (!token) {
                modal.showModal();
              }
            });

            // 장바구니 click 이벤트 발생시 토큰 미보유시 모달창 ON
            inCartButton.addEventListener("click", (event) => {
              const token = localStorage.getItem("token");

              if (!token) {
                modal.showModal();
              } else {
                handleInCart(event);
              }
            });
          }
        }
      }
    })
    .catch((error) => {
      if (productArea) {
        productArea.innerHTML = "상품을 불러오는 데 실패했습니다.";
      }
      console.error("Error fetching product data:", error);
    });
});

async function handleInCart(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const quantityEa = document.querySelector(".ea");

  const inCartModal = document.createElement("article");
  inCartModal.className = "inCart_modal hide";
  inCartModal.innerHTML = `
    <p>장바구니에 상품이 담겼습니다!</p>
    <div class="cartModal_btn_align">
      <a href="./cart.html">
        <button class="move_inCart">장바구니로 이동</button>
      </a>
      <button class="close_Cartmodal">닫기</button>
    </div>
  `;

  document.body.appendChild(inCartModal);

  const closeButton = inCartModal.querySelector(".close_Cartmodal");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(inCartModal);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  try {
    const response = await fetch(
      "https://estapi.openmarket.weniv.co.kr/cart/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantityEa.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.message) {
        inCartModal.classList.remove("hide");
      }
    }
  } catch (error) {
    console.error("서버 통신 오류:", error);
  }
}

window.addEventListener("load", function () {
  const token = localStorage.getItem("token");
  const modal = document.querySelector(".modal");
  const cartBtn = document.querySelector("#userMenu1");

  if (!token && cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.showModal();
      } else if (token) {
        window.location.href = "./cart.html";
      }
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) modal.close();
    });
  }

  const closeBtn = document.querySelector(".close_btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.close();
    });
  }

  const yesBtn = document.querySelector(".yes_btn");
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      window.location.href = "./login.html";
    });
  }
  const noBtn = document.querySelector(".no_btn");
  if (noBtn) {
    noBtn.addEventListener("click", () => {
      modal.close();
    });
  }
});
