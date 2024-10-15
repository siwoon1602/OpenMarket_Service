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
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
});
