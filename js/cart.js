window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const userMenuTwo = document.querySelector("#userMenu2");
  const userMenu = document.querySelector(".user_menu");
  const productContainer = document.querySelector(".order_list_container");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
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
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/cart/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      let shippingFee = 0;

      const productHTML = data.results
        .map((item) => {
          const product = item.product;
          const cartId = item;
          const itemTotal = product.price * item.quantity;
          totalPrice += itemTotal;

          return `
            <div class="cart_list" data-product-id="${
              cartId.id
            }" data-product-stock="${product.stock}">
              <input type="checkbox" checked />
              <img src="${product.image}" class="image" alt="${product.name}" />
              <ul class="prodcut_info_text">
                <li>${product.info}</li>
                <li>${product.name}</li>
                <li>${product.price.toLocaleString()}원</li>
                <li>택배배송 / 무료배송</li>
              </ul>
              <div class="ea_setting">
                <button class="minus"></button>
                <input type="text" value="${item.quantity}" class="ea" />
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

      const finalPrice = totalPrice - totalDiscount + shippingFee;

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
              <li>${shippingFee.toLocaleString()}<span>원</span></li>
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
    } catch (error) {
      console.error("서버 통신 오류:", error);
      const idError = document.querySelector(".error-message");
      if (idError) {
        idError.textContent = "서버 통신 중 오류가 발생했습니다.";
        idError.style.color = "#EB5757";
      }
    }
  }

  function addDeleteButtonEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete_item");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const cartItem = e.target.closest(".cart_list");
        const productId = cartItem.dataset.productId;
        try {
          const response = await fetch(
            `https://estapi.openmarket.weniv.co.kr/cart/${productId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
        }
      });

      plusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);
        console.log(productStock);
        if (quantity >= productStock) {
          window.alert("재고가 부족합니다 ㅠㅠ");
        } else {
          quantityInput.value = quantity + 1;
          updateItemTotal(item, price, quantity + 1);
          updateTotalPrice();
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
    const cartItems = document.querySelectorAll(".cart_list");

    cartItems.forEach((item) => {
      const checked = item.querySelector('input[type="checkbox"]').checked;
      if (checked) {
        const quantity = parseInt(item.querySelector(".ea").value);
        const priceText = item.querySelector(
          ".prodcut_info_text li:nth-child(3)"
        ).textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ""));
        totalPrice += price * quantity;
      }
    });

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
          <li>0<span>원</span></li>
        </ul>
        <ul>
          <li>결제 예정 금액</li>
          <li><em>${totalPrice.toLocaleString()}</em><span>원</span></li>
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
