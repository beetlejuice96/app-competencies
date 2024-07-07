import { start } from "repl";

export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    callback: {
      implicit: "/auth/callback",
      pkce: "/auth/callback",
    },
  },
  platform: {
    start: "/platform",
  },
};
