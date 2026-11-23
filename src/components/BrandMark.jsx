import logo from "../assets/logo.png";

// Logo and product name on the amber background. Grows from phone size to desktop size at xl.
function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="" className="size-10 drop-shadow-sm xl:size-14" />
      <div className="flex flex-col gap-0.5">
        <span className="text-lg font-extrabold tracking-tight text-navy xl:text-xl">
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
