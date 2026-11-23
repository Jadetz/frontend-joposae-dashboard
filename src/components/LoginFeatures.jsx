import { LOGIN_FEATURES } from "../lib/loginFeatures.js";

// Desktop: white cards in a zigzag (left, right, left).
export function FeatureCards() {
  return (
    <ul className="mt-7 flex flex-col gap-3.5">
      {LOGIN_FEATURES.map((feature, index) => (
        <li
          key={feature.title}
          className={`flex w-full max-w-83 items-center gap-3.5 rounded-xl border border-line border-b-line-strong bg-card py-2.5 pr-3.5 pl-3 shadow-card ${
            index % 2 === 1 ? "self-end" : "self-start"
          }`}
        >
          <img src={feature.icon} alt="" className="w-15.75 shrink-0" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-bold text-heading">
              {feature.title}
            </span>
            <span className="text-xs leading-snug text-muted">
              {feature.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Phone: three small tiles in one row.
export function FeatureTiles() {
  return (
    <ul aria-label="Isi dashboard" className="grid grid-cols-3 gap-2 xl:hidden">
      {LOGIN_FEATURES.map((feature) => (
        <li
          key={feature.title}
          className="flex flex-col items-center gap-2 rounded-xl border border-warning-line bg-warning-banner px-1.5 py-3 text-center"
        >
          <img src={feature.icon} alt="" className="w-11.25" />
          <span className="text-xs leading-snug font-bold text-heading">
            {feature.shortLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}
