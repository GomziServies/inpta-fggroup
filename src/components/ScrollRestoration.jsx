import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollRestoration() {
  const location = useLocation();
  const previousPath = useRef(location.pathname + location.search);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const pathChanged = previousPath.current !== currentPath;
    previousPath.current = currentPath;

    // in-page links such as "#apply-now" must scroll to their section,
    // not jump back to the top of the page
    if (location.hash && location.hash.length > 1) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      const timer = setTimeout(
        () => {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        },
        pathChanged || isFirstRender.current ? 400 : 0
      );
      isFirstRender.current = false;
      return () => clearTimeout(timer);
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // same page, hash removed (e.g. back-to-top "#"): leave the scroll alone
    if (!pathChanged) {
      return;
    }

    // the new page fades in, so start it from the top right away
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
}

export default ScrollRestoration;
