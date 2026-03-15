/* ═══════════════════════════════════════════════════
   AIRVA COACHING — script.js
   Sections:
   1.  Navbar — scroll + hamburger
   2.  Blob parallax (rAF loop)
   3.  Mouse glow (hero)
   4.  Hero image 3D tilt
   5.  Rank counter
   6.  Marquee duplicate
   7.  Results cards glow (--x / --y)
   8.  Fade-up observer (.fade-up)
   9.  Programs scroll reveal (.pc-fade)
   10. Timeline reveal + progress line
   11. Faculty scroll reveal (.fc-fade)
   12. Testimonials scroll reveal (.testi-fade)
   13. FAQ accordion + reveal
   14. Final CTA reveal
   15. Scroll indicator hide on footer
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. NAVBAR — scroll class + hamburger
───────────────────────────────────────── */
const navbar = document.querySelector(".navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* ─────────────────────────────────────────
   2. BLOB PARALLAX — rAF loop
───────────────────────────────────────── */
const blobs = document.querySelectorAll(".blob");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener(
  "mousemove",
  (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  },
  { passive: true },
);

function animateBlobs() {
  const { innerWidth, innerHeight } = window;
  blobs.forEach((blob) => {
    const speed = blob.dataset.speed || 1;
    const x = ((innerWidth / 2 - mouseX) * speed) / 200;
    const y = ((innerHeight / 2 - mouseY) * speed) / 200;
    blob.style.transform = `translate3d(${x}px,${y}px,0)`;
  });
  requestAnimationFrame(animateBlobs);
}
animateBlobs();

/* ─────────────────────────────────────────
   3. MOUSE GLOW — hero section
───────────────────────────────────────── */
const hero = document.querySelector(".hero");
const glow = document.getElementById("mouseGlow");

if (hero && glow) {
  hero.addEventListener(
    "mousemove",
    (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = e.clientX - rect.left + "px";
      glow.style.top = e.clientY - rect.top + "px";
    },
    { passive: true },
  );
}

/* ─────────────────────────────────────────
   4. HERO IMAGE 3D TILT
───────────────────────────────────────── */
const heroImage = document.querySelector(".hero-right img");

if (heroImage) {
  document.addEventListener(
    "mousemove",
    (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 40;
      const y = (window.innerHeight / 2 - e.clientY) / 40;
      heroImage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    },
    { passive: true },
  );
}

/* ─────────────────────────────────────────
   5. RANK COUNTER — increments every 4s
───────────────────────────────────────── */
const rankCounter = document.getElementById("rankCounter");

if (rankCounter) {
  let count = 1284;

  function updateCounter() {
    count += Math.floor(Math.random() * 2) + 1;
    rankCounter.textContent = count;
    rankCounter.classList.add("bump");
    setTimeout(() => rankCounter.classList.remove("bump"), 200);
  }

  setInterval(updateCounter, 4000);
}

/* ─────────────────────────────────────────
   6. MARQUEE — ensure 2× width for loop
───────────────────────────────────────── */
const marqueeContent = document.getElementById("marqueeContent");

if (marqueeContent) {
  const parentWidth = marqueeContent.parentElement.offsetWidth;
  let safety = 0;

  while (marqueeContent.scrollWidth < parentWidth * 2.5 && safety < 5) {
    marqueeContent.innerHTML += marqueeContent.innerHTML;
    safety++;
  }
}

/* ─────────────────────────────────────────
   7. RESULTS CARDS — mouse glow (--x / --y)
───────────────────────────────────────── */
document.querySelectorAll(".results-card").forEach((card) => {
  card.addEventListener(
    "mousemove",
    (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", e.clientX - rect.left + "px");
      card.style.setProperty("--y", e.clientY - rect.top + "px");
    },
    { passive: true },
  );
});

/* ─────────────────────────────────────────
   8. FADE-UP OBSERVER — .fade-up elements
───────────────────────────────────────── */
const fadeUpObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeUpObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document
  .querySelectorAll(".fade-up")
  .forEach((el) => fadeUpObserver.observe(el));

/* ─────────────────────────────────────────
   9. PROGRAMS SCROLL REVEAL — .pc-fade
───────────────────────────────────────── */
(function () {
  const pcCards = document.querySelectorAll(".pc-fade");

  const pcObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.dataset.delay || 0) * 0.15;
          entry.target.style.transitionDelay = delay + "s";
          entry.target.classList.add("pc-visible");
          pcObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  pcCards.forEach((card) => pcObserver.observe(card));
})();

/* ─────────────────────────────────────────
   10. TIMELINE REVEAL + SCROLL PROGRESS
───────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll(".timeline-item");
  const container = document.getElementById("timelineContainer");
  const progressEl = document.getElementById("timelineProgress");

  // Staggered reveal
  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          itemObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  items.forEach((item, i) => {
    item.style.transitionDelay = i * 0.12 + "s";
    itemObserver.observe(item);
  });

  // Scroll-driven progress line
  if (container && progressEl) {
    function updateProgress() {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const scrolled = Math.max(0, viewH - rect.top);
      const total = rect.height + viewH * 0.1;
      const pct = Math.min((scrolled / total) * 100, 100);
      progressEl.style.height = pct + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }
})();

/* ─────────────────────────────────────────
   11. FACULTY SCROLL REVEAL — .fc-fade
───────────────────────────────────────── */
(function () {
  const fcCards = document.querySelectorAll(".fc-fade");

  const fcObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const col = [...fcCards].indexOf(entry.target) % 4;
          entry.target.style.transitionDelay = col * 0.1 + "s";
          entry.target.classList.add("fc-visible");
          fcObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  fcCards.forEach((c) => fcObserver.observe(c));
})();

/* ─────────────────────────────────────────
   12. TESTIMONIALS SCROLL REVEAL — .testi-fade
───────────────────────────────────────── */
(function () {
  const testiCards = document.querySelectorAll(".testi-fade");

  const testiObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const col = [...testiCards].indexOf(entry.target) % 3;
          entry.target.style.transitionDelay = col * 0.1 + "s";
          entry.target.classList.add("testi-visible");
          testiObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  testiCards.forEach((c) => testiObserver.observe(c));
})();

/* ─────────────────────────────────────────
   13. FAQ — Accordion + scroll reveal
───────────────────────────────────────── */
(function () {
  const faqItems = document.querySelectorAll(".faq-item");

  // Accordion — one open at a time
  faqItems.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isOpen = item.classList.contains("faq-open");

      faqItems.forEach((i) => {
        i.classList.remove("faq-open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("faq-open");
        item
          .querySelector(".faq-question")
          .setAttribute("aria-expanded", "true");
      }
    });
  });

  // Scroll reveal with stagger
  const faqFaders = document.querySelectorAll(".faq-fade");

  const faqObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = [...faqFaders].indexOf(entry.target);
          entry.target.style.transitionDelay = idx * 0.06 + "s";
          entry.target.classList.add("faq-visible");
          faqObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  faqFaders.forEach((el) => faqObserver.observe(el));
})();

/* ─────────────────────────────────────────
   14. FINAL CTA REVEAL — .cta-inner
───────────────────────────────────────── */
(function () {
  const ctaInner = document.querySelector(".cta-inner");
  if (!ctaInner) return;

  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cta-visible");
          ctaObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  ctaObserver.observe(ctaInner);
})();

/* ─────────────────────────────────────────
   15. SCROLL INDICATOR — hide on footer
───────────────────────────────────────── */
(function () {
  const indicator = document.getElementById("scrollIndicator");
  const footer = document.getElementById("footer");
  if (!indicator || !footer) return;

  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      indicator.classList.toggle("hide", entry.isIntersecting);
    },
    { threshold: 0.01 },
  );

  footerObserver.observe(footer);
})();
