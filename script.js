const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

root.classList.add("js");

/* ---------- Theme toggle ---------- */
const THEME_KEY = "visit-jonava-theme";

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage blocked: the choice just won't be remembered */
  }
}

const savedTheme = readTheme();
if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : darkScheme.matches;
  const next = isDark ? "light" : "dark";
  root.dataset.theme = next;
  saveTheme(next);
});

/* ---------- Nav background after scrolling ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Dot grid follows the pointer (one update per frame) ---------- */
let pointerFrame = 0;
window.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    root.style.setProperty("--mx", `${event.clientX}px`);
    root.style.setProperty("--my", `${event.clientY}px`);
    pointerFrame = 0;
  });
});

/* ---------- Button ripple ---------- */
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    if (reducedMotion.matches) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

/* ---------- Toast ---------- */
const toast = document.querySelector(".toast");
let toastTimer;
document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => {
    toast.textContent = button.dataset.toast;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  });
});

/* ---------- Count-up numbers ---------- */
function countUp(el) {
  const target = Number(el.dataset.count);
  if (reducedMotion.matches || target < 2) return;
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Reveal on scroll ---------- */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}

document.querySelectorAll("[data-count]").forEach(countUp);
