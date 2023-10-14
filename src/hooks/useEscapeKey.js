import React from "react";

export function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}
