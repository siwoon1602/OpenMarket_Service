document.addEventListener("DOMContentLoaded", () => {
  const orderData = JSON.parse(localStorage.getItem("orderData"));
  const orderList = document.querySelector(".order_list_container");
  const totlaPirce = document.querySelector(".totla_price");
  const totlaPirceArea = document.querySelector(".final_price");

  if (!orderData) {
    alert("주문 정보가 없습니다.");
    window.location.href = "./cart.html";

    return;
  }

  const totalProductPrice = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalShippingFee = orderData.items[0].shipping_fee;

  const orderItems = orderData.items
    .map((item) => {
      return `
          <div class="cart_list">
              <img class="image" src="${item.image}" alt="${
        item.product_name
      }" />
              <ul class="prodcut_info_text">
                  <li>${item.product_info}</li>
                  <li>${item.product_name}</li>
                  <li>수량: ${item.quantity}개</li>
              </ul>
              <ul class="order_text">
                  <li>-</li>
                  <li>${
                    item.shipping_fee === 0
                      ? "무료배송"
                      : `${item.shipping_fee.toLocaleString()}원`
                  }</li>
                  <li>${(item.price * item.quantity).toLocaleString()}원</li>
              </ul>
          </div>
      `;
    })
    .join("");

  orderList.innerHTML = `
      ${orderItems}
      
  `;
  totlaPirce.innerHTML = `
  <p class="totla_price">
          총 주문금액 <span>${orderData.final_price.toLocaleString()}원</span>
      </p>
  `;

  totlaPirceArea.innerHTML = ` <ul class="final_price">
              <li>
                <p>- 상품금액</p>
                <p>${totalProductPrice.toLocaleString()}<span>원</span></p>
              </li>
              <li>
                <p>- 할인금액</p>
                <p>0<span>원</span></p>
              </li>
              <li>
                <p>- 배송금액</p>
                <p>${
                  totalShippingFee === 0
                    ? "무료배송"
                    : `${totalShippingFee.toLocaleString()}<span>원</span>`
                }</p>
              </li>
              <li class="final_pay_info_line"></li>
              <li>
                <p>- 결제금액</p>
                <p>${orderData.final_price.toLocaleString()}<span>원</span></p>
              </li>
              <ul class="final_order_area">
                <li>
                  <input type="checkbox" />주문 내용을 확인하였으며, 정보 제공
                  등에 동의합니다.
                </li>
                <li>
                  <button class="pay_btn" disabled>결제하기</button>
                </li>
              </ul>`;
  localStorage.removeItem("orderData");
});
