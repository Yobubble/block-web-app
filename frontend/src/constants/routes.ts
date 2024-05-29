export enum routes {
  "ROOT" = "/",
  "SIGN_IN" = "/sign-in",
  "SIGN_UP"= "/sign-up",
  "FORGOT_PASSWORD" = "/forgot-password",
  "CHECK_YOUR_EMAIL" = "/check-your-email",
  "SET_NEW_PASSWORD" = "/set-new-password",
}

export function isRoute(url:string): boolean {
  if (url !== routes.ROOT && url !== routes.CHECK_YOUR_EMAIL && url !== routes.FORGOT_PASSWORD && routes.SET_NEW_PASSWORD && routes.SIGN_IN && url !== routes.SIGN_UP) {
    return false
  }
  return true
}