(function () {
  var yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  var toTopButton = document.getElementById('toTop');
  if (!toTopButton) {
    return;
  }

  function toggleToTopButton() {
    if (window.scrollY > 500) {
      toTopButton.classList.add('show');
    } else {
      toTopButton.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleToTopButton, { passive: true });
  toggleToTopButton();
})();
