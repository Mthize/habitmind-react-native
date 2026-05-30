# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## HabitMind Architecture Rules

- This is an Expo Router app.
- Route screens must live in `app/`.
- Reusable components live in `components/`.
- Use Zustand for app state.
- Use AsyncStorage for persisted onboarding and auth-flow state.
- Clerk auth in this project uses `@clerk/clerk-expo`. Do not switch to `@clerk/expo`.
- Do not use Next.js Clerk components.
- Gemini will be used later for habit and mood insights.
- AI-powered insights must be behind a paywall.
- Do not implement Gemini API calls until paywall rules are defined.
- Do not expose API keys in client code.
- Approved assets must come from `assets/illustrations/`.
- Do not use random generated images or remote images.
- Sign Out belongs in Profile or Settings, not onboarding.
- Sign-in and sign-up screens should stay clean form-first screens without illustration badges.
- Email illustration assets are only for forgot-password, check-mail, and verification-code screens.
- Keep HabitMind design monochrome: black, white, and soft gray.
- Do not mutate imported objects or config objects.
- Avoid reintroducing `Cannot assign to read-only property 'NONE'`.
- Avoid reintroducing `private properties are not supported`.
