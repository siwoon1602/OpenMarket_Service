function getOrderState(orderState) {
  switch (orderState) {
    case "payment_pending":
      return "결제대기중";
    case "payment_complete":
      return "결제완료";
    case "preparing":
      return "배송준비중";
    case "shipping":
      return "배송중";
    default:
      return "결제 대기중";
  }
}
window.addEventListener("pageshow", (e) => {
  const token = localStorage.getItem("token");

  async function fetchList() {
    try {
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/order/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("서버 응답에 문제가 있습니다.");
      }

      const data = await response.json();

      if (data.count === 0) {
        const container = document.querySelector(".order_container");
        if (container) {
          container.innerHTML = `
            <p>주문 내역이 없습니다.</p>
          `;
        }
        return;
      }

      const productHTML = data.results
        .map((item) => {
          const createdAt = new Date(item.created_at).toLocaleDateString();
          const orderNum = item.order_number;
          const orderStatus = getOrderState(item.order_status);
          const totalPrice = item.total_price;
          const firstProduct = item.order_items[0];

          return `
         <section class="order_list_container">
          <div class="cart_list">
            <div class="image">
              <img src="${firstProduct.product.image}" alt="${
            firstProduct.product.name
          }">
            </div>
            <ul class="prodcut_info_text">
              <li>주문번호: ${orderNum}</li>
              <li>${firstProduct.product.name}</li>
              <li>${createdAt}</li>
            </ul>
            <ul>
              <li class="order_state">${orderStatus}</li>
            </ul>
            <div class="order_area">
              <ul>
                <li>${totalPrice.toLocaleString()}원</li>
                <li><button class="order_btn" data-order-id="${
                  item.id
                }">상세보기</button></li>
              </ul>
            </div>
          </div>
        </section>
        `;
        })
        .join("");

      const container = document.querySelector("main");
      if (container) {
        container.innerHTML += productHTML;
      }
    } catch (error) {
      console.error("통신오류:", error);
    }
  }

  if (token) {
    fetchList();
  }
});
