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

document.addEventListener("DOMContentLoaded", () => {
  const orderData = JSON.parse(localStorage.getItem("orderData"));
  const orderList = document.querySelector(".order_list_container");
  const totlaPirce = document.querySelector(".totla_price");
  const totlaPirceArea = document.querySelector(".final_price");

  if (!orderData) {
    alert("주문 정보가 없습니다.");
    window.location.href = "./cart.html";
    return;
  }

  const totalProductPrice = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalShippingFee = orderData.items[0].shipping_fee;

  const orderItems = orderData.items
    .map((item) => {
      return `
          <div class="cart_list">
              <img class="image" src="${item.image}" alt="${
        item.product_name
      }" />
              <ul class="prodcut_info_text">
                  <li>${item.product_info}</li>
                  <li>${item.product_name}</li>
                  <li>수량: ${item.quantity}개</li>
              </ul>
              <ul class="order_text">
                  <li>-</li>
                  <li>${
                    item.shipping_fee === 0
                      ? "무료배송"
                      : `${item.shipping_fee.toLocaleString()}원`
                  }</li>
                  <li>${(item.price * item.quantity).toLocaleString()}원</li>
              </ul>
          </div>
      `;
    })
    .join("");

  orderList.innerHTML = `
      ${orderItems}
  `;

  totlaPirce.innerHTML = `
    <p class="totla_price">
      총 주문금액 <span>${orderData.final_price.toLocaleString()}원</span>
    </p>
  `;

  totlaPirceArea.innerHTML = ` 
    <ul class="final_price">
      <li>
        <p>- 상품금액</p>
        <p>${totalProductPrice.toLocaleString()}<span>원</span></p>
      </li>
      <li>
        <p>- 할인금액</p>
        <p>0<span>원</span></p>
      </li>
      <li>
        <p>- 배송금액</p>
        <p>${
          totalShippingFee === 0
            ? "무료배송"
            : `${totalShippingFee.toLocaleString()}<span>원</span>`
        }</p>
      </li>
      <li class="final_pay_info_line"></li>
      <li>
        <p>- 결제금액</p>
        <p>${orderData.final_price.toLocaleString()}<span>원</span></p>
      </li>
      <ul class="final_order_area">
        <li>
          <input type="checkbox" class="agree_check" />주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
        </li>
        <li>
          <button class="pay_btn" disabled>결제하기</button>
        </li>
      </ul>
    </ul>`;

  const deliveryInfoArea = document.querySelector(".delivery_info_area");
  const ordererName = deliveryInfoArea.querySelector(".orderer_name_input");
  const ordererPhoneNumFirst = deliveryInfoArea.querySelector(
    "#orderer_firstPhoneNumber"
  );
  const ordererPhoneNumsSecond = deliveryInfoArea.querySelector(
    "#orderer_secondPhoneNumber"
  );
  const ordererPhoneNumThird = deliveryInfoArea.querySelector(
    "#orderer_thirdPhoneNumber"
  );
  const ordererEmail = deliveryInfoArea.querySelector(".orderer_email_input");
  const recipientName = deliveryInfoArea.querySelector(".recipient_name_input");
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
  const recipientAddressSecond = deliveryInfoArea.querySelector(
    ".recipient_address_input_two"
  );
  const recipientAddressThird = deliveryInfoArea.querySelector(
    ".recipient_address_input_three"
  );
  const recipientDeliveryMessage = deliveryInfoArea.querySelector(
    ".recipient_delivery_message_input"
  );
  const paymentMethod = document.querySelectorAll("input[name='pay_method']");

  const orderKind = localStorage.getItem("order_kind");

  function quantitySet() {
    if (orderKind === "cart_order") {
      const productIds = orderData.items.map((item) => item.cartId_id);
      return productIds;
    } else {
      const productId = orderData.items[0].cartId_id;
      return productId;
    }
  }
  function getSelectedPaymentMethod() {
    const selectedRadio = Array.from(paymentMethod).find(
      (radio) => radio.checked
    );

    if (!selectedRadio) {
      return "CARD";
    }

    switch (selectedRadio.id) {
      case "card":
        return "card";
      case "deposit":
        return "deposit";
      case "phone":
        return "phone";
      case "naverpay":
        return "naverpay";
      case "kakaopay":
        return "kakaopay";
      default:
        return "card";
    }
  }

  function joinPostCode() {
    const popup = new daum.Postcode({
      oncomplete: function (data) {
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }

        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        recipientAddressFirst.value = data.zonecode;
        recipientAddressSecond.value = roadAddr;
        recipientAddressThird.value = data.jibunAddress;

        var guideTextBox = document.getElementById("guide");
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
        } else if (data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }
        popup.close();
      },
    }).open();
  }

  document
    .querySelector(".join_address")
    .addEventListener("click", joinPostCode);

  async function sendOrder() {
    try {
      const token = localStorage.getItem("token");
      const paymentMethod = getSelectedPaymentMethod();
      const productId = quantitySet();

      const recipientFullPhoneNum =
        recipientPhoneNumFirst.value +
        recipientPhoneNumsSecond.value +
        recipientPhoneNumThird.value;

      const recipientFullAddress =
        recipientAddressFirst.value +
        +recipientAddressSecond.value +
        +recipientAddressThird.value;

      let requestData = {
        receiver: recipientName.value,
        receiver_phone_number: recipientFullPhoneNum,
        address: recipientFullAddress,
        address_message: recipientDeliveryMessage.value,
        total_price: orderData.final_price,
        payment_method: paymentMethod,
      };

      if (orderKind === "cart_order") {
        requestData = {
          ...requestData,
          order_type: "cart_order",
          cart_items: productId,
        };
      } else {
        requestData = {
          ...requestData,
          order_type: orderKind,
          product: productId,
          quantity: orderData.items[0].quantity,
        };
      }

      const response = await fetch(`${API_BASE_URL}order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`주문 실패: ${response.status}`);
      } else {
        alert("정상적으로 주문되었습니다!");
        localStorage.removeItem("orderData");
        localStorage.removeItem("order_kind");
        window.location.href = "./myPage.html";
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert("주문 전송 중 오류 발생:" + error.message);
      throw error;
    }
  }
  function validateInputs() {
    const InputList = [
      ordererName,
      ordererPhoneNumFirst,
      ordererPhoneNumsSecond,
      ordererPhoneNumThird,
      ordererEmail,
      recipientName,
      recipientPhoneNumFirst,
      recipientPhoneNumsSecond,
      recipientPhoneNumThird,
      recipientAddressFirst,
      recipientAddressSecond,
      recipientAddressThird,
    ];

    const allInputsFilled = InputList.every(
      (input) => input.value.trim() !== ""
    );
    const checkbox = document.querySelector(".agree_check");
    const isChecked = checkbox.checked;
    const isRadioSelected = Array.from(paymentMethod).some(
      (radio) => radio.checked
    );

    return allInputsFilled && isChecked && isRadioSelected;
  }

  function updatePayButtonState() {
    const payButton = document.querySelector(".pay_btn");
    if (payButton) {
      payButton.disabled = !validateInputs();
    }
  }

  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    input.addEventListener("input", updatePayButtonState);
    input.addEventListener("change", updatePayButtonState);
  });

  updatePayButtonState();

  const payButton = document.querySelector(".pay_btn");
  if (payButton) {
    payButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateInputs()) {
        sendOrder();
        window.location.href = "./myPage.html";
      } else {
        alert("주문에 실패했습니다");
      }
    });
  }
});

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ""; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample4_postcode").value = data.zonecode;
      document.getElementById("sample4_roadAddress").value = roadAddr;
      document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if (roadAddr !== "") {
        document.getElementById("sample4_extraAddress").value = extraRoadAddr;
      } else {
        document.getElementById("sample4_extraAddress").value = "";
      }

      var guideTextBox = document.getElementById("guide");
      // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
        guideTextBox.style.display = "block";
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
        guideTextBox.style.display = "block";
      } else {
        guideTextBox.innerHTML = "";
        guideTextBox.style.display = "none";
      }
    },
  }).open();
}
