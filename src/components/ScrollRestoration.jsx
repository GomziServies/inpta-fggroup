import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollRestoration() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({
      top: document.body.scrollHeight / 4,
      behavior: "instant",
    });
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 700);
  }, [location]);
}

export default ScrollRestoration;
