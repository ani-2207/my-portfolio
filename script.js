/* ==========================================================================
   1. MOBILE HAMBURGER MENU
   Clicking the hamburger button toggles the mobile dropdown nav.
   Clicking any link inside it closes the menu again.
   ========================================================================== */
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu automatically after tapping a link
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================================
   2. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Every direct child block inside a <section> gets the "fade-in" class,
   then IntersectionObserver adds "in-view" once it scrolls into the
   viewport, which triggers the CSS transition in style.css.
   ========================================================================== */
const animatedElements = document.querySelectorAll("section .wrap > *");

animatedElements.forEach((el) => el.classList.add("fade-in"));

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        fadeObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 } // trigger when 15% of the element is visible
);

animatedElements.forEach((el) => fadeObserver.observe(el));

/* ==========================================================================
   3. ACTIVE NAV LINK HIGHLIGHT
   Highlights the nav link matching whichever section is currently
   in view as the user scrolls.
   ========================================================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // "active" zone near the middle of the screen
);

sections.forEach((section) => navObserver.observe(section));

/* ==========================================================================
   4. BACK TO TOP BUTTON
   Shows the button after scrolling down 500px, hides it near the top,
   and scrolls smoothly to the top when clicked.
   ========================================================================== */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});