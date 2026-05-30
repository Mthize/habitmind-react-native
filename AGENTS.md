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

## Illustration Background Rules

Add a permanent image/background rule to AGENTS.md.

Problem:
Some illustration assets have their own off-white PNG background. When they are placed inside a card or screen with a different background color, they look separated, like a pasted square inside the UI.

Permanent rule:
Whenever using an illustration asset, the UI must make the image background blend with the surrounding container.

Rules:
1. Always check if the illustration PNG has a visible background.
2. If the image has a visible off-white/white background, match the parent container background to the image background.
3. Do not place an illustration inside multiple nested containers with different background colors.
4. Do not create a square-on-square or rectangle-inside-card look.
5. Do not use random background colors behind illustrations.
6. Do not use remote or unapproved images.
7. Approved illustrations must come from assets/illustrations/.
8. If an image still looks separated, change the container background, remove the extra wrapper, or use a transparent version of the asset.

Recommended implementation:
- Use one illustration container only.
- Container background should usually be "#FAFAF8" or "#FFFFFF", depending on the image.
- Image style should use:
  resizeMode: "contain"
  backgroundColor: "transparent"

For large illustration cards:
- Avoid adding an inner View around the image.
- Avoid different background colors between:
  screen background
  card background
  image background

For circular welcome images:
- Use a circular container only.
- Do not place a rectangular image card inside the circle.

For auth illustration screens:
- Email assets should appear integrated into the screen/card.
- If the PNG has a card-like background already, do not wrap it in another card with a different background.

Before completing any screen with an illustration, visually verify:
- no visible square image background
- no mismatched white/off-white rectangle
- no image floating above the UI
- image feels like part of the same surface
