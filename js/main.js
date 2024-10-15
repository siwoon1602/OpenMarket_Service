document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userInterOne = document.querySelector("#userinerface_first");
  if (token) {
    userInterOne.innerHTML = `<span>마이페이지</span>`;
  }
});
