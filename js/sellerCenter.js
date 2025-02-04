import { API_BASE_URL } from "./config.js";

window.addEventListener("pageshow", async () => {
  const token = localStorage.getItem("token");
  const storeName = localStorage.getItem("storeName");

  const storeNameText = document.querySelector(".dashbord_text span");

  storeNameText.textContent = storeName;

  async function deleteItem(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}products/${productId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`삭제 실패: ${response.status}`);
      }
      alert("정상적으로 상품이 삭제 되었습니다!");
      window.location.reload();
    } catch (error) {
      alert("상품 삭제 중 오류 발생: " + error.message);
    }
  }

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

    const productCountBtn = document.querySelector(
      "nav ul li:first-child button"
    );
    productCountBtn.textContent = `판매중인 상품 (${data.count || 0})`;

    if (products.length === 0) {
      section.innerHTML = `<p class="no_item">판매중인 상품이 없습니다</p>`;
      return;
    }

    section.innerHTML = products
      .map(
        (item) => `
      <div class="item" data-product-id="${item.product_id}">
        <ul class="product_info_text">
          <img src="${item.image}" 
               class="image" 
               alt="${item.name}"
               onerror="this.src='./assets/placeholder.png'"/> 
          <li>
            <p>${item.name}</p>
            <p>재고 ${item.stock}개</p>
          </li>
        </ul>
        <ul class="edit_area">
          <li>${item.price.toLocaleString()}원</li>
          <li><button class="edit_item" data-product-id="${
            item.product_id
          }">수정</button></li>
          <li><<button class="delete_item" data-product-id="${
            item.id
          }"> 삭제</button></li>
        </ul>
      </div>
    `
      )
      .join("");

    const deleteButtons = document.querySelectorAll(".delete_item");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        if (confirm("정말 이 상품을 삭제하시겠습니까?")) {
          const productId = e.target.dataset.productId;
          await deleteItem(productId);
        }
      });
    });
  } catch (error) {
    console.error("에러 발생:", error);
    alert("데이터 로딩 중 오류 발생: " + error.message);
  }
});
