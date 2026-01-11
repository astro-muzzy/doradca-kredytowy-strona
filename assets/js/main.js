// assets/js/main.js

(function () {
  // Rok w stopce
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // "Do góry"
  const toTop = document.getElementById("toTop");
  function toggleTop() {
    if (!toTop) return;
    if (window.scrollY > 700) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }
  window.addEventListener("scroll", toggleTop);
  toggleTop();

  // Link do formularza (jeśli użyjesz przycisku #goForm)
  const FORM_URL = "https://twojadomena.pl/formularz";
  const goForm = document.getElementById("goForm");
  if (goForm) {
    goForm.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = FORM_URL;
    });
  }

  // Smooth scroll do kotwic
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });
})();

