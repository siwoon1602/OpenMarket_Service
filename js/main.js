// ------------------------ 토큰 보유 시 화면 변경 ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userInterOne = document.querySelector("#userinerface_first");
  if (token) {
    userInterOne.innerHTML = `<span>마이페이지</span>`;
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
      // productSellerOne.textContent = data.results[1].seller.store_name;
      // productNameOne.textContent = data.results[1].name;
      // productImgOne.setAttribute("src", `${data.results[1].image}`);
      // productPriceOne.textContent = data.results[1].price + "원";
      document.body.innerHTML = `<header>
      <div class="header_content">
       <div  class="header_contet_left">
          <h2 class="sr-only">HODU!</h2>
          <a href="/" alt="HODU!" class="logo"></a>
          <div class="search">
            <input type="text" placeholder="상품을 검색해보세요!" />
            <div class="search-icon"></div>
        </div>
       </div>
 
      <ul class="user_menu">
        <li>
          <a href=""
            ><img src="./assets/icon-shopping-cart.svg" alt="" /><span>장바구니</span></a
          >
        </li>
        <li>
          <a href="./login.html" target="_self" ><img src="./assets/icon-user.svg" alt="login"  /><span id="userinerface_first">로그인</span></a>
        </li>
      </div>
  <main class="main">
    <h2 class="sr-only">상품 리스트</h2>
          <section class="slide_banner">
            <button class="slide_left"></button
            ><button class="slide_right"></button>
          </section>
          
            <ul class="container_1">
              <li class="product_list">
                <article>
                <img src="${data.results[1].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[1].seller.store_name}</li>
                  <li class="item_name_01">${data.results[1].name}</li>
                  <li class="item_price_01">${data.results[1].price}<span>원</span></li>
                </ul>
                </article>
              </li>
              <li class="product_list">
                <article>
                   <img src="${data.results[2].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[2].seller.store_name}</li>
                  <li class="item_name_01">${data.results[2].name}</li>
                  <li class="item_price_01">${data.results[2].price}<span>원</span></li>
                </ul>
                </article>
              </li>
              <li class="product_list">
                <article>
                   <img src="${data.results[3].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[3].seller.store_name}</li>
                  <li class="item_name_01">${data.results[3].name}</li>
                  <li class="item_price_01">${data.results[3].price}<span>원</span></li>
                </ul>
                
                </article>
              </li>
            </ul>
            <ul class="container_2">
                <li class="product_list">
                  <article>
                    <img src="${data.results[4].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[4].seller.store_name}</li>
                  <li class="item_name_01">${data.results[4].name}</li>
                  <li class="item_price_01">${data.results[4].price}<span>원</span></li>
                    </ul>
                  </article>
                </li>
                <li class="product_list">
                  <article>
                     <img src="${data.results[5].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[5].seller.store_name}</li>
                  <li class="item_name_01">${data.results[5].name}</li>
                  <li class="item_price_01">${data.results[5].price}<span>원</span></li>
                    </ul>
                  </article>
                </li>
                <li class="product_list">
                  <article>
                     <img src="${data.results[0].image}" alt="product_01" class="item_image_01">
                <ul class="product_info">
                  <li class="item_seller_01">${data.results[0].seller.store_name}</li>
                  <li class="item_name_01">${data.results[0].name}</li>
                  <li class="item_price_01">${data.results[0].price}<span>원</span></li>
                    </ul>
                  </article>
                </li>
            </ul>
            
  </main>
  <footer class="footer">
    <div class="footer_content">
      <h2 class="sr-only">호두샵 정보</h2>
  <div class="footer_top">
        <ul class="info">
          <li><a href="">호두샵 소개</a></li>
          <li><a href="">이용약관</a></li>
          <li><a href=""><strong>개인정보처리방침</strong></a></li>
          <li><a href="">전자금융거래약관</a></li>
          <li><a href="">청소년보호정책</a></li>
          <li><a href="">제휴문의</a></li>
        </ul>
        <u class="sns_icon">
          <li ><a href="" target="_blank" class="insta"></a></li>
          <li ><a href="" target="_blank" class="facebook"></a></li>
          <li ><a href="" target="_blank" class="youtube"></a></li>
        </u>
  </div>
  <div class="line"></div>
  <address>
    <ul>
      <li><span>(주)HODU SHOP</span></li>
      <li>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</li>
      <li>사업자 번호 : 000-0000-0000 | 통신판매업</li>
      <li>대표 : 김호두</li>
    </ul>
  </address>
    </div>
  </footer>
    </header>`;
    })
    .catch((error) => {
      console.error(error);
    });
});
