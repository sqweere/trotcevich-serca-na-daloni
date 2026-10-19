/* «Сэрца на далоні» — общий скрипт сайта: тема, меню, переходы, scroll-reveal */
(function () {
  "use strict";

  /* ---------- Ночная тема ---------- */
  var root = document.documentElement;
  var KEY = "serca-theme";

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    var btn = document.querySelector(".theme-toggle");
    if (btn) btn.textContent = t === "night" ? "☀" : "☾";
    btn = btn && btn.setAttribute("aria-label", t === "night" ? "Дневная тема" : "Ночная тема");
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  applyTheme(saved || "day");

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".theme-toggle")) {
      applyTheme(root.getAttribute("data-theme") === "night" ? "day" : "night");
    }
  });

  /* ---------- Мобильное меню ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".nav-toggle");
    if (t) {
      var nav = document.querySelector(".main-nav");
      if (nav) nav.classList.toggle("open");
    } else if (e.target.closest && e.target.closest(".main-nav a")) {
      var nav2 = document.querySelector(".main-nav");
      if (nav2) nav2.classList.remove("open");
    }
  });

  /* ---------- Плавные переходы между страницами ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || a.target === "_blank") return;
    if (href.indexOf("mailto:") === 0 || href.indexOf("http") === 0) return;
    if (a.dataset && a.dataset.noFade) return;
    e.preventDefault();
    document.body.classList.add("nav-away");
    setTimeout(function () { window.location.href = href; }, 260);
  });

  window.addEventListener("pageshow", function () {
    document.body.classList.remove("nav-away");
  });

  /* ---------- Появление при скролле (IntersectionObserver) ---------- */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Обложка: книга открывается ---------- */
  var book = document.querySelector(".book");
  if (book) {
    var opened = false;
    setTimeout(function () {
      opened = true;
      book.classList.add("open");
    }, 900);
    book.addEventListener("click", function () {
      opened = !opened;
      book.classList.toggle("open", opened);
    });
  }

  /* ---------- Хронология: показать/скрыть контекст ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".tl-more");
    if (t) {
      var box = t.nextElementSibling;
      if (box && box.classList.contains("tl-extra")) {
        box.hidden = !box.hidden;
        t.textContent = box.hidden ? "Показать контекст" : "Скрыть";
      }
    }
  });
})();
