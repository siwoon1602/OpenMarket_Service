document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const imgArea = document.querySelector(".img_area");
  const deliveryBtn = document.querySelector(".delivery_btn");
  const parcelBtn = document.querySelector(".parcel_btn");
  const cancledBtn = document.querySelector(".cancled_btn");
  cancledBtn.addEventListener("click", () => {
    window.history.back();
  });
  deliveryBtn.addEventListener("click", () => {
    deliveryBtn.classList.add("on_btn");
    parcelBtn.classList.remove("on_btn");
  });

  parcelBtn.addEventListener("click", () => {
    parcelBtn.classList.add("on_btn");
    deliveryBtn.classList.remove("on_btn");
  });

  deliveryBtn.classList.add("on_btn");

  imgArea.addEventListener("click", () => {
    imageInput.click();
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
