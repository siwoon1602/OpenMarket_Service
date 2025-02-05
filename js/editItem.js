import { API_BASE_URL } from "./config.js";
window.addEventListener("pageshow", () => {
  const deliveryBtn = document.querySelector(".delivery_btn");
  const parcelBtn = document.querySelector(".parcel_btn");
  const cancledBtn = document.querySelector(".cancled_btn");
  let selectedDeliveryType = "DELIVERY";

  cancledBtn.addEventListener("click", () => {
    window.history.back();
  });

  deliveryBtn.addEventListener("click", () => {
    deliveryBtn.classList.add("on_btn");
    parcelBtn.classList.remove("on_btn");
    selectedDeliveryType = "DELIVERY";
  });

  parcelBtn.addEventListener("click", () => {
    parcelBtn.classList.add("on_btn");
    deliveryBtn.classList.remove("on_btn");
    selectedDeliveryType = "PARCEL";
  });

  const nameInput = document.querySelector(".item_name_input");
  const priceInput = document.querySelector(".item_prcie_input");
  const shippingFeeInput = document.querySelector(".item_shipping_fee_input");
  const stockInput = document.querySelector(".item_stock_input");
  const infoInput = document.querySelector(".item_datail_input");
  const img = document.querySelector(".preview_image");
  const imageInput = document.querySelector("#imageInput");
  const imgArea = document.querySelector(".img_area");

  const data = JSON.parse(localStorage.getItem("editProductData"));
  const id = data.id;

  if (data) {
    nameInput.value = data.name;
    priceInput.value = data.price;
    shippingFeeInput.value = data.shipping_fee;
    stockInput.value = data.stock;
    infoInput.value = data.info;
    img.src = data.image;
    selectedDeliveryType = data.shipping_method;

    if (data.shipping_method === "PARCEL") {
      parcelBtn.classList.add("on_btn");
      deliveryBtn.classList.remove("on_btn");
    } else {
      deliveryBtn.classList.add("on_btn");
      parcelBtn.classList.remove("on_btn");
    }
  } else {
    deliveryBtn.classList.add("on_btn");
  }

  imgArea.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const saveBtn = document.querySelector(".save_btn");
  saveBtn.addEventListener("click", async () => {
    try {
      const name = nameInput.value.trim();
      const price = parseInt(priceInput.value);
      const shipping_fee = parseInt(shippingFeeInput.value);
      const stock = parseInt(stockInput.value);
      const info = infoInput.value.trim();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("info", info);
      formData.append("price", price);
      formData.append("shipping_method", selectedDeliveryType);
      formData.append("shipping_fee", shipping_fee);
      formData.append("stock", stock);

      if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}products/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`상품 수정 실패: ${response.status}`);
      }

      await response.json();
      alert("상품이 성공적으로 수정되었습니다!");
      window.location.href = "./sellerCenter.html";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "상품 수정에 실패하였습니다.");
    }
  });
});
