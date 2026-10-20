# Shopping List is persisted, filled by an explicit action

Status: accepted (2026-10-20). Supersedes the "Shopping List is derived" point of ADR-0001.

Each user has one ongoing Shopping List that is not tied to a Plan: they press "Add this week to Shopping List", untick what they already have, and the remaining Ingredients are merged into the list (one line per Ingredient, matching units summed, contributing Recipes remembered). Items are ticked off in the shop and removed with "Clear ticked". We persist the list because its contents are the user's own history of adds and clears, which cannot be recomputed from Plans.

## Considered options

- **Derived per Plan (ADR-0001's original choice):** no sync problems, but forces one list per week, and the user shops from a single list that spans weeks and includes Extra Items.
- **Auto-add when a Recipe is planned:** swapping Recipes mid-week would leave stale items behind; the explicit action with a review step avoids that and removes the need to store "already have".

## Consequences

- Changing a Plan after adding it to the list does not update the list; the user edits the list by hand.
