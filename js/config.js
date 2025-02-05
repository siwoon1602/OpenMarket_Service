export const API_BASE_URL = "https://estapi.openmarket.weniv.co.kr/";

const searchBtn = document.querySelector(".search-icon");

searchBtn.addEventListener("click", async () => {
  console.log("검색!");
  const searchInput = document.querySelector(".search_input");

  let searchValue = searchInput.value.trim("");
  try {
    const response = await fetch(
      `${API_BASE_URL}products/?search=${searchValue}`,
      {
        method: "GET",
        headers: {},
      }
    );
    if (!response.ok) {
      throw new Error(`검색 실패: ${response.status}`);
    }

    const data = await response.json();
    if (data.count === 0) {
      alert("검색 결과가 없습니다");
      return;
    }
    localStorage.setItem("searchData", JSON.stringify(data));
    window.location.href = "./searchPage.html";
  } catch {}
});
