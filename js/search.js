import { API_BASE_URL } from "./config.js";

const searchBtn = document.querySelector(".search-icon");
document.querySelector(".search_input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", async () => {
  const searchInput = document.querySelector(".search_input");
  let searchValue = searchInput.value.trim();

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
