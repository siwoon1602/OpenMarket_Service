// ------------------------ 토큰 보유 시 화면 변경 ----------------------------
window.addEventListener("pageshow", (e) => {
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

  if (token && userType === "BUYER") {
    userMenuTwo.innerHTML = `
          <a href="#" target="_self">
              <img src="./assets/icon-user.svg" alt="" />
              <span id="userinterface_first">마이페이지</span>
          </a>
          <div class="header_modal hide">
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
  } else if (token && userType === "SELLER") {
    userMenu.innerHTML = `
        
        <li id="userMenu2">
            <a href="#" target="_self">
                <img src="./assets/icon-user.svg" alt="" />
                <span id="userinterface_first">마이페이지</span>
            </a>
            <div class="header_modal hide">
                <div class="triangle"></div>
                <div class="box">
                    <button onclick="location.href='./sellerCenter.html'">판매자 센터</button>
                    <button class="logout-btn">로그아웃</button>
                </div>
            </div>
        </li>
        <li id="userMenu1">
            <a href="./sellerCenter.html">
                <button class="sellerCenter-btn">판매자 센터</button>
            </a>
        </li>
    `;

    const sellerLogoutBtn = userMenu.querySelector(".logout-btn");
    if (sellerLogoutBtn) {
      sellerLogoutBtn.addEventListener("click", handleLogout);
    }
  }
});

// ---------------------------- 마이페이지 클릭시 모달창 ON/OFF + 아이콘,색상변환  ---------------------------------
const handleModalToggle = () => {
  const headerModal = document.querySelector(".header_modal");
  const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
  const userMenuOneText = document.querySelector("#userinterface_first");
  const token = localStorage.getItem("token");
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

document.addEventListener("DOMContentLoaded", () => {
  const userMenuTwo = document.querySelector("#userMenu2");
  if (userMenuTwo) {
    userMenuTwo.addEventListener("click", handleModalToggle);
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
// ---------------------------- 마이페이지 클릭시 모달창 로그아웃 종료  ---------------------------------

// ---------------------------- 마이페이지 클릭시 모달창 ON/OFF + 아이콘,색상변환  ---------------------------------

document.querySelector("#userMenu2").addEventListener("click", () => {
  const headerModal = document.querySelector(".header_modal");
  const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
  const userMenuOneText = document.querySelector("#userinterface_first");
  const token = localStorage.getItem("token");
  const userBasicColor = "./assets/icon-user.svg";
  const userChangeColor = "./assets/icon-user-2.svg";

  if (token) {
    headerModal.classList.toggle("hide");
    if (userMenuOneText) {
      userMenuOneText.classList.toggle("maincolor");
    }
  }

  if (token && userMenuTwoIcon.getAttribute("src") === userBasicColor) {
    userMenuTwoIcon.setAttribute("src", userChangeColor);
  } else {
    userMenuTwoIcon.setAttribute("src", userBasicColor);
  }
});

// 모달창 외부 클릭시 닫기 이벤트
document.addEventListener("click", (e) => {
  const headerModal = document.querySelector(".header_modal");
  const userMenuTwo = document.querySelector("#userMenu2");
  const token = localStorage.getItem("token");

  if (
    token &&
    !headerModal.contains(e.target) &&
    !userMenuTwo.contains(e.target)
  ) {
    headerModal.classList.add("hide");

    const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
    const userMenuOneText = document.querySelector("#userinterface_first");

    userMenuTwoIcon.setAttribute("src", "./assets/icon-user.svg");
    if (userMenuOneText) {
      userMenuOneText.classList.remove("maincolor");
    }
  }
});

// ---------------------------- 마이페이지 클릭시 모달창 ON/OFF + 아이콘,색상변환 종료 ---------------------------------

//--------------------------- 상품 정보 요청하여 상품 리스트 화면 구성 ------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://estapi.openmarket.weniv.co.kr/products/")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.querySelector(
        ".product-list-container"
      );
      let productHTML = "";

      data.results.forEach((product, index) => {
        if (index < 6) {
          productHTML += `
                      <li class="product_list">
                          <a href="details.html?id=${product.id}">
                              <article>
                                  <img src="${
                                    product.image
                                  }" alt="product_${index}" class="item_image">
                                  <ul class="product_info">
                                      <li class="item_seller">${
                                        product.seller.store_name
                                      }</li>
                                      <li class="item_name">${product.name}</li>
                                      <li class="item_price">${product.price.toLocaleString()}<span>원</span></li>
                                  </ul>
                              </article>
                          </a>
                      </li>
                  `;
        }
      });

      productContainer.innerHTML = productHTML;
    })

    //--------------------------- 상품 정보 요청하여 상품 리스트 화면 구성 종료 ------------------------------------
    .catch((error) => {
      console.error(error);
      window.location.href = "./error.html";
    });
});
