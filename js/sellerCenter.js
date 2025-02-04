import { API_BASE_URL } from "./config.js";

window.addEventListener("pageshow", async () => {
  const token = localStorage.getItem("token");
  const storeName = localStorage.getItem("storeName");
  const storeNameText = document.querySelector(".dashbord_text span");
  storeNameText.textContent = storeName;

  async function deleteItem() {}
  try {
    const response = await fetch(`${API_BASE_URL}${storeName}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`데이터 로딩 실패: ${response.status}`);
    }

    const data = await response.json();
    const products = data.results;
    const section = document.querySelector(".item_list_area");
    if (products.length === 0) {
      section.innerHTML = `<p class="no_item">판매중인 상품이 없습니다</p>`;
      return;
    }
    const itemsHTML = products
      .map(
        (item) => `
      <div class="item">
        <ul class="product_info_text">
          <img src="${item.image}" class="image" alt="${item.name}"/> 
          <li>
            <p>${item.name}</p>
            <p>재고 ${item.stock}개</p>
          </li>
        </ul>
        <ul class="edit_area">
          <li>${item.price.toLocaleString()}원</li>
          <li><button class="edit_item">수정</button></li>
          <li><button class="delete_item">삭제</button></li>
        </ul>
      </div>
    `
      )
      .join("");

    section.innerHTML += itemsHTML;
  } catch (error) {
    alert("데이터 로딩 중 오류 발생: " + error.message);
    throw error;
  }
});
