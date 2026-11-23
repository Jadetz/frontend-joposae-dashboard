// Reads the email inside a Google credential (a JWT), for display only.
// Not verified here: the API checks the token. Returns null if it cannot be read.
export function readCredentialEmail(credential) {
  try {
    const payload = credential.split(".")[1];
    const base64 = payload.replaceAll("-", "+").replaceAll("_", "/");
    const { email } = JSON.parse(atob(base64));
    return typeof email === "string" ? email : null;
  } catch {
    return null;
  }
}
