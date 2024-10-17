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
