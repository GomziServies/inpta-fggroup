/**
 * Smooth scrolling that does not depend on the browser / OS.
 *
 * Chrome turns native smooth scrolling off when Windows "Show animations" is off,
 * which made every `behavior: "smooth"` call and every "#section" link jump
 * instantly. This animates the scroll position itself (requestAnimationFrame),
 * and patches window.scrollTo / Element.scrollIntoView so that every existing
 * `behavior: "smooth"` call in the app uses it.
 */

let frame = null;
let stopListeners = null;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const maxScrollY = () =>
  Math.max(
    0,
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
      window.innerHeight
  );

export function cancelSmoothScroll() {
  if (frame) cancelAnimationFrame(frame);
  frame = null;
  if (stopListeners) stopListeners();
  stopListeners = null;
}

export function installSmoothScroll() {
  const nativeScrollTo = window.scrollTo;
  const nativeScrollIntoView = Element.prototype.scrollIntoView;

  const jump = (top) =>
    nativeScrollTo.call(window, { top, left: 0, behavior: "instant" });

  // getTargetY is re-read on every frame, so images loading or sections revealing
  // while we scroll cannot make the animation stop short of the target
  function animateTo(getTargetY) {
    cancelSmoothScroll();

    const clampY = (y) => Math.min(Math.max(0, y), maxScrollY());
    const from = window.scrollY;
    const firstDistance = clampY(getTargetY()) - from;
    if (Math.abs(firstDistance) < 2) return;

    const duration = Math.min(1200, Math.max(550, 450 + Math.abs(firstDistance) * 0.18));
    const start = performance.now();

    // the user taking over (wheel, touch, keys) stops the animation
    const stop = () => cancelSmoothScroll();
    const keys = (e) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
        stop();
      }
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", keys);
    stopListeners = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", keys);
    };

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const to = clampY(getTargetY());
      jump(from + (to - from) * easeInOutCubic(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        cancelSmoothScroll();
      }
    };
    frame = requestAnimationFrame(step);
  }

  window.scrollTo = function scrollTo(x, y) {
    if (x && typeof x === "object") {
      if (x.behavior === "smooth") {
        const top = typeof x.top === "number" ? x.top : window.scrollY;
        animateTo(() => top);
        return;
      }
      cancelSmoothScroll();
      return nativeScrollTo.call(window, x);
    }
    cancelSmoothScroll();
    return nativeScrollTo.call(window, x, y);
  };

  Element.prototype.scrollIntoView = function scrollIntoView(arg) {
    if (arg && typeof arg === "object" && arg.behavior === "smooth") {
      const el = this;
      animateTo(() => {
        const rect = el.getBoundingClientRect();
        const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        if (arg.block === "center") {
          return window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
        }
        if (arg.block === "end") {
          return window.scrollY + rect.bottom - window.innerHeight;
        }
        return window.scrollY + rect.top - marginTop;
      });
      return undefined;
    }
    cancelSmoothScroll();
    return nativeScrollIntoView.apply(this, arguments);
  };

  return () => {
    cancelSmoothScroll();
    window.scrollTo = nativeScrollTo;
    Element.prototype.scrollIntoView = nativeScrollIntoView;
  };
}
