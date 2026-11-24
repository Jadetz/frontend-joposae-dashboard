import { useEffect, useRef } from "react";
import BrandMark from "./BrandMark.jsx";
import { SidebarMenu, UserCard } from "./Sidebar.jsx";

// Slide-in menu below 1024 px. A native <dialog> opened with showModal() gives the dark layer,
// Esc to close, focus kept inside, and focus back on the menu button when it closes.
function MobileMenu({ open, onClose }) {
  const dialogRef = useRef(null);

  // Open and close the dialog when "open" changes. Lock the page behind it while it is open.
  useEffect(() => {
    if (!open) {
      return;
    }
    const dialog = dialogRef.current;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close when the screen grows to 1024 px, or wider, where the desktop side bar takes over.
  useEffect(() => {
    if (!open) {
      return;
    }
    const wide = window.matchMedia("(min-width: 64rem)");
    function handleChange(event) {
      if (event.matches) {
        onClose();
      }
    }
    wide.addEventListener("change", handleChange);
    return () => wide.removeEventListener("change", handleChange);
  }, [open, onClose]);

  // The panel fills the dialog, so a click whose target is the dialog itself landed on the dark layer.
  function handleClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label="Menu navigasi"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-76 max-w-[80vw] rounded-r-2xl bg-brand-gradient p-0 text-navy shadow-xl shadow-navy/16 transition-transform duration-200 backdrop:bg-navy/45 starting:open:-translate-x-full motion-reduce:transition-none"
      onClick={handleClick}
    >
      <div className="flex h-full flex-col gap-5 overflow-y-auto px-3 pt-2.5 pb-4.5">
        <div className="flex items-center justify-between gap-2.5 pl-1">
          <BrandMark compact />
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white hover:bg-sunken"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="size-5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <SidebarMenu touch onNavigate={onClose} />
        <UserCard />
      </div>
    </dialog>
  );
}

export default MobileMenu;
