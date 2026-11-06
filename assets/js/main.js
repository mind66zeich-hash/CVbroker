// C & V Broker s.r.l. — script principale
// Menu mobile, effetti allo scorrimento, contatori, parole a rotazione, torna su.

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  /* ---------- Header e pulsante "torna su" allo scorrimento ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Anni di attività (dal 1980) ---------- */
  var currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-since]").forEach(function (el) {
    var years = currentYear - parseInt(el.getAttribute("data-since"), 10);
    el.setAttribute("data-count", String(years));
    el.textContent = String(years);
  });

  /* ---------- Contatori animati ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target) || reduceMotion) {
      if (!isNaN(target)) el.textContent = String(target);
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(step);
    }
    el.textContent = "0";
    window.requestAnimationFrame(step);
  }

  /* ---------- Comparsa degli elementi allo scorrimento ---------- */
  var revealSelector = [
    ".section-head", ".card", ".steps li", ".highlight", ".quote",
    ".split > *", ".contact-list li", ".stat", ".map-wrap", ".prose > *"
  ].join(",");

  var counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window && !reduceMotion) {
    root.classList.add("js-reveal");

    // Ritardo progressivo per gli elementi affiancati (griglie, elenchi)
    document.querySelectorAll(".grid, .steps, .contact-list, .stats").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--reveal-delay", (i * 90) + "ms");
      });
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    document.querySelectorAll(revealSelector).forEach(function (el) {
      revealObserver.observe(el);
    });

    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------- Parole a rotazione ---------- */
  document.querySelectorAll("[data-rotate]").forEach(function (el) {
    var words = el.getAttribute("data-rotate").split("|");
    if (words.length < 2 || reduceMotion) return;
    var i = 0;
    setInterval(function () {
      el.classList.add("is-out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("is-out");
      }, 350);
    }, 2600);
  });

  /* ---------- Anno nel footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(currentYear);
})();
