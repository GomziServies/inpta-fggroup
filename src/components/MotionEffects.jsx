import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { installSmoothScroll } from "../js/smooth-scroll";

const EXIT_DELAY = 200;

// elements that fade / slide in when they scroll into view
const REVEAL_SELECTOR = [
  "[data-aos]",
  ".wow",
  ".tp-section-header",
  ".section-title",
  "section .row > [class*='col-']",
].join(",");

// never animate these (fixed UI, carousels, form fields, hero which has its own intro)
const REVEAL_SKIP = [
  ".footer",
  ".main",
  ".side",
  ".modal",
  "form",
  ".slick-slider",
  ".owl-carousel",
  ".tp-hero-section",
  ".Toastify",
].join(",");

/**
 * Global motion helpers (no visible markup):
 *  1. internal link clicks fade the current page out, then navigate,
 *     the next page fades in (see .page-transition in theme.css)
 *  2. sections and cards reveal smoothly while scrolling
 *
 * Scrolling glides through js/smooth-scroll.js, so it also works when the OS or
 * browser has native smooth scrolling switched off. Users who turned animations off
 * in their OS keep the fades; theme.css removes the slide / lift movement for them.
 */
function MotionEffects() {
  const navigate = useNavigate();
  const location = useLocation();

  // every "behavior: smooth" scroll in the app runs through our own animation
  useEffect(() => installSmoothScroll(), []);

  // page is ready again after every navigation
  useEffect(() => {
    document.documentElement.classList.remove("page-leaving");
  }, [location.pathname, location.search]);

  // 1. smooth exit before redirect
  useEffect(() => {
    let timer;
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      if (link.dataset.bsToggle || link.dataset.bsDismiss) return;

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const samePage =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (samePage) {
        // "#section" links glide down to the section (other handlers on the link still run)
        if (url.hash.length > 1) {
          const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
          }
        }
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      document.documentElement.classList.add("page-leaving");
      clearTimeout(timer);
      timer = setTimeout(() => {
        navigate(url.pathname + url.search + url.hash);
      }, EXIT_DELAY);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(timer);
    };
  }, [navigate]);

  // 2. reveal on scroll
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          requestAnimationFrame(() => {
            el.classList.add("in-view");
            // hand the element back to its own css once the animation is done
            const delay = parseInt(el.style.getPropertyValue("--reveal-delay"), 10) || 0;
            setTimeout(() => {
              el.classList.remove("reveal", "in-view");
              el.style.removeProperty("--reveal-delay");
            }, delay + 900);
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    const scan = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset.reveal) return;
        if (el.closest(REVEAL_SKIP)) return;
        // animate only the outermost element of a group
        if (el.parentElement && el.parentElement.closest("[data-reveal]")) return;

        el.dataset.reveal = "1";
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 80}ms`);
        el.classList.add("reveal");
        io.observe(el);
      });
    };

    let debounce;
    const mo = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(scan, 120);
    });
    mo.observe(document.getElementById("root") || document.body, {
      childList: true,
      subtree: true,
    });
    scan();

    return () => {
      mo.disconnect();
      io.disconnect();
      clearTimeout(debounce);
      // start clean if the effect runs again (React StrictMode mounts twice)
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        delete el.dataset.reveal;
        el.classList.remove("reveal", "in-view");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}

export default MotionEffects;
