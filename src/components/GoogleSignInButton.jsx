import { useEffect, useEffectEvent, useRef } from "react";
import { loadGoogleIdentity } from "../lib/googleIdentity.js";

// Google's own sign-in button. Google draws it inside an iframe, so CSS cannot restyle it.
function GoogleSignInButton({ clientId, onCredential, onLoadError }) {
  const containerRef = useRef(null);
  const handleCredential = useEffectEvent((response) => {
    onCredential(response.credential);
  });
  const handleLoadError = useEffectEvent(() => {
    onLoadError();
  });

  useEffect(() => {
    const container = containerRef.current;
    let cancelled = false;

    loadGoogleIdentity()
      .then((google) => {
        if (cancelled) {
          return;
        }
        google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleCredential(response),
        });
        google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text: "signin_with",
          locale: "id",
          // 348 px fits both the phone sheet and the desktop card,
          // so switching layouts after the button is drawn never overflows.
          width: Math.min(348, container.clientWidth),
        });
      })
      .catch(() => {
        if (!cancelled) {
          handleLoadError();
        }
      });

    return () => {
      cancelled = true;
      // StrictMode runs this effect twice in dev; emptying the box prevents a second button.
      container.replaceChildren();
    };
  }, [clientId]);

  return <div ref={containerRef} className="flex min-h-11 justify-center" />;
}

export default GoogleSignInButton;
