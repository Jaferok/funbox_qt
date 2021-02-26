import { useState, useEffect } from "react";

const useDetectOutsideClick = (el, initialState) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setOpen(!open);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (open) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [open, el]);
  return [open, setOpen];
};

export default useDetectOutsideClick;
