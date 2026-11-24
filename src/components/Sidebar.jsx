import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext.js";
import { NAV_GROUPS } from "../lib/navigation.js";
import BrandMark from "./BrandMark.jsx";

// Label under the admin's name on the user card.
const ROLE_LABELS = {
  owner: "Owner",
  engineer: "Engineer",
};

// One menu row: a link when the page exists, a dimmed row with its stage when it does not.
// touch: the phone menu, with taller rows, larger text, and a hover color.
function NavItem({ item, touch, onNavigate }) {
  const size = touch ? "min-h-12 px-3.5 text-base" : "min-h-11 px-3 text-sm";
  const hover = touch ? "hover:bg-white/35" : "";
  if (!item.to) {
    return (
      <span
        aria-disabled="true"
        className={`flex cursor-not-allowed flex-col justify-center rounded-xl py-1.5 text-on-brand-muted ${size}`}
      >
        <span className="font-medium">{item.label}</span>
        <span className="text-xs">Menyusul di tahap {item.stage}</span>
      </span>
    );
  }
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center rounded-xl ${size} ${
          isActive
            ? "bg-white font-bold text-navy"
            : `font-medium text-on-brand ${hover}`
        }`
      }
    >
      {item.label}
    </NavLink>
  );
}

// Menu groups, shared by the desktop sidebar and the phone menu.
export function SidebarMenu({ touch, onNavigate }) {
  const { admin } = useAuth();
  const isOwner = admin.role === "owner";
  const groups = NAV_GROUPS.filter((group) => isOwner || !group.ownerOnly);
  return (
    <nav aria-label="Menu" className="flex flex-col gap-5.5">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <span className="px-3 text-xs font-bold tracking-widest text-on-brand-muted uppercase">
            {group.label}
          </span>
          <ul className="flex flex-col gap-0.75">
            {group.items.map((item) => (
              <li key={item.label}>
                <NavItem item={item} touch={touch} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// The signed-in admin and logout, shared by the desktop sidebar and the phone menu.
export function UserCard() {
  const { admin, logout } = useAuth();
  // Google does not always send a name, so the email is the fallback.
  const displayName = admin.name ?? admin.email;
  return (
    <div className="mt-auto flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5 rounded-xl border border-navy/14 bg-navy/8 p-3">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-extrabold ring-1 ring-navy/12 ring-inset"
        >
          {displayName.charAt(0).toUpperCase()}
        </span>
        <div className="flex min-w-0 flex-col gap-px">
          <span className="truncate text-sm font-bold">{displayName}</span>
          <span className="text-xs text-on-brand-muted">
            {ROLE_LABELS[admin.role]}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={logout}
        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line-strong bg-white px-4 text-sm font-semibold text-navy hover:bg-sunken"
      >
        Keluar
      </button>
    </div>
  );
}

// Amber column of every signed-in page from 1024 px up. Narrower screens use MobileTopBar and MobileMenu.
function Sidebar() {
  return (
    <aside
      aria-label="Navigasi"
      className="sticky top-0 hidden h-dvh min-w-0 grow basis-60 flex-col gap-7 overflow-y-auto bg-brand-gradient px-3.5 py-6 text-navy lg:flex"
    >
      <div className="px-2">
        <BrandMark compact />
      </div>
      <SidebarMenu />
      <UserCard />
    </aside>
  );
}

export default Sidebar;
