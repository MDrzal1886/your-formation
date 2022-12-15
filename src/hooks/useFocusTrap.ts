const useFocusTrap = (
  elementToTrap: HTMLElement,
  hamburgerButton?: HTMLElement | null
) => {
  const focusableElements = elementToTrap.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex = "0"]'
  ) as NodeListOf<HTMLElement>;

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const keydownCallback = (e: KeyboardEvent) => {
    const isTabPressed = e.key === 'Tab' || e.key === '9';

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        if (hamburgerButton) {
          hamburgerButton.focus();
          e.preventDefault();
          return;
        }

        lastFocusableElement.focus();
        e.preventDefault();
        return;
      }

      if (document.activeElement === hamburgerButton) {
        lastFocusableElement.focus();
        e.preventDefault();
        return;
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        if (hamburgerButton) {
          hamburgerButton.focus();
          e.preventDefault();
          return;
        }

        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  return {
    keydownCallback
  };
};

export default useFocusTrap;
