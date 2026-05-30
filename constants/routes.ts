export const WELCOME = "/welcome" as const;
export const ONBOARDING = "/onboarding" as const;
export const ONBOARDING_HABITS = "/onboarding/habits" as const;
export const ONBOARDING_INSIGHTS = "/onboarding/insights" as const;
export const SIGN_IN = "/(auth)/sign-in" as const;
export const SIGN_UP = "/(auth)/sign-up" as const;
export const FORGOT_PASSWORD = "/(auth)/forgot-password" as const;
export const CHECK_MAIL = "/(auth)/check-mail" as const;
export const VERIFICATION_CODE = "/(auth)/verification-code" as const;
export const HOME = "/(tabs)/home" as const;

export const routes = {
  WELCOME,
  ONBOARDING,
  ONBOARDING_HABITS,
  ONBOARDING_INSIGHTS,
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
  CHECK_MAIL,
  VERIFICATION_CODE,
  HOME,
} as const;
