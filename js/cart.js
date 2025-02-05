import { API_BASE_URL } from "./config.js";

window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const userMenuTwo = document.querySelector("#userMenu2");
  const userMenu = document.querySelector(".user_menu");
  const productContainer = document.querySelector(".order_list_container");

  if (!token && userType !== "BUYER") {
    alert("구매자 회원만 이용가능한 페이지 입니다!");
    window.location.href = "./login.html";
  }
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "https://siwoon1602.github.io/OpenMarket_Service/";
  };

  const handleModalToggle = (e) => {
    e.preventDefault();
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
        <p><span id="userinterface_first">마이페이지</span></p>
      </a>
      <div class="header_modal buyer_modal hide">
        <div class="triangle"></div>
        <div class="box">
          <a href="./myPage.html"><button>마이페이지</button></a>
          <button class="logout-btn">로그아웃</button>
        </div>
      </div>
    `;

    const myPageBtn = userMenuTwo.querySelector('a[href="./myPage.html"]');
    if (myPageBtn) {
      myPageBtn.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
    const buyerLogoutBtn = userMenuTwo.querySelector(".logout-btn");
    if (buyerLogoutBtn) {
      buyerLogoutBtn.addEventListener("click", handleLogout);
    }
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
    const newUserMenuTwo = userMenu.querySelector("#userMenu2");
    if (newUserMenuTwo) {
      newUserMenuTwo.addEventListener("click", handleModalToggle);
    }
  }

  document.addEventListener("click", (e) => {
    const headerModal = document.querySelector(".header_modal");
    const userMenuTwo = document.querySelector("#userMenu2");

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

  async function fetchCartItems() {
    try {
      const response = await fetch(`${API_BASE_URL}cart/`, {
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

      if (data.count === 0) {
        productContainer.innerHTML = `
          
          <ul class="no_item">
          <li>장바구니에 담긴 상품이 없습니다.</li>
          <li>원하는 상품을 장바구니에 담아보세요!</li>
          </ul>

    
        `;
        return;
      }

      let totalPrice = 0;
      let totalDiscount = 0;
      let totalShippingFee = 0;

      const productHTML = data.results

        .map((item) => {
          const product = item.product;
          const cartId = item;
          const itemShippingFee = item.product.shipping_fee;
          totalShippingFee += itemShippingFee;

          const itemTotal = product.price * item.quantity;
          totalPrice += itemTotal;

          const shippingMethod =
            item.shipping_method === "PARCEL" ? "택배배송" : "직접배송";

          return `
            <div class="cart_list" data-product-id="${
              cartId.id
            }" data-product-stock="${product.stock}" data-list-id=${product.id}>
              <input type="checkbox" checked />
              <img src="${product.image}" class="image" alt="${product.name}" />
              <ul class="prodcut_info_text">
                <li>${product.info}</li>
                <li>${product.name}</li>
                <li>${product.price.toLocaleString()}원</li>
                <li>${shippingMethod} / 배송비 : ${itemShippingFee}</li>
              </ul>
              <div class="ea_setting">
                <button class="minus"></button>
                <input type="text" value="${
                  item.quantity
                }" class="ea" readonly/>
                <button class="plus"></button>
              </div>
              <div class="order_area">
                <ul>
                  <li>${(product.price * item.quantity).toLocaleString()}원</li>
                  <li><button class="order_btn">주문하기</button></li>
                </ul>
                
              </div>
              <button class="delete_item"><img src="./assets/icon-delete.svg"></button>
            </div>
          `;
        })

        .join("");

      const finalPrice = totalPrice - totalDiscount + totalShippingFee;

      productContainer.innerHTML = `
        
        ${productHTML}
        <section class="total_container">
          <div class="total_area">
            <ul>
              <li>총 상품금액</li>
              <li>${totalPrice.toLocaleString()}<span>원</span></li>
            </ul>
            <div class="minus_circle">
              <img src="./assets/icon-minus-line.svg" alt="마이너스" />
            </div>
            <ul>
              <li>상품 할인</li>
              <li>${totalDiscount.toLocaleString()}<span>원</span></li>
            </ul>
            <div class="plus_circle">
              <img src="./assets/icon-plus-line.svg" alt="플러스" />
            </div>
            <ul>
              <li>배송비</li>
              <li>${totalShippingFee.toLocaleString()}<span>원</span></li>
            </ul>
            <ul>
              <li>결제 예정 금액</li>
              <li><em>${finalPrice.toLocaleString()}</em><span>원</span></li>
            </ul>
          </div>
          <button class="order_all">주문하기</button>
        </section>
      `;

      addQuantityEventListeners();
      addCheckboxEventListeners();
      addSelectAllEventListener();
      addDeleteButtonEventListeners();
      addDeleteAllButtonEventListeners();
    } catch (error) {
      console.error("서버 통신 오류:", error);
      const idError = document.querySelector(".error-message");
      if (idError) {
        idError.textContent = "서버 통신 중 오류가 발생했습니다.";
        idError.style.color = "#EB5757";
      }
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("order_all")) {
      const selectedItems = Array.from(
        document.querySelectorAll(".cart_list")
      ).filter((item) => item.querySelector('input[type="checkbox"]').checked);

      if (selectedItems.length === 0) {
        alert("주문할 상품을 선택해주세요.");
        return;
      }

      const orderData = getOrderData(selectedItems);
      localStorage.setItem("order_kind", "cart_order");
      localStorage.setItem("orderData", JSON.stringify(orderData));
      window.location.href = "./payment.html";
    } else if (e.target.classList.contains("order_btn")) {
      const cartItem = e.target.closest(".cart_list");
      const orderData = getOrderData([cartItem]);
      localStorage.setItem("order_kind", "direct_order");
      localStorage.setItem("orderData", JSON.stringify(orderData));
      window.location.href = "./payment.html";
    }
  });

  function getOrderData(items) {
    let totalPrice = 0;
    let totalShippingFee = 0;

    const orderItems = items.map((item) => {
      const quantity = parseInt(item.querySelector(".ea").value);
      const price = parseInt(
        item
          .querySelector(".prodcut_info_text li:nth-child(3)")
          .textContent.replace(/[^0-9]/g, "")
      );
      const shippingFee = parseInt(
        item
          .querySelector(".prodcut_info_text li:nth-child(4)")
          .textContent.match(/배송비 : (\d+)/)[1]
      );

      totalPrice += price * quantity;
      totalShippingFee += shippingFee;

      return {
        product_id: item.dataset.productId,
        cartId_id: item.dataset.listId,
        product_info: item.querySelector(".prodcut_info_text li:nth-child(1)")
          .textContent,
        product_name: item.querySelector(".prodcut_info_text li:nth-child(2)")
          .textContent,
        price: price,
        quantity: quantity,
        shipping_fee: shippingFee,
        image: item.querySelector(".image").src,
      };
    });

    return {
      items: orderItems,
      total_price: totalPrice,
      total_shipping_fee: totalShippingFee,
      final_price: totalPrice + totalShippingFee,
    };
  }
  function addDeleteAllButtonEventListeners() {
    const deleteAllButton = document.querySelector(".product_delete");

    if (!deleteAllButton) return;

    deleteAllButton.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(`${API_BASE_URL}cart/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("장바구니가 정상적으로 비워졌습니다!");
          window.location.reload();
        } else {
          alert("장바구니 비우기에 실패했습니다.");
          console.error("서버 응답 오류:", response.status);
        }
      } catch (error) {
        alert("서버 통신 중 오류가 발생했습니다.");
        console.error("서버 통신 오류:", error);
      }
    });
  }
  function addDeleteButtonEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete_item");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const cartItem = e.target.closest(".cart_list");
        const productId = cartItem.dataset.productId;
        try {
          const response = await fetch(`${API_BASE_URL}cart/${productId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            cartItem.remove();
            updateTotalPrice();
          } else {
            console.error("Failed to delete item:", response.status);
          }
        } catch (error) {
          console.error("서버 통신 오류:", error);
        }
      });
    });
  }

  async function cartItemUpdatePlus(cartItem, newQuantity) {
    try {
      const productId = cartItem.dataset.productId;
      const response = await fetch(`${API_BASE_URL}cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: newQuantity + 1,
        }),
      });

      if (response.ok) {
        console.log("수량이 성공적으로 수정되었습니다.");
      } else {
        console.error("수량 수정 실패:", response.status);
      }
    } catch (error) {
      console.error("서버 통신 오류:", error);
    }
  }
  async function cartItemUpdateMinus(cartItem, newQuantity) {
    try {
      const productId = cartItem.dataset.productId;
      const response = await fetch(`${API_BASE_URL}cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: newQuantity + -1,
        }),
      });

      if (response.ok) {
        console.log("수량이 성공적으로 수정되었습니다.");
      } else {
        console.error("수량 수정 실패:", response.status);
      }
    } catch (error) {
      console.error("서버 통신 오류:", error);
    }
  }

  function addSelectAllEventListener() {
    const selectAllCheckbox = document.getElementById("selectAll");
    const individualCheckboxes = document.querySelectorAll(
      '.cart_list input[type="checkbox"]'
    );

    selectAllCheckbox.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      updateTotalPrice();
    });
  }

  function addCheckboxEventListeners() {
    const cartItems = document.querySelectorAll(".cart_list");
    const selectAllCheckbox = document.getElementById("selectAll");

    cartItems.forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          const individualCheckboxes = document.querySelectorAll(
            '.cart_list input[type="checkbox"]'
          );
          const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
          );
          selectAllCheckbox.checked = allChecked;
          updateTotalPrice();
        });
      }
    });
  }

  function addQuantityEventListeners() {
    const cartItems = document.querySelectorAll(".cart_list");
    cartItems.forEach((item) => {
      const productStock = item.dataset.productStock;
      const listId = item.dataset.listId;
      const minusBtn = item.querySelector(".minus");
      const plusBtn = item.querySelector(".plus");
      const quantityInput = item.querySelector(".ea");
      const priceText = item.querySelector(
        ".prodcut_info_text li:nth-child(3)"
      ).textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ""));

      minusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
          quantityInput.value = quantity - 1;
          updateItemTotal(item, price, quantity - 1);
          updateTotalPrice();
          cartItemUpdateMinus(item, quantity);
        }
      });

      plusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);

        if (quantity >= productStock) {
          window.alert("재고가 부족합니다 ㅠㅠ");
        } else {
          quantityInput.value = quantity + 1;
          updateItemTotal(item, price, quantity + 1);
          updateTotalPrice();
          cartItemUpdatePlus(item, quantity);
        }
      });
    });
  }
  function updateItemTotal(item, price, quantity) {
    const totalPriceElement = item.querySelector(
      ".order_area ul li:first-child"
    );
    totalPriceElement.textContent = `${(price * quantity).toLocaleString()}원`;
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    let totalShippingFee = 0;
    const cartItems = document.querySelectorAll(".cart_list");

    cartItems.forEach((item) => {
      const checked = item.querySelector('input[type="checkbox"]').checked;
      if (checked) {
        // 상품 가격 계산
        const quantity = parseInt(item.querySelector(".ea").value);
        const priceText = item.querySelector(
          ".prodcut_info_text li:nth-child(3)"
        ).textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ""));
        totalPrice += price * quantity;

        // 배송비 추가
        const shippingFeeText = item.querySelector(
          ".prodcut_info_text li:nth-child(4)"
        ).textContent;
        const shippingFee = parseInt(
          shippingFeeText.match(/배송비 : (\d+)/)[1]
        );
        totalShippingFee += shippingFee;
      }
    });

    const finalPrice = totalPrice + totalShippingFee;

    const totalArea = document.querySelector(".total_area");
    if (totalArea) {
      totalArea.innerHTML = `
            <ul>
                <li>총 상품금액</li>
                <li>${totalPrice.toLocaleString()}<span>원</span></li>
            </ul>
            <div class="minus_circle">
                <img src="./assets/icon-minus-line.svg" alt="마이너스" />
            </div>
            <ul>
                <li>상품 할인</li>
                <li>0<span>원</span></li>
            </ul>
            <div class="plus_circle">
                <img src="./assets/icon-plus-line.svg" alt="플러스" />
            </div>
            <ul>
                <li>배송비</li>
                <li>${totalShippingFee.toLocaleString()}<span>원</span></li>
            </ul>
            <ul>
                <li>결제 예정 금액</li>
                <li><em>${finalPrice.toLocaleString()}</em><span>원</span></li>
            </ul>
        `;
    }
  }
  if (token) {
    fetchCartItems();
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("order_all")) {
      console.log("전체 주문하기 클릭");
    } else if (e.target.classList.contains("order_btn")) {
      console.log("개별 상품 주문하기 클릭");
    }
  });
});
