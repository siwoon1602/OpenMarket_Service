function addDirectOrderBtnEventListeners() {
  const token = localStorage.getItem("token");
  const directOrderBtn = document.querySelector(".now_sell");

  directOrderBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://estapi.openmarket.weniv.co.kr/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            "order_kind" : "direct_order",
            "product": Int,
            "quantity" : Int,
            "total_price": Int
            "reciever": String,
            "reciever_phone_number": String,
            "address": String,
            "address_message": String | null,
            "payment_method": "card"|"deposit"|"phone"|"naverpay"|"kakaopay",
          }),
        }
      );

      if (response.ok) {
        alert("장바구니가 정상적으로 비워졌습니다!");
        window.location.reload();
      } else {
        alert("장바구니 비우기에 실패했습니다.");
        console.error("서버 응답 오류:", response.status);
      }
    } catch (error) {
      alert("서버 통신 중 오류가 발생했습니다.");
      console.error("서버 통신 오류:", error);
    }
  });
}