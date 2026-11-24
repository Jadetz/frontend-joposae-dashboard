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
function NavItem({ item }) {
  if (!item.to) {
    return (
      <span
        aria-disabled="true"
        className="cursor-not-allowed text-on-brand-muted flex min-h-11 flex-col justify-center rounded-xl px-3 py-1.5"
      >
        <span className="text-sm font-medium">{item.label}</span>
        <span className="text-xs">Menyusul di tahap {item.stage}</span>
      </span>
    );
  }
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex min-h-11 items-center rounded-xl px-3 text-sm ${
          isActive
            ? "bg-white font-bold text-navy"
            : "font-medium text-on-brand"
        }`
      }
    >
      {item.label}
    </NavLink>
  );
}

// Amber column of every signed-in page: brand, menu groups, the signed-in admin, and Keluar.
function Sidebar() {
  const { admin, logout } = useAuth();
  const isOwner = admin.role === "owner";
  const groups = NAV_GROUPS.filter((group) => isOwner || !group.ownerOnly);
  // Google does not always send a name, so the email is the fallback.
  const displayName = admin.name ?? admin.email;
  return (
    <aside
      aria-label="Navigasi"
      className="flex min-w-0 grow basis-60 flex-col gap-7 bg-brand-gradient px-3.5 py-6 text-navy"
    >
      <div className="px-2">
        <BrandMark compact />
      </div>
      <nav aria-label="Menu" className="flex flex-col gap-5.5">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1.5">
            <span className="px-3 text-xs font-bold tracking-widest text-on-brand-muted uppercase">
              {group.label}
            </span>
            <ul className="flex flex-col gap-0.75">
              {group.items.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
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
    </aside>
  );
}

export default Sidebar;
