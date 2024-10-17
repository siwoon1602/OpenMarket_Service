// ------------------------ 토큰 보유 시 화면 변경 ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userMenuTwo = document.querySelector("#userMenu2");
  if (token) {
    userMenuTwo.innerHTML = `<a href="#" target="_self" ><img src="./assets/icon-user.svg" alt="" />
    <span id="userinterface_first">마이페이지</span></a>
       <div class="header_modal hide">
<div class="triangle"></div>
<div class="box">
  <button>마이페이지</button>
  <button id="logout">로그아웃</button>
</div>
</div>`;
  }
});
// ----------------------------------------------------------------------------
const userMenuTwo = document
  .querySelector("#userMenu2")
  .addEventListener("click", () => {
    const headerModal = document.querySelector(".header_modal");
    const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
    const userMenuOneIcon = document.querySelector("#userMenu1 a img");
    const userMenuTwoText = document.querySelector("#userinterface_second");
    const userMenuOneText = document.querySelector("#userinterface_first");
    const token = localStorage.getItem("token");

    const userBasicColor = "./assets/icon-user-2.svg";
    const userChangeColor = "./assets/icon-user.svg";
    const cartBasicColor = "./assets/icon-shopping-cart-2.svg";
    const cartChangeColor = "./assets/icon-shopping-cart.svg";

    if (token) {
      headerModal.classList.toggle("hide");
    }

    if (token && userMenuTwoIcon.getAttribute("src") === userBasicColor) {
      userMenuTwoIcon.setAttribute("src", userChangeColor);
      userMenuOneIcon.setAttribute("src", cartChangeColor);
      userMenuTwoText.classList.add("maincolor");
      userMenuOneText.classList.add("maincolor");
    } else {
      userMenuTwoIcon.setAttribute("src", userBasicColor);
      userMenuOneIcon.setAttribute("src", cartBasicColor);
      userMenuTwoText.classList.remove("maincolor");
      userMenuOneText.classList.remove("maincolor");
    }
  });
// ------------------------ 상품 리스트 불러오기 ----------------------------

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://estapi.openmarket.weniv.co.kr/products/")
    .then((response) => {
      return response.json();
    })
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
                <img src="${product.image}" alt="product_${index}" class="item_image}">
                <ul class="product_info">
                  <li class="item_seller">${product.seller.store_name}</li>
                  <li class="item_name">${product.name}</li>
                  <li class="item_price">${product.price}<span>원</span></li>
                </ul>
              </article>
                </a>
            </li>`;
        }
      });

      productContainer.innerHTML = productHTML;
    })
    .catch((error) => {
      console.error(error);
    });
});
