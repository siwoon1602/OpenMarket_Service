import { API_BASE_URL } from "./config.js";
window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const userMenuTwo = document.querySelector("#userMenu2");
  const userMenu = document.querySelector(".user_menu");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "https://siwoon1602.github.io/OpenMarket_Service/";
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
                  <a href="./myPage.html" class="mypage-link">
                    <button type="button">마이페이지</button>
                  </a>
                  <button class="logout-btn">로그아웃</button>
              </div>
          </div>
      `;

    const myPageBtn = userMenuTwo.querySelector(".mypage-link");
    if (myPageBtn) {
      myPageBtn.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

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
});

window.addEventListener("pageshow", async () => {
  const token = localStorage.getItem("token");

  async function fetchOrderDetail() {
    const orderId = localStorage.getItem("orderId");
    if (!orderId || !token) return;

    try {
      const response = await fetch(`${API_BASE_URL}order/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("서버 응답에 문제가 있습니다.");
      }

      const data = await response.json();

      const container = document.querySelector(".order_list_container");
      if (container) {
        const productHTML =
          data.order_items
            .map((item) => {
              const shippingFee = item.ordered_shipping_fee.toLocaleString();
              const unitPrice = item.ordered_unit_price.toLocaleString();

              return `
              <div class="cart_list">
          <div class="image"><img src="${item.product.image}"></div>
          <ul class="prodcut_info_text">
            <li>${item.product.info}</li>
            <li>${item.product.name}</li>
            <li>수량: ${item.ordered_quantity} 개</li>
          </ul>
          <ul class="order_text">
            <li>-</li>
            <li>${shippingFee} 원</li>
            <li>${unitPrice} 원</li>
          </ul>
        </div>
            `;
            })
            .join("") +
          `<p class="totla_price">총 주문금액 <span>${data.total_price.toLocaleString()}원</span></p>`;
        container.innerHTML = productHTML;
      }
      const deliveryInfoArea = document.querySelector(".delivery_info_area");

      const recipientName = deliveryInfoArea.querySelector(
        ".recipient_name_input"
      );
      const recipientPhoneNumFirst = deliveryInfoArea.querySelector(
        "#recipient_firstPhoneNumber"
      );
      const recipientPhoneNumsSecond = deliveryInfoArea.querySelector(
        "#recipient_secondPhoneNumber"
      );
      const recipientPhoneNumThird = deliveryInfoArea.querySelector(
        "#recipient_thirdPhoneNumber"
      );
      const recipientAddressFirst = deliveryInfoArea.querySelector(
        ".recipient_address_input_one"
      );
      const recipientDeliveryMessage = deliveryInfoArea.querySelector(
        ".recipient_delivery_message_input"
      );
      const priceElement = document.querySelector(".price");
      const shippingFeeElement = document.querySelector(".shipping_fee");
      const totalPriceElement = document.querySelector(
        ".final_price li:last-child .totla_price"
      );
      const checkBoxes = document.querySelectorAll(".pay_method_list input");

      if (priceElement && shippingFeeElement && totalPriceElement) {
        const totalShippingFee = data.order_items.reduce((sum, item) => {
          return sum + item.ordered_shipping_fee;
        }, 0);

        const totalProductPrice = data.total_price - totalShippingFee;

        priceElement.innerHTML = `${totalProductPrice.toLocaleString()}<span>원</span>`;
        shippingFeeElement.innerHTML = `${totalShippingFee.toLocaleString()}<span>원</span>`;
        totalPriceElement.textContent = `${data.total_price.toLocaleString()}원`;
      }
      checkBoxes.forEach((checkbox) => {
        if (
          checkbox.value === data.payment_method ||
          checkbox.id === data.payment_method
        ) {
          checkbox.checked = true;
        }
      });
      recipientName.value = data.receiver;
      recipientAddressFirst.value = data.address;
      recipientDeliveryMessage.value = data.delivery_message;
      recipientPhoneNumFirst.value = data.receiver_phone_number.slice(0, 3);
      recipientPhoneNumsSecond.value = data.receiver_phone_number.slice(3, 7);
      recipientPhoneNumThird.value = data.receiver_phone_number.slice(7);
    } catch (error) {
      console.error("통신오류:", error);
    }
  }
  const canceldBtn = document.querySelector(".cancled_btn");
  if (canceldBtn) {
    canceldBtn.addEventListener("click", async () => {
      const orderId = localStorage.getItem("orderId");
      try {
        const response = await fetch(
          `https://estapi.openmarket.weniv.co.kr/order/${orderId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("서버 응답에 문제가 있습니다.");
        }
        alert("주문이 정상적으로 취소되었습니다!");
        localStorage.removeItem("orderId");
        window.location.href = "./myPage.html";
      } catch (error) {
        console.error("통신오류:", error);

        alert("주문취소에 실패하였습니다");
      }
    });
  }

  if (token) {
    fetchOrderDetail();
  }
});
