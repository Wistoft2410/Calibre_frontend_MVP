# Backend / Network Call Audit — Calibre_frontend_MVP

Read-only audit. No code was modified while producing this report.

Scope: every place the app talks to a server (or a third-party API), every
place it persists auth/session state, and what the Supabase migration needs
to account for. Repo is plain JavaScript, React Native 0.81 / Expo SDK 54,
no TypeScript, no centralized API client.

---

## 0. Two backends exist in this repo — only one is actually live

| Backend | Where | Status |
|---|---|---|
| PHP REST API at `https://human-interface.dk/calibre/` | Referenced via `appSettings/db.json`, hit by ~20 `fetch()` call sites across the app | **This is the one the running app actually talks to.** Per your prompt, it's now permanently offline. |
| Flask + MySQL app, [backend/app.py](backend/app.py) | Single file, `mysql.connector` connecting to `database='mysovedk_calibre'`, `host='cp04.nordicway.dk'`, with **a plaintext username and password committed to source** (`user='mysovedk_seb'`, `password='LineSebfif10!'`) | **Not referenced anywhere in the app's `fetch()` calls.** Nothing in `App.js` or any screen points at this Flask server — the mobile app only ever calls the `human-interface.dk` PHP endpoints. This looks like an abandoned/experimental backend, but it's still tracked in git with a live-looking password in plaintext. |

**Action needed regardless of the Supabase migration:** that MySQL password in `backend/app.py` should be treated as compromised (rotated on the DB side) and the file either deleted or the credential removed from history, since it's sitting in the repo right now. This is a real, currently-committed secret, not a hypothetical one — flagging it before anything else below.

---

## 1. Call-site table

All calls use raw `fetch()` — no `axios`, no `XMLHttpRequest`, no service wrapper (except one, see §2). Base URL is always `serverName.app.db` = `https://human-interface.dk/calibre/`, loaded via a fresh `require('appSettings/db.json')` in each file.

**Every single JSON `fetch()` call in the app — live and dead — passes `header:` instead of `headers:` in the options object.** `fetch` silently drops unrecognized keys, so `Content-Type: application/json` was never actually sent to the PHP backend, in this app's entire history. Worth knowing before assuming any "expected request shape" below reflects a working content-type negotiation — it never had one; it worked only because PHP's request parsing is lenient.

### Live code (reachable from `config/navigation.js`)

| File:Line | Method | Endpoint | Feature | Request body |
|---|---|---|---|---|
| [App.js:33](App.js#L33) | POST | `signin.php` | auth | `{username, password}` |
| [App.js:75](App.js#L75) | POST | `register.php` | auth | `{bday, email, firstname, lastname, language, country, city, cityLat, cityLng, interests, password}` |
| [screens/Start.js:31](screens/Start.js#L31) | POST | `appleSignIn.php` | auth (Apple) | `{access_token:"TEST123", user, email, firstname, lastname}` |
| [screens/Message.js:39](screens/Message.js#L39) | POST | `getUserInfo.php` | chat | `{access_token, user, type:"ID"}` |
| [screens/Message.js:96](screens/Message.js#L96) | POST | `message.php` | chat | `{access_token, userFromID, userToID}` — polled every 2s |
| [screens/Message.js:149](screens/Message.js#L149) | POST | `sendMes.php` | chat | `{access_token, userFromID, userToID, mes}` |
| [screens/Message.js:177](screens/Message.js#L177) | POST | `getUserInterests.php` | chat/profile | `{access_token, user}` |
| [screens/Messages.js:104](screens/Messages.js#L104) | POST | `latestMes.php` | chat | `{access_token, user}` — polled every 5s |
| [screens/Messages.js:127](screens/Messages.js#L127) | POST | `allmes.php` | chat | `{access_token, user}` |
| [components/Menu.js:69](components/Menu.js#L69) | POST | `getUserInfo.php` | profile bootstrap | `{access_token, user, type:"email"}` — polled every 2s |
| [components/Menu.js:135](components/Menu.js#L135) | POST | `getUserInterests.php` | profile | `{access_token, user}` |
| [screens/editProfile.js:36](screens/editProfile.js#L36) | POST | `getCountry.php` | profile | `{access_token, ID:country}` |
| [screens/flows/editProfile/update.js:8](screens/flows/editProfile/update.js#L8) | POST | `editUser.php` | profile | `{access_token, userID, data, dataType}` — generic field setter, reused by 8 call sites |
| [screens/flows/editProfile/ProfileImage.js:142](screens/flows/editProfile/ProfileImage.js#L142) | POST | `uploadProfileImage.php` | profile | `FormData{photo:{uri,name,type,user}}` |
| [screens/flows/newSignUpFlow/email.js:34](screens/flows/newSignUpFlow/email.js#L34) | POST | `register.php` | auth/sign-up | `{checkEmail:"true", email}` — availability check |
| [screens/flows/newSignUpFlow/Interest.js:97](screens/flows/newSignUpFlow/Interest.js#L97) | POST | `things.php` | auth/sign-up | `{access_token:"TEST123"}` |
| [screens/flows/appleSignUpFlow/Interest.js:88](screens/flows/appleSignUpFlow/Interest.js#L88) | POST | `things.php` | auth/sign-up (Apple) | same as above — **flow dead-ends after this, see §5.6** |

### Dead code (not reachable from `config/navigation.js` — legacy `screens/flows/signUpFlow/` and `screens/flows/components/`)

| File:Line | Endpoint | Note |
|---|---|---|
| [components/school-input.js:140,175](components/school-input.js#L140) | `schools.php`, `school.php` | only consumer is dead `education3.js` |
| [components/job-input.js:140,174](components/job-input.js#L140) | `jobs.php`, `job.php` | only consumers are dead `job.js`/`job1-3.js` |
| `screens/flows/signUpFlow/yourThing.js:155` | `things.php` | also has a broken `require()` path, see §5.3 |
| `screens/flows/signUpFlow/email.js:52` | `register.php` | duplicate of the live `newSignUpFlow` version |
| `screens/flows/signUpFlow/photo.js:187` | `upload.php` | broken `require()` path; body omits `user` field unlike live version |
| `screens/flows/components/email.js:41` | `register.php` | unreferenced |
| `screens/flows/signUpFlow/phone.js:62` | *(commented out)* `https://myso1ve.dk/bonjour/register.php` | third, older, hardcoded domain — dead and commented |

Full endpoint list (all relative to `https://human-interface.dk/calibre/`): `signin.php`, `register.php`, `getUserInfo.php`, `message.php`, `sendMes.php`, `getUserInterests.php`, `appleSignIn.php`, `getCountry.php`, `latestMes.php`, `allmes.php`, `things.php`, `upload.php`, `uploadProfileImage.php`, `editUser.php`, `jobs.php`, `job.php`, `schools.php`, `school.php`. The same host also serves static files directly — `serverName.app.db + "images/" + <filename>` is used as an `<Image source={{uri}}>` in [screens/Message.js:133,304](screens/Message.js#L133), [screens/Messages.js:48](screens/Messages.js#L48), [screens/userCard.js:90,103](screens/userCard.js#L90), [components/userCard.js:85](components/userCard.js#L85) — i.e. profile-image hosting also disappears when the PHP host goes offline, and needs a Supabase Storage bucket + public URL replacement, not just a data-endpoint swap.

---

## 2. How centralized is the API layer?

**Not centralized at all**, with one exception. ~20 files each independently `require()` `appSettings/db.json` and duplicate the same `fetch()` boilerplate (method, the `header:` typo, `JSON.stringify`, `.then(r=>r.json())`, `.catch(console.error)`).

The one exception: [screens/flows/editProfile/update.js](screens/flows/editProfile/update.js) exports `updateData(dataType, data, user)` wrapping `editUser.php`, reused by 8 call sites (`Name.js`, `Email.js`, `Phone.js`, `City.js`, `Gender.js`, `Age.js`, `Password.js`, `ProfileImage.js`). That's the only genuine service-module pattern in the codebase.

There is no `services/`, `api.js`, or `client.js`. This means the Supabase migration is not a matter of swapping one client module — it requires touching ~17 individual call sites directly, each currently written inline in a screen or component.

---

## 3. Expected response shape per feature group

Inferred from how each response is consumed (no formal API docs / OpenAPI spec exist in the repo).

**Auth** ([App.js](App.js), [Start.js](screens/Start.js), [newSignUpFlow/email.js](screens/flows/newSignUpFlow/email.js))
- Sign in / register / Apple sign-in all return a **raw string**, not a JSON object, compared against magic values: `"SIS"` (sign-in success), `"URS"` (user registered), `"MNU"` (mail not used / available), `"Access denied"`, `"signUp"`, `"Failed"`. Anything else is treated as a literal error message and `alert()`'d to the user.
- On success there is **no token/session returned by the server at all** — the client just stores the `username` or `email` it already had locally as `@user_Token` (see §4). There is no real bearer-token/JWT/session-expiry concept anywhere in this app today.

**Profile** ([Menu.js](components/Menu.js), [editProfile.js](screens/editProfile.js), [flows/editProfile/*](screens/flows/editProfile/))
- `getUserInfo.php` → object: `{ID, firstName, lastName, age, city, email, gender, phone, countryID, profileImage, description}`.
- `getUserInterests.php` → array of `{emoji, bgColor}`.
- `getCountry.php` → `{country, dialCode}`.
- `editUser.php` (generic field update) → response is fetched but never read/used.
- `uploadProfileImage.php` → raw string `"SUC"` on success, else error string.

**Chat/messages** ([Message.js](screens/Message.js), [Messages.js](screens/Messages.js))
- `message.php` → array of `{id, from_user_id, message, date_sent}` (mapped straight into GiftedChat's message shape), OR the literal string `"No messages found"` in the empty case — callers must branch on string vs array, not just check `.length`.
- `sendMes.php` → response ignored entirely.
- `latestMes.php` / `allmes.php` → arrays driving the two message-list tabs; exact item shape wasn't fully typed by the audit (rendered through `MessagesList`/`AllMessagesList` components) — worth checking those components directly before building the Supabase query.

**Sign-up flow support** (`things.php`, `jobs.php`/`job.php`, `schools.php`/`school.php`)
- `things.php` → array of interest "things" (selectable pills) — no user context in the request, so it's a static/shared lookup list, a good first candidate for a Supabase table with public read access.
- `jobs.php`/`schools.php` → array of autocomplete matches for a text query; `job.php`/`school.php` → single record by id. Both effectively dead in the current live flow (see §1), so lowest priority unless the legacy sign-up screens get revived.

---

## 4. Auth/session storage (AsyncStorage)

Single key used everywhere: **`@user_Token`**.

| File:Line | Op | Trigger |
|---|---|---|
| [App.js:121](App.js#L121) | `getItem('@user_Token')` | On every app mount, inside `bootstrapAsync()`; if non-empty, dispatches `RESTORE_TOKEN` after an artificial 2500ms splash delay. |
| `utils/tokenHelper.js:8`, via `utils/reducer.js:13` | `setItem('@user_Token', token)` | On every `SIGN_IN` dispatch (email sign-in, Apple sign-in, or post-registration) from `App.js`'s `AuthContext`. |
| `utils/tokenHelper.js:21`, via `utils/reducer.js:20` | `removeItem('@user_Token')` | `SIGN_OUT` dispatch, from the Log Out button in [screens/Settings.js:47](screens/Settings.js#L47). **No server-side session invalidation call is ever made** — logout is purely local. |
| [screens/Messages.js:151](screens/Messages.js#L151) | `getItem('@user_Token')` | Re-read on mount + every 5s, then sent as the plain `user` field in `latestMes.php`/`allmes.php` request bodies. |
| [components/Menu.js:112](components/Menu.js#L112) | `getItem('@user_Token')` | Re-read on mount + every 2s, sent as the plain `user` field to `getUserInfo.php`. |

**Important for the migration**: `@user_Token` does not hold a server-issued credential — it holds the raw `username` (email sign-in, [App.js:49](App.js#L49)) or raw `email` (Apple sign-in / post-registration, [App.js:100](App.js#L100), [Start.js:64](screens/Start.js#L64)), and screens read it back and resend it as a plain user-identifier field, not as a bearer token. Supabase Auth will give you a real JWT/session. Don't naively preserve the current "store the email string, send it back as `user` on every request" pattern — that's the thing most worth redesigning, not porting.

Unrelated, non-auth AsyncStorage key also present: `@theme` ([components/Menu.js:177,185](components/Menu.js#L177)), pure UI dark-mode preference — out of scope for the migration.

---

## 5. Third-party integrations — NOT part of the migration, must keep working

| Integration | Package actually used | Where | Notes |
|---|---|---|---|
| Google Places Autocomplete | Vendored `components/places-input/` hitting `maps.googleapis.com/maps/api/place/{autocomplete,details}/json` directly via `fetch` | [screens/flows/newSignUpFlow/city.js](screens/flows/newSignUpFlow/city.js), `appleSignUpFlow/city.js` | Not the `react-native-google-places-autocomplete` package (that's an unused dependency). **Hardcoded API key** `AIzaSyC1DL8gnppq5oNaBExpRynw-VI2_zGKkQM` duplicated in 4 files — see §6.2, real committed secret, unrelated to Supabase but should be rotated. |
| Maps | `react-native-maps` | [screens/flows/meetUpMap/Map.js](screens/flows/meetUpMap/Map.js) | No direct network calls in-repo; SDK handles tiles. |
| Apple Sign-In | `expo-apple-authentication` | [screens/Start.js](screens/Start.js) | `@invertase/react-native-apple-authentication` in `package.json` is never actually imported — dead dependency, not a second integration. |
| QR codes | `react-native-custom-qr-codes-expo` | [components/QRcode.js](components/QRcode.js) | Local generation only, no network. `react-native-qrcode` in `package.json` is unused. |
| Device location | `expo-location` | [components/Menu.js](components/Menu.js), `flows/meetUpMap/Map.js` | On-device reverse geocoding, no network call visible in this code. |

Confirmed dead dependencies (present in `package.json`, never imported anywhere): `react-fetch-hook`, `expo-notifications`, `@invertase/react-native-apple-authentication`, `react-native-google-places-autocomplete`, `react-native-places-input`, `react-native-qrcode`, `react-native-geocoding` (imported in `components/userCard.js` but never called).

---

## 6. Migration checklist, ordered by dependency

1. **Auth first — nothing else works without it.** Replace `signin.php`/`register.php`/`appleSignIn.php` with Supabase Auth (email/password + Apple provider). This also forces the redesign flagged in §4: stop treating `@user_Token` as a plain user-id string and start using a real Supabase session/JWT, since every other feature currently authenticates by resending that string as a `user` field.
2. **User profile table + `getUserInfo.php`/`editUser.php`/`getCountry.php` replacement.** Needed before chat/discovery can resolve a user id into a display profile. Decide the Postgres schema for the fields currently returned (`firstName, lastName, age, city, email, gender, phone, countryID, profileImage, description`) plus RLS policies.
3. **Profile image storage.** `uploadProfileImage.php` and the `serverName.app.db + "images/" + filename` static-serving pattern both need a Supabase Storage bucket + public URL scheme — this blocks profile photos and every screen that renders `userCard.js`'s avatar.
4. **Interests (`getUserInterests.php`, `things.php`).** Small, low-risk, no complex relations — good candidate to migrate early as a confidence-builder. `things.php` in particular looks like a static shared lookup table (public read).
5. **Chat/messages last, and treat as a redesign, not a port.** `message.php`/`latestMes.php`/`allmes.php` are currently naive polling loops (2s/5s `setInterval`). This is the one place a literal 1:1 endpoint swap would be actively wrong — replace with Supabase Realtime subscriptions on a `messages` table instead of porting the polling pattern forward.
6. **Legacy sign-up flow (`schools.php`/`school.php`/`jobs.php`/`job.php`) — skip unless revived.** These only serve dead code (§1). Get a product decision on whether `screens/flows/signUpFlow/` and `screens/flows/appleSignUpFlow/Interest.js`'s incomplete flow (§5.6 below) are being kept before spending migration effort on them.

Not part of the ordered list but blocking cleanliness: decide what to do with `backend/app.py` (§0) before or alongside step 1, since it currently ships a live-looking committed database password regardless of whether the migration touches it.

---

## 7. Flagged issues / open questions

1. **`backend/app.py` has a plaintext MySQL password committed to git** (`password='LineSebfif10!'`, host `cp04.nordicway.dk`). It appears unreferenced by the live app (no `fetch` call points at it), but it's tracked in the repo right now. Question: is this credential still valid/live? If so it should be rotated immediately regardless of the Supabase timeline.
2. **Every JSON `fetch()` call uses `header:` instead of `headers:`**, so `Content-Type`/`Accept` were never sent to the old PHP backend, ever. Flagging so a "convert fetch → supabase-js" pass doesn't assume the old requests were well-formed.
3. **`access_token: "TEST123"` is hardcoded and duplicated across 10 files**, sent as a literal string on nearly every request. Unclear whether the old backend ever meaningfully validated it. Question: was there ever a real per-user or per-app token scheme, or was this always a no-op placeholder?
4. **A live Google Maps/Places API key is hardcoded in 4 client files**: `AIzaSyC1DL8gnppq5oNaBExpRynw-VI2_zGKkQM`. Unrelated to Supabase, but it's a real committed secret shipping in the client bundle — recommend rotating and moving to env config either way.
5. **Broken relative `require('./appSettings/db.json')` paths** in `screens/flows/signUpFlow/yourThing.js`, `photo.js`, and `components/job-input.js`/`school-input.js` — would throw at runtime, but only in dead code paths, which is presumably why it was never caught.
6. **Large confirmed-dead code**: the entire `screens/flows/signUpFlow/` folder, `screens/flows/components/`, `components/job-input.js`, `components/school-input.js`, and `components/GoconInput.js` (imported nowhere except commented-out lines) aren't reachable from `config/navigation.js`. Recommend confirming with the team whether these can be deleted before migration, so their network calls aren't ported for nothing.
7. **`@user_Token` is a plain identifier, not a session credential** — see §4. This is the biggest structural mismatch with how Supabase Auth works and needs an explicit design decision, not a mechanical port.
8. **`screens/flows/appleSignUpFlow/Interest.js`'s `nextPage()` never actually submits** — it just `alert("Sign up is not added yet.")`. The Apple sign-up flow is incomplete even against the old backend. Needs a product call on whether to finish it against Supabase or leave it explicitly unimplemented.
9. **No server-side logout ever existed** — Log Out only clears `AsyncStorage` locally (§4). Worth deciding whether Supabase's `signOut()` (which does invalidate the session server-side) changes expected behavior here, e.g. across multiple devices.
10. **Dead `package.json` dependencies**: `react-fetch-hook`, `expo-notifications`, `@invertase/react-native-apple-authentication`, `react-native-google-places-autocomplete`, `react-native-places-input`, `react-native-qrcode`, `react-native-geocoding`. None block the migration but worth pruning at some point — `expo-notifications` in particular being unused is worth double-checking with the team in case push notifications were intended but never finished, since that's a plausible Supabase Edge Function + FCM/APNs project later.

---

*Compiled via static analysis of the repo only — no server calls were made and no code was changed while producing this report.*
