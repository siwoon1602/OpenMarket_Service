import { API_BASE_URL } from "./config.js";

// Swiper 초기화
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let currentItem = 1;
const itemsPerItem = 6;
let allProducts = [];
let isLoading = false;

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

  // 모달창 외부 클릭시 닫기
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
});

function createProductHTML(product, index) {
  return `
    <li class="product_list">
      <a href="details.html?id=${product.id}">
        <article>
          <img 
            src="${product.image}" 
            alt="product_${index}" 
            class="item_image"
            onerror="this.src='./assets/placeholder.png'"
          >
          <ul class="product_info">
            <li class="item_seller">${product.seller.store_name}</li>
            <li class="item_name">${product.name}</li>
            <li class="item_price">
              ${product.price.toLocaleString()}<span>원</span>
            </li>
          </ul>
        </article>
      </a>
    </li>
  `;
}

async function loadAndDisplayProducts() {
  if (isLoading) return;
  isLoading = true;

  const productContainer = document.querySelector(".product-list-container");
  const loadMoreBtn = document.querySelector(".load_more_btn");

  try {
    const response = await fetch(`${API_BASE_URL}products/`);
    const data = await response.json();
    allProducts = data.results;

    const startIndex = 0;
    const endIndex = currentItem * itemsPerItem;
    const productsToShow = allProducts.slice(startIndex, endIndex);

    let productHTML = "";
    productsToShow.forEach((product, index) => {
      productHTML += createProductHTML(product, index);
    });

    productContainer.innerHTML = productHTML;

    if (endIndex >= allProducts.length) {
      loadMoreBtn.classList.add("hide");
    } else {
      loadMoreBtn.classList.remove("hide");
    }
  } catch (error) {
    console.error("상품 로드 중 오류 발생:", error);
    window.location.href = "./error.html";
  } finally {
    isLoading = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndDisplayProducts();

  const loadMoreBtn = document.querySelector(".load_more_btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentItem++;
      loadAndDisplayProducts();
    });
  }
});

// 모달 관련 이벤트 리스너
window.addEventListener("load", function () {
  const modal = document.querySelector(".modal");
  const cartBtn = document.querySelector("#userMenu1");

  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token && modal) {
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

    const closeBtn = modal.querySelector(".close_btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.close();
      });
    }

    const yesBtn = modal.querySelector(".yes_btn");
    if (yesBtn) {
      yesBtn.addEventListener("click", () => {
        window.location.href = "./login.html";
      });
    }

    const noBtn = modal.querySelector(".no_btn");
    if (noBtn) {
      noBtn.addEventListener("click", () => {
        modal.close();
      });
    }
  }
});
