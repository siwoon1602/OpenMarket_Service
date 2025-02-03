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
function getOrderState(orderState) {
  switch (orderState) {
    case "payment_pending":
      return "결제 대기중";
    case "payment_complete":
      return "결제 완료";
    case "preparing":
      return "배송 준비중";
    case "shipping":
      return "배송중";
    case "delivered":
      return "배송 완료";
    case "cancelled":
      return "주문 취소";
    default:
      return "결제 대기중";
  }
}

window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");

  async function fetchList() {
    try {
      const response = await fetch(`${API_BASE_URL}order/`, {
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
        const container = document.querySelector(".order_container");
        if (container) {
          container.innerHTML = `
            <p>주문 내역이 없습니다.</p>
          `;
        }
        return;
      }

      const productHTML = data.results
        .map((item) => {
          const createdAt = new Date(item.created_at).toLocaleDateString();
          const orderNum = item.order_number;
          const orderStatus = getOrderState(item.order_status);
          const totalPrice = item.total_price;
          const firstProduct = item.order_items[0];

          return `
         <section class="order_list_container">
          <div class="cart_list">
            <div class="image">
              <img src="${firstProduct.product.image}" alt="${
            firstProduct.product.name
          }">
            </div>
            <ul class="prodcut_info_text">
              <li>주문번호: ${orderNum}</li>
              <li>${firstProduct.product.name}</li>
              <li>${createdAt}</li>
            </ul>
            <ul>
              <li class="order_state">${orderStatus}</li>
            </ul>
            <div class="order_area">
              <ul>
                <li>${totalPrice.toLocaleString()}원</li>
                <a href="./orderEdit.html">
                  <li><button class="order_btn" data-order-id="${
                    item.id
                  }">상세보기</button>
                </a></li>
              </ul>
            </div>
          </div>
        </section>
        `;
        })
        .join("");

      const container = document.querySelector("main");
      if (container) {
        container.innerHTML += productHTML;

        const detailButtons = container.querySelectorAll(".order_btn");
        detailButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const orderId = this.getAttribute("data-order-id");
            localStorage.setItem("orderId", orderId);
          });
        });
      }
    } catch (error) {
      console.error("통신오류:", error);
    }
  }

  if (token) {
    fetchList();
  }
});
