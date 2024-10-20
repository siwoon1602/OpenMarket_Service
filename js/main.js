// ------------------------ 토큰 보유 시 화면 변경 ----------------------------
window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");
  const userMenuTwo = document.querySelector("#userMenu2");

  if (token) {
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
          </div>
      `;

    // ------------------------ 토큰 보유 시 화면 변경 종료  ----------------------------

    // ---------------------------- 마이페이지 클릭시 모달창 로그아웃 기능  ---------------------------------

    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
      });
    }
  }
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
