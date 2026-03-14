const cards = document.querySelectorAll(".results-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");
  });
});
const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  blobs.forEach((blob) => {
    const speed = blob.dataset.speed;
    const x = ((innerWidth / 2 - mouseX) * speed) / 200;
    const y = ((innerHeight / 2 - mouseY) * speed) / 200;
    blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
});

const faders = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

faders.forEach((fader) => observer.observe(fader));
const marquee = document.querySelector(".marquee-content");
const parentWidth = marquee.parentElement.offsetWidth;
let marqueeWidth = marquee.scrollWidth;

if (marquee) {
  const parentWidth = marquee.parentElement.offsetWidth;
  let marqueeWidth = marquee.scrollWidth;
  let safety = 0;

  while (marqueeWidth < parentWidth * 2 && safety < 5) {
    marquee.innerHTML += marquee.innerHTML;
    marqueeWidth = marquee.scrollWidth;

    safety++;
  }
}
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});
/* HERO 3D HOVER */

const heroImage = document.querySelector(".hero-right img");

if (heroImage) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
  });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

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
const rankCounter = document.getElementById("rankCounter");

let count = 1284;

setInterval(updateCounter, 4000);
function updateCounter() {
  count += Math.floor(Math.random() * 2) + 1;

  rankCounter.textContent = count;

  rankCounter.classList.add("bump");

  setTimeout(() => {
    rankCounter.classList.remove("bump");
  }, 200);
}

if (rankCounter) {
  setInterval(updateCounter, 4000);
}

const hero = document.querySelector(".hero");
const glow = document.querySelector(".mouse-glow");

if (hero && glow) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = x + "px";
    glow.style.top = y + "px";
  });
}

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glow.style.left = x + "px";
  glow.style.top = y + "px";
});
// ---------------------PROGRAMS---------------------
/* ================================
   PROGRAM TIMELINE – JS
   Paste at the bottom of script.js
   (or inside your existing DOMContentLoaded)
================================ */

(function () {
  /* ---- 1. Fade-in items via IntersectionObserver ---- */
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item, i) => {
    // staggered delay
    item.style.transitionDelay = i * 0.12 + "s";
  });

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

  items.forEach((item) => itemObserver.observe(item));

  /* ---- 2. Scroll-driven progress line ---- */
  const container = document.getElementById("timelineContainer");
  const progressEl = document.getElementById("timelineProgress");

  if (container && progressEl) {
    function updateProgress() {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalH = rect.height;

      // how far the TOP of the container has scrolled past the viewport top
      const scrolled = Math.max(0, viewH - rect.top);
      // cap at container height
      const capped = Math.min(scrolled, totalH + viewH * 0.1);
      const pct = (capped / (totalH + viewH * 0.1)) * 100;

      progressEl.style.height = Math.min(pct, 100) + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // run once on load
  }
})();
/* ================================================
   PROGRAMS (WHAT) — Scroll Reveal JS
   Paste at the bottom of script.js
================================================ */

(function () {
  const cards = document.querySelectorAll(".pc-fade");

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

  cards.forEach((card) => pcObserver.observe(card));
})();
/* ================================================
   TESTIMONIALS — Scroll Reveal JS
   Paste at the bottom of script.js
================================================ */

(function () {
  const testiCards = document.querySelectorAll(".testi-fade");

  const testiObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger based on position in row (column index)
          const cards = [...testiCards];
          const idx = cards.indexOf(entry.target);
          const col = idx % 3; // 0, 1, 2
          entry.target.style.transitionDelay = col * 0.1 + "s";
          entry.target.classList.add("testi-visible");
          testiObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  testiCards.forEach((card) => testiObserver.observe(card));
})();
/* ================================================
   FACULTY — Scroll Reveal JS
   Paste at the bottom of script.js
================================================ */

(function () {
  const fcCards = document.querySelectorAll(".fc-fade");

  const fcObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const all = [...fcCards];
          const col = all.indexOf(entry.target) % 4;
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
/* ================================================
   FAQ — Accordion + Scroll Reveal JS
   Paste at the bottom of script.js
================================================ */

(function () {
  /* ---- 1. Accordion — one open at a time ---- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("faq-open");

      // close all
      faqItems.forEach((i) => {
        i.classList.remove("faq-open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add("faq-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- 2. Scroll reveal with stagger ---- */
  const faqFaders = document.querySelectorAll(".faq-fade");

  const faqObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const all = [...faqFaders];
          const idx = all.indexOf(entry.target);
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
/* ================================================
   FINAL CTA — Scroll Reveal JS
   Paste at the bottom of script.js
================================================ */

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
const indicator = document.querySelector(".scroll-indicator");
const footer = document.querySelector("#footer");

if (indicator && footer) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        indicator.classList.add("hide");
      } else {
        indicator.classList.remove("hide");
      }
    },
    { threshold: 0.01 },
  );

  observer.observe(footer);
}
