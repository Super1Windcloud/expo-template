# Create Expo Stack Template

Modern Expo starter scaffolded for full-stack, multi-platform apps. It ships with Expo Router, typed tooling, shadcn-inspired primitives, Tailwind + NativeWind styling, Supabase utilities, and bilingual (English/Chinese) translations out of the box.

## Tech Stack
- Expo SDK 54 with Expo Router 6
- React Native 0.81 & React 19
- TypeScript (strict), ESLint, Prettier, Husky
- NativeWind + Tailwind CSS 3, `tailwindcss-animate`, theming via CSS variables
- shadcn/ui primitives from `@rn-primitives`
- i18n with `i18next`, `react-i18next`, `expo-localization`
- Supabase client wrapper (AsyncStorage session persistence)
- Lucide icon set for React Native

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20 LTS recommended)
- npm 9+ (ships with Node). You can substitute `pnpm` or `yarn`, but npm scripts are provided.
- Expo tooling: `npm install -g expo-cli` (optional but handy)
- Android Studio / Xcode for native emulators, or Expo Go on devices

### Install dependencies
```bash
npm install
```

### Configure environment variables
Copy `.env.example` (if present) or create `.env` and add your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
These are required at runtime; the Supabase client throws early if they are missing.

### Run the app
```bash
npm start       # Expo CLI (press i / a / w for iOS / Android / web)
npm run ios     # Shortcut: expo start --ios
npm run android # Shortcut: expo start --android
npm run web     # Shortcut: expo start --web
```
Metro is configured with `inlineRem: 16`; use `npm start -- --clear` if you change Metro settings and need to reset caches.

## Scripts
- `npm run typecheck` – TypeScript project check (`tsc --noEmit`)
- `npm run lint` – ESLint + Prettier consistency check
- `npm run format` – Apply ESLint fixes and Prettier formatting
- `npm run align` – `expo install --fix` to reconcile native dependencies
- `npm run prebuild` – Prepare native projects
- `npm run shadcn` – Invoke `@react-native-reusables/cli` for additional UI components
- `npm run taze` – Upgrade dependencies (skips Tailwind to stay on v3 for NativeWind compatibility)

## Project Structure Highlights
- `app/` – Expo Router routes (`_layout.tsx`, `index.tsx`, etc.), already wired to the theme provider and `PortalHost`.
- `components/` – Shared UI components, including shadcn-inspired primitives in `components/ui/`.
- `components/theme.tsx` – Syncs status bar and system background; toggles the `dark` class on web.
- `lib/utils.ts` – `cn` helper combining `clsx` + `tailwind-merge`.
- `locales/` – JSON translation catalogs (`en`, `zh`) and i18n initializer.
- `global.css` – Tailwind layers plus CSS variable theme tokens (light/dark).
- `tailwind.config.js` – Tailwind/NativeWind configuration (colors, radius, animations).
- `utils/supabase.ts` – Supabase client configured with AsyncStorage persistence.

## Internationalization
- Language detection reads system locale via `expo-localization`, normalizes to `en` or `zh`.
- Add new languages by creating `locales/<lang>.json` and extending `resources` in `locales/index.ts`.
- Use the `useTranslation` hook from `react-i18next` (`const { t } = useTranslation()`).

## Styling & UI
- Tailwind utilities are available via NativeWind class names (`className` on React Native views).
- Theme tokens pull from CSS variables; adjust hues in `global.css`.
- shadcn components expect `cn` from `@/lib/utils`; keep that helper updated if you extend merging behavior.
- Portal-based components (dialogs, hover cards, etc.) rely on `<PortalHost />` in `app/_layout.tsx`.

## Supabase Integration
- Requires `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- Auth sessions persist in `AsyncStorage` and auto-refresh by default.
- Extend the client or wrap queries inside your state/store as needed.

## Troubleshooting
- **Metro cannot resolve `react-native-css-interop`** → ensure `npm install` ran after pulling. The dependency is pinned at the project root.
- **Tailwind peer warnings** → Template intentionally uses Tailwind 3.x to match NativeWind’s current interop layer.
- **Missing environment variables** → Supabase client throws during import; double-check your `.env`.
- **shadcn diagnostics** → Confirm `global.css`, `tailwind.config.js`, and `app/_layout.tsx` match the docs (already configured here).

## Conventions & Next Steps
- Keep translations mirrored between `en.json` and `zh.json`.
- When adding new UI primitives via `npm run shadcn`, follow up with type validations (`npm run typecheck`).
- Consider wiring in React Query, Sentry, expo-notifications, etc., depending on product needs.

Happy building!
