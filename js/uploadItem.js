import { API_BASE_URL } from "./config.js";
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token && userType !== "SELLER") {
    alert("판매자 회원만 이용가능한 페이지 입니다!");
    window.location.href = "./login.html";
  }

  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const imgArea = document.querySelector(".img_area");
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

  deliveryBtn.classList.add("on_btn");

  imgArea.addEventListener("click", () => {
    imageInput.click();
  });
  const saveBtn = document.querySelector(".save_btn");
  saveBtn.addEventListener("click", async () => {
    try {
      const name = document.querySelector(".item_name_input").value;
      const price = parseInt(document.querySelector(".item_prcie_input").value);
      const shipping_fee = parseInt(
        document.querySelector(".item_shipping_fee_input").value
      );
      const stock = parseInt(document.querySelector(".item_stock_input").value);
      const info = document.querySelector(".item_datail_input").value;
      const image = imageInput.files[0];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("info", info);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("shipping_method", selectedDeliveryType);
      formData.append("shipping_fee", shipping_fee);
      formData.append("stock", stock);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`상품 등록 실패: ${response.status}`);
      }

      const data = await response.json();
      alert("상품이 성공적으로 등록되었습니다!");
      window.location.href = "./sellerCenter.html";
    } catch (error) {
      console.error("Error:", error);
      alert("상품등록에 실패하였습니다" + error.message);
    }
  });

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
