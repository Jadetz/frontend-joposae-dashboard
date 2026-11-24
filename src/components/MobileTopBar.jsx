import logo from "../assets/logo.png";

// Amber bar at the top of every signed-in page below 1024 px, with the button that opens the menu.
function MobileTopBar({ menuOpen, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-brand-gradient px-4 py-2.5 text-navy lg:hidden">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="" className="size-8.5 drop-shadow-sm" />
        <span className="text-base font-extrabold tracking-tight">JopoSae</span>
      </div>
      <button
        type="button"
        aria-label="Buka menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={onOpenMenu}
        className="flex size-11 items-center justify-center rounded-xl bg-white hover:bg-sunken"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="size-5"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </header>
  );
}

export default MobileTopBar;
