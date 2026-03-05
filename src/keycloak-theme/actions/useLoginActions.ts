/**
 * Login actions: form submits to Keycloak via native form POST (url.loginAction).
 * No extra client-side action needed; Keycloak handles auth.
 */
export function useLoginActions() {
  return { submit: () => {} };
}
