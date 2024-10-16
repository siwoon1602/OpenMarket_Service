const modal = document.querySelector(".modal");
const sellBtn = document
  .querySelector(".now_sell")
  .addEventListener("click", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      modal.showModal();
    }
  });
