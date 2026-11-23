import mascotApologizing from "../assets/mascot/mascot-apologizing.svg";
import mascotPocketWatch from "../assets/mascot/mascot-pocket-watch.svg";
import mascotWaving from "../assets/mascot/mascot-waving.svg";
import BrandMark from "./BrandMark.jsx";
import { FeatureCards } from "./LoginFeatures.jsx";

// One pose and one speech bubble for each mood of the login card.
const MASCOTS = {
  waving: {
    image: mascotWaving,
    message: "Sugeng rawuh! Monggo, silakan masuk.",
  },
  apologizing: {
    image: mascotApologizing,
    message: "Nyuwun sewu, coba akun yang lain nggih.",
  },
  pocketWatch: {
    image: mascotPocketWatch,
    message: "Wah, sesinya sudah habis. Monggo masuk lagi.",
  },
};

// Amber area with Mas Jopo. Phone: a header above the white sheet. Desktop (xl): the left half.
function LoginPanel({ mood }) {
  const mascot = MASCOTS[mood];

  return (
    <section
      aria-label="Tentang dashboard"
      className="mx-auto flex w-full max-w-120 flex-col gap-3 px-5 pt-5 pb-6 text-navy xl:mx-0 xl:max-w-none xl:grow xl:basis-140 xl:justify-between xl:gap-8 xl:overflow-hidden xl:border-r xl:border-navy/8 xl:bg-brand xl:px-13 xl:pt-12 xl:pb-10"
    >
      <BrandMark />

      <div className="flex items-center gap-6">
        <div className="hidden min-w-0 flex-1 flex-col xl:flex">
          <span className="text-xs font-bold tracking-widest text-on-brand-muted uppercase">
            Khusus admin terdaftar
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight">
            Dashboard pemantau chatbot JopoSae.
          </h2>
          <FeatureCards />
        </div>

        <div className="flex flex-1 items-start justify-center gap-1 xl:flex-none xl:flex-col-reverse xl:items-center xl:gap-3">
          <div className="relative w-35 shrink-0 xl:w-57.5">
            <span
              aria-hidden="true"
              className="absolute bottom-5.5 left-1 size-33 rounded-full bg-white/32 ring-1 ring-white/50 ring-inset xl:bottom-8 xl:left-0 xl:size-57.5"
            />
            <img src={mascot.image} alt="" className="relative w-full" />
          </div>
          <p className="relative mt-7.5 max-w-42.5 rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm leading-snug font-bold text-heading shadow-card xl:mt-0 xl:max-w-55">
            {mascot.message}
            <span
              aria-hidden="true"
              className="absolute top-4.5 -left-1.75 size-3 rotate-45 border-b border-l border-line bg-card xl:top-auto xl:-bottom-1.75 xl:left-1/2 xl:-ml-1.5 xl:border-r xl:border-l-0"
            />
          </p>
        </div>
      </div>

      <p className="hidden text-xs font-medium text-on-brand-muted xl:block">
        Semua jam di dashboard memakai WIB.
      </p>
    </section>
  );
}

export default LoginPanel;
