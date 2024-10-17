// // ------------------------ 토큰 보유 시 화면 변경 ----------------------------

// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");
//   const userMenuTwo = document.querySelector("#userinterface_first");
//   console.log(token);
//   console.log(userMenuTwo);
//   if (token) {
//     console.log("토큰있음");
//     userMenuTwo.textContent = "마이페이지";
//   }
// });

// window.addEventListener("load", () => {
//   const token = localStorage.getItem("token");
//   const userMenuTwo = document.querySelector("#userinterface_first");

//   if (token) {
//     userMenuTwo.textContent = "마이페이지";
//   }
// });

// // ----------------------------------------------------------------------------

// const userMenuTwo = document
//   .querySelector("#userMenu2")
//   .addEventListener("click", () => {
//     const headerModal = document.querySelector(".header_modal");
//     const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
//     const userMenuOneIcon = document.querySelector("#userMenu1 a img");
//     const userMenuTwoText = document.querySelector("#userinterface_second");
//     const userMenuOneText = document.querySelector("#userinterface_first");
//     const token = localStorage.getItem("token");

//     const userBasicColor = "./assets/icon-user-2.svg";
//     const userChangeColor = "./assets/icon-user.svg";
//     const cartBasicColor = "./assets/icon-shopping-cart-2.svg";
//     const cartChangeColor = "./assets/icon-shopping-cart.svg";

//     if (token) {
//     }

//     if (userMenuTwoIcon.getAttribute("src") === userBasicColor) {
//       userMenuTwoIcon.setAttribute("src", userChangeColor);
//       userMenuOneIcon.setAttribute("src", cartChangeColor);
//       userMenuTwoText.classList.add("maincolor");
//     } else {
//       userMenuTwoIcon.setAttribute("src", userBasicColor);
//       userMenuOneIcon.setAttribute("src", cartBasicColor);
//     }
//   });

// // ------------------------ 상품 리스트 불러오기 ----------------------------

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("https://estapi.openmarket.weniv.co.kr/products/")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       const productContainer = document.querySelector(
//         ".product-list-container"
//       );

//       let productHTML = "";
//       data.results.forEach((product, index) => {
//         if (index < 6) {
//           productHTML += `
//             <li class="product_list">
//             <a href="details.html?id=${product.id}">
//               <article>
//                 <img src="${product.image}" alt="product_${index}" class="item_image}">
//                 <ul class="product_info">
//                   <li class="item_seller">${product.seller.store_name}</li>
//                   <li class="item_name">${product.name}</li>
//                   <li class="item_price">${product.price}<span>원</span></li>
//                 </ul>
//               </article>
//                 </a>
//             </li>`;
//         }
//       });

//       productContainer.innerHTML = productHTML;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  // 페이지 로드 시 토큰 확인 후 UI 업데이트
  updateUserMenu();

  // 상품 리스트 불러오기
  loadProductList();

  // 유저 메뉴 클릭 시 모달 및 아이콘 처리
  const userMenuTwo = document.querySelector("#userMenu2");
  userMenuTwo.addEventListener("click", handleUserMenuClick);
});

// 유저 메뉴 UI 업데이트 함수
function updateUserMenu() {
  const token = localStorage.getItem("token");
  const userMenuTwoText = document.querySelector("#userinterface_first");

  if (token) {
    console.log("토큰 있음, UI 업데이트");
    userMenuTwoText.textContent = "마이페이지";
  }
}

// 유저 메뉴 클릭 시 처리 함수
function handleUserMenuClick() {
  const headerModal = document.querySelector(".header_modal");
  const userMenuTwoIcon = document.querySelector("#userMenu2 a img");
  const userMenuOneIcon = document.querySelector("#userMenu1 a img");
  const userMenuTwoText = document.querySelector("#userinterface_second");
  const userMenuOneText = document.querySelector("#userinterface_first");

  const userBasicColor = "./assets/icon-user-2.svg";
  const userChangeColor = "./assets/icon-user.svg";
  const cartBasicColor = "./assets/icon-shopping-cart-2.svg";
  const cartChangeColor = "./assets/icon-shopping-cart.svg";

  headerModal.classList.toggle("hide");
  userMenuTwoText.classList.toggle("maincolor");
  userMenuOneText.classList.toggle("maincolor");

  if (userMenuTwoIcon.getAttribute("src") === userBasicColor) {
    userMenuTwoIcon.setAttribute("src", userChangeColor);
    userMenuOneIcon.setAttribute("src", cartChangeColor);
  } else {
    userMenuTwoIcon.setAttribute("src", userBasicColor);
    userMenuOneIcon.setAttribute("src", cartBasicColor);
  }
}

// 상품 리스트 불러오기 함수
function loadProductList() {
  fetch("https://estapi.openmarket.weniv.co.kr/products/")
    .then((response) => response.json())
    .then((data) => {
      const productContainer = document.querySelector(
        ".product-list-container"
      );

      const productHTML = data.results
        .slice(0, 6) // 첫 6개의 상품만 가져오기
        .map(
          (product, index) => `
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
            </li>`
        )
        .join(""); // 배열을 하나의 문자열로 변환

      productContainer.innerHTML = productHTML;
    })
    .catch((error) => {
      console.error("상품 목록 불러오기 에러:", error);
    });
}
