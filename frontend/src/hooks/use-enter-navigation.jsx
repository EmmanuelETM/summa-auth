import { useCallback } from "react";
import { useEffect } from "react";

function useEnterNavigation(formSelector) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (event.target.type == "text") event.preventDefault();
        const form = document.querySelector(formSelector);
        const focusableElements = Array.from(
          form.querySelectorAll("input, button, select, textarea")
        ).filter((el) => !el.disabled);

        const currentIndex = focusableElements.indexOf(event.target);
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex]?.focus();
      }
    },
    [formSelector]
  );

  useEffect(() => {
    const form = document.querySelector(formSelector);
    form.addEventListener("keydown", handleKeyDown);
    return () => form.removeEventListener("keydown", handleKeyDown);
  }, [formSelector, handleKeyDown]);

  return null;
}

export default useEnterNavigation;
