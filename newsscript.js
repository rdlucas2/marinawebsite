const slider = document.querySelector(".slider");
let isAnimating = false;

function activate(e) {
  if (isAnimating) return;
  isAnimating = true;

  const items = document.querySelectorAll(".item");

  if (e.target.matches(".next")) {
    slider.append(items[0]);
  }
  if (e.target.matches(".prev")) {
    slider.prepend(items[items.length - 1]);
  }

  setTimeout(() => {
    isAnimating = false;
  }, 750); // Match CSS transition duration
}

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const items = slider.querySelectorAll(".item");

  if (items.length) {
    const lastItem = items[items.length - 1];
    slider.insertBefore(lastItem, items[0]);
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("init");
});

document.addEventListener("click", activate, false);

// 🌐 Sidebar controls
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");

hamburger.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove("active");
  }
});