# AGENTS.md

## Section 1: Working Doctrine

Sixteen rules. Every agent, every platform, every operator. Nothing in `people/` or anywhere else relaxes them. Project facts live in Section 2; current state lives in `HANDOFF.md`; how to communicate with the operator lives in `people/`.

1. **Think with the end in mind.** Before changing anything, answer: what is this for, who uses it and in what moment, what must they walk away with. Hold the result to those answers, not to "it compiles" or "the ticket is closed."

2. **Verify before declaring done.** UI work: render the actual surface and look at it. Data work: validate against live data. Bug fixes: reproduce first, then prove the fix kills that exact reproduction. If your platform cannot do the needed verification, item 15 applies.

3. **Root cause over patches.** If two symptoms share one cause, name it and fix it once. Never ship a workaround dressed as a fix.

4. **No half-builds.** If the work is bigger than the session, stop and propose it as a scoped follow-up instead of leaving something that looks finished and is not.

5. **Do not reintroduce fixed bugs.** Read `HANDOFF.md` and recent history for the area before working in it.

6. **Git discipline.** Set identity at session start, before any commit: `lowkeycm` / `lowkeycm@users.noreply.github.com`. Never commit to `main`. Branch `clay/what-it-does`. Open a PR with a conventional-commit title, merge it yourself once checks pass, delete the branch. Do not ask the operator to merge.

7. **Verify deploys.** Confirm what actually shipped rather than assuming a green build shipped the right thing.

8. **Secrets stay out of chat, commits, and logs.** Read them only from the locations in the Section 2 secrets map. A value you cannot read is not a value that is missing.

9. **Data isolation between businesses.** One business's data never touches another's database, CRM, or webhooks. Where two products share one database, the same rule applies between the products: touch only the tables and functions this repo owns (Section 2 lists them).

10. **Copy standards.** In anything customer-facing (site and app copy, marketing email and SMS, social posts, ad copy, anything an assistant says to a customer): no em dashes, no emojis, plain language, no filler, no corporate hedging. Internal docs, commit messages, PR bodies, and code comments are exempt from the punctuation ban but keep the plain-language bar. Legal text is precision, not marketing: do not restyle it unprompted. Never address a person by a name inferred from an email address. For tone and depth when talking to the operator, follow their file in `people/` (Clay's bans em dashes in messages to him).

11. **Ask before large or ambiguous changes.** When scope grows past what was agreed or the answer needs a product decision, stop and check. Non-owners cannot approve scope changes (see the Operator section).

12. **Handoff hygiene.** At session start read `HANDOFF.md`. Same operator, same platform, within 24 hours: pick up silently. Anything else: read the Last Session block back and get acknowledgment before working. At session end update `HANDOFF.md`, commit, push. Not committed means the session did not happen.

13. **Durable learnings go in the repo, not platform memory.** Platform memory does not travel. Rules and corrections belong in this file, current state in `HANDOFF.md`, operator preferences in `people/`.

14. **Confirm the target before infrastructure operations.** Before any deploy, migration, or secrets change, state which project you are targeting and check it against Section 2. The deploy credential reaches every project on the account, across separate businesses.

15. **Capability honesty.** If you cannot perform a required verification from your platform, say so plainly and hand that part back. Never skip it silently, never substitute a weaker check and present it as the real one. Capability notes recorded in `HANDOFF.md` go stale: retest any "cannot" before relying on it, and update the note when reality has changed.

16. **The Project Management Formula.** The default method for breaking down any build. Start from the ultimate goal and decompose top-down. At every level, ask the same question: (1) What is the ultimate goal? State the outcome, not the activity. (2) What needs to be done? (3) What needs to be done to accomplish that? Repeat until every item is executable by someone who was not in the room. Subtasks are alignment (definition) steps first, build steps second. Go one level at a time and get correction before going deeper. Design from best practices, not from current habits. Document what exists before deciding what is new. A rejected draft stays deleted. Never present guesses as best practices.

## Section 2 - Project specifics

Project-specific section. TODO: fill in per NEW-PROJECT.md in clay-config
