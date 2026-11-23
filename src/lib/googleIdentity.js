const GIS_SCRIPT_URL = "https://accounts.google.com/gsi/client";

// Shared by every caller, so the script tag is added only once.
let loading = null;

// Loads Google Identity Services and resolves with window.google.
// A failed load is forgotten, so the next call tries again.
export function loadGoogleIdentity() {
  if (loading === null) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = GIS_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve(window.google);
      script.onerror = () => {
        loading = null;
        script.remove();
        reject(new Error("Google Identity Services failed to load."));
      };
      document.head.append(script);
    });
  }
  return loading;
}
