window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.innerWidth <= 1000) {
    return;
  }
  if (window.scrollY > 80) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

function fix(){
  const navbar = document.querySelector(".navbar");

  if (window.innerWidth <= 1000) {
    navbar.classList.remove("shrink");
  } else if (window.scrollY > 80) {
    navbar.classList.add("shrink");
  }
}

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

// Run on page load and window resize
window.addEventListener("load", () => {
  fix();
});

window.addEventListener("resize", () => {
  fix();
});