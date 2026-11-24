import logo from "../assets/logo.png";

// Logo and product name on the amber background.
// Login: grows from phone size to desktop size at xl. Sidebar (compact): stays small.
function BrandMark({ compact }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt=""
        className={`drop-shadow-sm ${compact ? "size-10.5" : "size-10 xl:size-14"}`}
      />
      <div className="flex flex-col gap-0.5">
        <span
          className={`font-extrabold tracking-tight text-navy ${compact ? "text-base" : "text-lg xl:text-xl"}`}
        >
          JopoSae
        </span>
        <span className="text-xs font-medium text-on-brand-muted">
          Dashboard chatbot
        </span>
      </div>
    </div>
  );
}

export default BrandMark;
