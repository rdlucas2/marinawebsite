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

const track = document.getElementById("spotlight-track");
const nextBtn = document.getElementById("spotlight-next");
const prevBtn = document.getElementById("spotlight-prev");

// Change this value if your cards have a different width + gap
const scrollAmount = 320;

// 🔁 Scroll left
prevBtn.addEventListener("click", () => {
  track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

// 🔁 Scroll right
nextBtn.addEventListener("click", () => {
  track.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// 🧠 Highlight center card
function highlightCenter() {
  const centerX = track.offsetWidth / 2 + track.getBoundingClientRect().left;
  const cards = track.querySelectorAll(".spotlight-card:not(.spacer)");

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const isActive = Math.abs(centerX - cardCenter) < rect.width / 2;
    card.classList.toggle("active", isActive);
  });
}

// ⚙️ Update arrow state based on card position
function updateArrowState() {
  const cards = track.querySelectorAll(".spotlight-card:not(.spacer)");
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];

  const centerX = track.offsetWidth / 2 + track.getBoundingClientRect().left;
  const firstCenter = firstCard.getBoundingClientRect().left + firstCard.offsetWidth / 2;
  const lastCenter = lastCard.getBoundingClientRect().left + lastCard.offsetWidth / 2;

  // Only disable arrows when real cards are truly centered
  prevBtn.classList.toggle("disabled", firstCenter >= centerX - firstCard.offsetWidth / 2);
  nextBtn.classList.toggle("disabled", lastCenter <= centerX + lastCard.offsetWidth / 2);
}

// 🎯 Scroll listener: update spotlight and arrow state
track.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    highlightCenter();
    updateArrowState();
  });
});

// 🚀 Initialize on page load
window.addEventListener("load", () => {
  highlightCenter();
  updateArrowState();
});

function resizeSpacers() {
  const spacerCards = track.querySelectorAll(".spacer");
  const cards = track.querySelectorAll(".spotlight-card:not(.spacer)");

  if (cards.length === 0) return;

  const trackStyles = getComputedStyle(track);
  const trackWidth = track.offsetWidth;
  const cardWidth = cards[0].offsetWidth;

  const gap = parseInt(trackStyles.columnGap || trackStyles.gap || "0", 10);
  const paddingLeft = parseInt(trackStyles.paddingLeft || "0", 10);
  const paddingRight = parseInt(trackStyles.paddingRight || "0", 10);

  const visibleWidth = trackWidth - paddingLeft - paddingRight;
  const spacerSize = (visibleWidth - cardWidth) / 2 - gap;

  spacerCards.forEach(spacer => {
    spacer.style.flex = `0 0 ${spacerSize}px`;
  });
}

// Run on page load and window resize
window.addEventListener("load", () => {
  resizeSpacers();
  highlightCenter();
  updateArrowState();
});

window.addEventListener("resize", () => {
  resizeSpacers();
  highlightCenter();
  updateArrowState();
});