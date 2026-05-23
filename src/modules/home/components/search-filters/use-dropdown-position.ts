import { RefObject } from "react";

export function useDropdownPostion(
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
) {
  function getDropdownPostion() {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    // Calculate the initail postion
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdwon would go off the right edge of the viewport

    if (left + dropdownWidth > window.innerWidth) {
      // Align to right edge of button instead
      left = rect.right + window.scrollX - dropdownWidth;

      // If still off-screen, align to right edge of the view port with some paddding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    // Ensure dropdown doesn't go off the left edge of the viewport
    if (left < 0) {
      left = 16; // Add some padding from the edge
    }

    return { top, left };
  }

  return { getDropdownPostion };
}
