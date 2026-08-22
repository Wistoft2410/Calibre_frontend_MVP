# Changelog

## 2026-08-22 — PHP backend retired, Supabase migration

The app was built against a PHP REST API at `human-interface.dk/calibre/` which is
permanently offline. Every live feature now runs on Supabase instead. The full
pre-migration survey of the old API — every call site, response shape and
dependency — is in [BACKEND_AUDIT.md](BACKEND_AUDIT.md).

### Auth

- `App.js` — `signIn`, `signUP`, `signOut` and `signInApple` now call
  `supabase.auth.*` instead of `signin.php` / `register.php` / `appleSignIn.php`.
- `utils/reducer.js` — reduced to a single `RESTORE_SESSION` action driven by
  Supabase's `onAuthStateChange`; session restore uses `getSession()`.
- `utils/tokenHelper.js` — **deleted**. The old scheme stored the user's raw
  email in AsyncStorage under `@user_Token` and resent it as an identifier on
  every request; it was never a real credential. Supabase persists a proper
  session itself via the AsyncStorage adapter in `utils/supabase.js`.
- `screens/Start.js` — Apple sign-in passes the real `identityToken` to
  `signInWithIdToken`.
- `screens/flows/newSignUpFlow/email.js` — dropped the `register.php`
  availability check. Supabase deliberately offers no "does this email exist"
  lookup (user-enumeration protection), so duplicates are caught at sign-up.

### Profiles, Discover People

- `supabase/profiles_setup.sql` — `profiles` table, RLS, a trigger that creates
  a profile row on every sign-up from the auth metadata, a backfill for existing
  users, and 8 seeded demo profiles.
- `utils/profileService.js` — `getOwnProfile()` and `listDiscoverProfiles()`.
- `components/Menu.js` — profile loads from Supabase; removed the dead PHP calls
  and the 2-second polling loop that ran behind every screen.
- `screens/Feed.js` — Discover People shows real profiles: photo, live-computed
  age, interest badges, city, description.
- `components/swipe/SwipeDeck.js` — Tinder-style deck. Drag to rotate and throw,
  spring-back under threshold, two cards visible behind the active one. The
  footer ✕ / i / ✓ buttons drive it through a ref.
- `utils/profileTheme.js` — each card gets its own colour, assigned by deck
  position rather than by hashing the profile id. Hashing collided on the real
  data and put *adjacent* cards in the same colour, which reads as a bug
  mid-swipe.

### Passion picker

- `screens/flows/newSignUpFlow/Interest.js` — rebuilt as an Apple Watch-style
  honeycomb (`components/honeycomb/`): pannable, pinch-zoomable, fisheye scaling,
  search filter and a picks panel. Replaced a screen that fetched from the dead
  `things.php`.
- `utils/passions.js` — single source of truth for passions, shared by the
  picker, profile cards and map filters. Now 26 entries.

### Meetup map

- `screens/flows/meetUpMap/Map.js` — rebuilt as a real full-screen map. It was
  previously constrained to a fixed size with `zIndex: -1`, which made it read as
  an overlay. Now `absoluteFill` with scroll, zoom, rotate and pitch enabled.
- Dark header panel: "Search in Calibre" plus an expanding passion filter.
  Filters list only passions some partner actually offers, so there are no pills
  that blank the map. Search matches name or category.
- Markers: emoji pins when zoomed out, full cards when closer. The threshold
  (`latitudeDelta` 0.025) is derived from real partner spacing — a card covers
  ~330m of ground and the closest pair (Limitless VR / Paludan Bogcafe) is 232m
  apart, so cards do not collide.
- Opens framed to fit all partners via `fitToCoordinates`, since they span from
  Gentofte to Christiania and no fixed zoom shows them all.
- `screens/flows/meetUpMap/VenueDetail.js` — full partner page: photo, price
  meter, rating meter, interest pills, description, and tappable address, phone
  and website.

### Partner venues (backend-driven)

- `supabase/venues_setup.sql` — `venues` table, RLS, and the 20 partners from
  the "Small experience businesses in Copenhagen" source document. Addresses were
  geocoded via the Google Geocoding API; **17 of 20 have coordinates**, the other
  three (Smykbar, Creative Space, Sort Kaffe & Vinyl) have no address in the
  source and are stored without one. Adding an address makes them appear — no
  code change needed.
- `supabase/venues_details.sql` — photo, description, phone, website, rating and
  Google place id for all 17, pulled from Google Places.
- `utils/venueService.js` — `listMapVenues()`, filtering to partners that have
  coordinates.
- `partner_status` mirrors the source document's status dictionary:
  `not_contacted` / `interview_agreed` / `in_progress` / `committed`.

### Google Places

- The API key hardcoded in four files belonged to a Google Cloud project nobody
  on the team can access, so city search had been failing with `REQUEST_DENIED`.
  Replaced with the `calibre-mvp` project's key and moved to
  `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`. No key literal remains in source.
- `components/places-input/index.js` — checks Google's `status` before using a
  response (it previously passed error payloads straight to `onSelect`, which
  crashed the city screen), URL-encodes all parameters, and sends the
  `X-Ios-Bundle-Identifier` header the restricted key requires.
- Google's photo endpoint enforces the same restriction, so `VenueDetail` passes
  that header on the image request. Without it the endpoint returns 403.

### Bugs fixed along the way

These were pre-existing, mostly latent since the Expo SDK upgrade, and surfaced
as each screen was opened for the first time in a while.

- Missing `Platform` import crashed `screens/SignIn.js`,
  `screens/flows/newSignUpFlow/password.js` and
  `screens/flows/editProfile/Phone.js` on render.
- `Map.js` used `<MapView.Marker>`, which react-native-maps 1.x no longer
  exposes — it is a named export now, so the element was `undefined`.
- `Map.js` passed `initialRegion={{coordinate: Location}}` — the entire
  `expo-location` module namespace. Module namespaces have non-configurable
  properties, so React Native's dev-mode deep-freeze threw "property is not
  configurable".
- `Map.js`'s location handler called `setLocation`, `setLocationAllowed` and
  `setCurrentCity`, none of which exist in that file — copied from `Menu.js`.
  Any user denying location permission hit a `ReferenceError`.
- Tapping a map marker did nothing: on iOS the map's own `onPress` also fires and
  cleared the selection immediately. The `marker-press` flag that distinguishes
  them is Android-only, so the handler now ignores a map press within 400ms of a
  marker press.
- `Menu.js` — `styles.heading` was nested inside itself, leaving the title a
  quarter of the screen width and breaking "DISCOVER" mid-word.
- `Menu.js` — Discover People was unreachable: it sat behind an `appVersion >= 2`
  gate that also unlocks an events screen that was never built.
- Expanded profile cards rendered blank because `<UserCard>` was given no props.
- Passion colours: no exact duplicates, but 13 pairs were perceptually
  indistinguishable (Movies vs Tech differed by ΔE 3.1, below human threshold).
  Repaired to a minimum ΔE of 23.9 with zero confusable pairs, keeping semantic
  hues locked (coffee brown, nature green, watersports blue).

### Database migrations

Run in the Supabase SQL Editor, in this order. All are re-runnable.

| File | Purpose |
| --- | --- |
| `supabase/profiles_setup.sql` | profiles table, RLS, sign-up trigger, demo profiles |
| `supabase/venues_setup.sql` | venues table, RLS, 20 partners |
| `supabase/venues_details.sql` | photo/contact/rating columns, filled for 17 partners |

`venues_setup.sql` only deletes rows where `is_seed = true`, so partners added
later by hand survive a re-run.

### Known gaps

- **Messages/chat is not migrated.** `screens/Messages.js` and
  `screens/Message.js` still poll the dead PHP host (`latestMes.php`,
  `allmes.php`, `message.php`) every few seconds. This is the source of the
  recurring `TypeError: Network request failed`, and the last feature on the old
  backend.
- **Swipes are not persisted.** Likes and passes only log to console; there is no
  matches table yet.
- **13 partners have no description.** Only 4 had Google editorial summaries.
  Descriptions were deliberately not invented for real businesses. The detail
  view omits the paragraph. `venues_details.sql` uses `coalesce`, so anything
  written into the column by hand is never overwritten by a re-run.
- **Venue cards show category, not opening hours.** The source document has no
  hours, so an "OPEN" badge would be fabricated. The schema has room for it.
- **Bookmark and invite buttons** on the partner page are visual only.
- **`backend/app.py`** still contains a plaintext MySQL password and is
  unreferenced by the app. Treat the credential as compromised.
- **`node_modules` is tracked in git** (~43k files). The `.gitignore` entry does
  not untrack what was already committed; needs `git rm -r --cached node_modules`.
- Basket and Movies passion labels sit at 4.3:1 contrast, just under WCAG AA 4.5.
