# Copy review — September 30, 2026

Initially requested as an uncommitted AIDA/PAS review. User approved committing the reviewed version on September 29, 2026 at 22:54 Eastern. This approval does not publish it to the live site.
Base commit: 23abb9b78e21b741bca9c285118e60fe9842b591.

The homepage uses an AIDA sequence with a short problem/consequence section. Five service pages follow problem, consequence, solution and action. Copy explicitly identifies video ads, websites, customer management and follow-up; visitors can hire for one project, a connected system or ongoing support. Existing hero scene, swipe controls, portfolios, media players and workflow demonstrations remain.

## Verification

- Production build and TypeScript passed on final temporary deployment.
- git diff --check passed before commit. No push or production deployment performed.
- Desktop page review and narrow phone-width checks completed; no horizontal page overflow observed. Hero drag at phone width advances the active service.
- Corrected creative scope layout and shortened narrow journey navigation labels.
- Temporary preview robots metadata is noindex, nofollow.
- Browser error entries inspected were extension errors, not application errors.
- No test inquiry submitted. Anonymous preview has no production inquiry credentials and uses email/booking fallback. Physical-device touch behavior was not separately tested.

## Preview

https://temporary-flying-marble-wc8t1gc.vercel.app/
Expires September 30, 2026 at 03:26 UTC. This is an anonymous review deployment, separate from the live project. Do not use its ignored .vercel project linkage to deploy production; reconnect the existing official project when publication is approved.

The temporary responsive QA fixture was deployed for review checks and removed from the source candidate. Screenshot: review/copy-review-home.jpg.

## Other changes

Repaired the existing package-lock resolution mismatch that prevented npm ci; package.json is unchanged. No client result statistics or new performance promises were invented. This remains a review draft, not a claim that the Marketing Hub publication quality gate has been met.
