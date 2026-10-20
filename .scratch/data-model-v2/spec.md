# Data model v2: Recipes, Plans and the Shopping List

Status: ready-for-agent

## Problem Statement

In the previous version of the app I type a Recipe in by hand after watching an Instagram reel, then build weekly menus out of daily and weekly records that don't match how I actually cook. I cook one Recipe in the evening, eat it for dinner, and take the leftovers for the next day's lunch. Plans and recipes alike are awkward to keep up.

The shopping side is worse. Ingredients are typed per user, so "Tomato", "tomatoes" and "Tomate" pile up as different things. Quantities are free text, so two Recipes needing onions can't be added together. The grocery list can't tell me which Recipes an item is for, and nothing stops me adding the same week to it twice. Deleting a Recipe would break past plans. The current schema also contradicts itself: a grocery item's ingredient is unique across *all* users, and the decision record says the list is derived while the model stores it.

## Solution

A reworked domain model and the rules that run on it, using the language in the project glossary:

- I keep a collection of **Recipes**. Each is my own adapted version of a dish, usually from a **Source** (a reel link). It has my notes, one or more **Meal Types**, at most one **Main Ingredient**, and can be a **Favorite**. Deleting a Recipe **archives** it rather than erasing it.
- Each Recipe's **Recipe Ingredients** point at **Ingredients** from a shared catalogue (each with an **Aisle**), or at private Ingredients of my own when nothing fits. A Recipe Ingredient may have a **Quantity** (an amount and a **Unit** from a fixed list) or none at all, plus my own wording.
- A **Plan** is simply the **Planned Recipes** in one Sunday-to-Saturday week. Each Planned Recipe is one Recipe on the evening I cook it, covering that dinner and the next day's lunch. I tick **Cooked** on the day.
- I have one ongoing **Shopping List**. "Add this week to Shopping List" offers the Planned Recipes that aren't **Added to List** yet. I untick what I already have, and the rest merges into one line per Ingredient, adding up amounts that share a Unit. In the shop I tick items off and then clear them. I can add **Extra Items** by hand.

Recipes, Plan and Shopping List each get their own route, because I use them on different devices: desktop for editing Recipes, tablet while cooking, phone in the shop.

## User Stories

### Recipes

1. As a home cook, I want to create a Recipe by hand with a title, so that I can save a dish I saw in a reel.
2. As a home cook, I want to paste the reel's link as the Recipe's Source, so that I can go back to the original video.
3. As a home cook, I want the app to fetch the reel's thumbnail and title when I paste the link, so that my collection is visual and I type less.
4. As a home cook, I want to keep editing the title after it was fetched, so that it says what I actually call the dish.
5. As a home cook, I want a single free-text notes field on a Recipe, so that I can write the method and my own adaptations in my own words.
6. As a home cook, I want to add Ingredients to a Recipe by picking from the shared catalogue, so that the same Ingredient is recognised across Recipes.
7. As a home cook, I want to create a private Ingredient when nothing in the catalogue fits, so that unusual items (e.g. gochujang) don't block me.
8. As a home cook, I want to choose an Aisle for each private Ingredient, so that it lands in the right section of the Shopping List.
9. As a home cook, I want to add an Ingredient to a Recipe without a Quantity, so that I can save Recipes whose reel gave no amounts.
10. As a home cook, I want to give a Recipe Ingredient an amount and a Unit from a fixed list, so that amounts can be added up on the Shopping List.
11. As a home cook, I want to keep my own wording for a Recipe Ingredient ("2 cloves, minced"), so that I can read the Recipe the way I wrote it.
12. As a home cook, I want the app to refuse an amount without a Unit (or a Unit without an amount), so that Quantities are always meaningful.
13. As a home cook, I want to tag a Recipe with one or more Meal Types, so that I can find breakfast, snack or lunch/dinner Recipes.
14. As a home cook, I want to tag a Recipe with at most one Main Ingredient (meat, fish, vegetarian), or none for desserts, so that I can balance my week.
15. As a home cook, I want to mark a Recipe as a Favorite, so that I can find it again quickly.
16. As a home cook, I want to filter my Recipes by Meal Type, Main Ingredient and Favorite, so that picking dinners for the week is fast.
17. As a home cook, I want to delete a Recipe, so that my collection only shows dishes I still make.
18. As a home cook, I want a deleted Recipe to still show on past Planned Recipes, so that my history stays readable.
19. As a home cook, I want deleting a Recipe to remove it from today's and later days that I haven't cooked yet, so that my Plan doesn't contain dishes I've given up on.
20. As a home cook, I want an archived Recipe to be impossible to plan, so that it doesn't creep back in.
21. As a home cook, I want my Recipes, Plans and Shopping List to be visible only to me, so that my data stays private.

### Plan

22. As a home cook, I want to see my Plan as one week running Sunday to Saturday, so that the first cook covers Sunday dinner and Monday lunch.
23. As a home cook, I want to place a Recipe on a day of the week, so that I know which evening I'll cook it.
24. As a home cook, I want each Planned Recipe to cover that day's dinner and the next day's lunch without extra input, so that planning stays quick.
25. As a home cook, I want to place more than one Recipe on the same day, so that I can cook a main and a side, or a big batch.
26. As a home cook, I want to plan the same Recipe more than once in a week, so that a favourite can come round twice.
27. As a home cook, I want to remove a Planned Recipe, so that I can change my mind.
28. As a home cook, I want to tick Cooked on a Planned Recipe on the day itself, so that I know what I actually made.
29. As a home cook, I want the app to refuse marking a future day as Cooked, so that the flag means something.
30. As a home cook, I want to move between weeks, so that I can plan next week and look back at last week.
31. As a home cook, I want to see which Planned Recipes are already Added to List, so that I know what the Shopping List already covers.
32. As a home cook, I want the Plan to be usable on a tablet in the kitchen, so that I can check and tick things while cooking.

### Shopping List

33. As a home cook, I want an "Add this week to Shopping List" action, so that the list is filled from my Plan when I'm ready.
34. As a home cook, I want that action to offer only Planned Recipes not yet Added to List, so that pressing it twice never doubles my amounts.
35. As a home cook, I want to review the combined Ingredients before confirming, and untick what I already have, so that I don't buy it again.
36. As a home cook, I want ingredients I unticked during review never to reach the list, so that "already have" doesn't need tracking afterwards.
37. As a home cook, I want an Ingredient needed by several Recipes to appear as one line, so that I buy it in one go.
38. As a home cook, I want amounts in the same Unit to be added up (2 + 1 + 2 onions = 5), so that I know how much to buy.
39. As a home cook, I want amounts in different Units to be shown side by side ("400 g + 1 cup"), so that nothing is wrongly converted.
40. As a home cook, I want a line whose Recipes gave no amount to say so ("+ more" or "no amount"), so that I still remember to buy it.
41. As a home cook, I want each line to say which Recipes asked for it, so that I can decide whether to skip it.
42. As a home cook, I want new amounts to merge into the existing unticked line for that Ingredient, so that the list stays one line per Ingredient.
43. As a home cook, I want new amounts not to merge into a line I've already ticked, so that items I've already bought aren't changed.
44. As a home cook, I want lines grouped by Aisle, so that I can walk the shop once.
45. As a home cook, I want to tick an item in the shop and see it crossed out and moved to the bottom, so that a mis-tap doesn't lose it.
46. As a home cook, I want a "Clear ticked" action, so that I can tidy the list after shopping.
47. As a home cook, I want to add an Extra Item as free text (e.g. paper towels), so that the list covers everything I buy.
48. As a home cook, I want an Extra Item to default to the Other Aisle unless I pick one, so that adding is quick.
49. As a home cook, I want typed text that matches a catalogue Ingredient to join that Ingredient's line, so that "milk" doesn't appear twice.
50. As a home cook, I want the Shopping List to stay as it is when I change the Plan afterwards, so that the list only changes when I say so.
51. As a home cook, I want a Recipe I remove and plan again to be offered again, so that I can choose whether to add its Ingredients again.
52. As a home cook, I want archiving a Recipe to keep its amounts on the list but drop the "for <Recipe>" link, so that I don't lose what I already decided to buy.
53. As a home cook, I want the Shopping List to work well on my phone, so that I can use it one-handed in the shop.
54. As a home cook, I want one Shopping List that spans weeks, so that leftovers from last week's shop and next week's needs live together.

### Migration

55. As an existing user, I want my Recipes moved into the new model, so that I don't have to re-enter them.
56. As an existing user, I want my old free-text quantities kept as the wording, so that nothing I wrote is lost even without structured amounts.
57. As an existing user, I want my old Ingredients matched to the catalogue by name, with the rest kept as private Ingredients, so that my Recipes stay complete.
58. As an existing user, I want my past daily menus turned into Planned Recipes with their cooked state, so that my history carries over.

## Implementation Decisions

**Domain language.** The glossary is authoritative: Recipe, Source, Recipe Ingredient, Quantity, Unit, Meal Type, Main Ingredient, Favorite, Archived, Ingredient, Aisle, Plan, Planned Recipe, Cooked, Added to List, Shopping List, Shopping List Item, Ticked, Extra Item. Names to avoid include "menu", "grocery" and "category".

**Decision records.** The database, ORM and hosting are as decided in ADR-0001. The Shopping List is persisted and filled by an explicit action, as decided in ADR-0002, which supersedes ADR-0001's "Shopping List is derived" point.

**Schema (Prisma 8 contract, already authored and emitted).**
- Enums stored as text with generated membership checks:
  - Meal Type: breakfast, lunch/dinner, snack, pre-workout, dessert.
  - Main Ingredient: meat, fish, vegetarian.
  - Aisle: protein, carbs, legumes, vegetable, fruit, fats & dairy, condiments, ready meals, other.
  - Unit: g, kg, ml, l, piece, tbsp, tsp, cup, clove, can, pinch.
- **Recipe**:
  - Clerk user id, title, notes, Source URL and thumbnail URL.
  - A list of Meal Types and an optional Main Ingredient.
  - Favorite flag, and a nullable archived-at timestamp. Archived means archived-at is set.
- **Ingredient**:
  - A nullable Clerk user id: null means the shared catalogue; set means private to that user.
  - A name and an Aisle.
- **Recipe Ingredient**:
  - Composite key of Recipe and Ingredient; it cascades when the Recipe is hard-deleted, which doesn't happen in normal use.
  - Optional amount (float) and Unit, plus the user's wording.
  - A database check requires amount and Unit to be both present or both absent.
- **Planned Recipe**:
  - Clerk user id, Recipe, a calendar date (no time), Cooked flag and Added to List flag.
  - There is no Plan table.
- **Shopping List Item**: either an Ingredient line or an Extra Item.
  - A check constraint enforces exactly one shape: Ingredient set with no name or Aisle, or name and Aisle set with no Ingredient.
  - An Ingredient line takes its Aisle from the Ingredient.
  - An "unquantified" flag records that some Recipe gave no amount.
  - Ticked flag.
  - A partial unique index allows at most one unticked line per Ingredient per user.
- **Shopping List Item Quantity**: one row per item and Unit holding the combined amount.
- **Shopping List Item Recipe**: links a line to the Recipes that asked for it. Rows are removed when a Recipe is archived.
- Removed from the previous model:
  - The daily and weekly menu models.
  - The redundant implicit Recipe–Ingredient link.
  - Notes, Recipe feedback, health status, the "custom" flag and the old combined recipe type.
- Timestamps use the string Temporal codecs per ADR-0001, so the Node runtime needs no global Temporal.

**Modules.**
- **Meal-prep domain module (pure, new).**
  - Holds every rule above as pure functions over plain data. It does no I/O and doesn't import the ORM.
  - It is the logic of the throwaway prototype lifted out.
  - Interface, as functions or a reducer:
    - week-of: date → that week's Sunday start.
    - in-week check.
    - propose-week: offers this week's not-yet-added, non-archived Planned Recipes and combines their Ingredients into review lines.
    - confirm-week: takes the review lines and the already-have choices, and returns which list lines to create or update and which Planned Recipes to mark Added to List.
    - add-extra: matches typed text to an Ingredient case-insensitively; otherwise creates an Extra Item with Aisle defaulting to Other.
    - tick / untick and clear-ticked.
    - archive-recipe: given today, returns the Planned Recipes to remove (today or later, not Cooked), the list links to drop, and the archived flag.
    - can-plan: refuses archived Recipes.
    - can-mark-cooked: refuses future dates.
    - format-quantity, for display: "400 g + 1 cup", "+ more", "no amount".
- **Server actions (thin, new).**
  - Each one resolves the Clerk user and loads that user's rows through the ORM.
  - It calls the domain module and writes the result inside one transaction.
  - It holds no business rules of its own.
- **Routes (new).**
  - Recipes route: a desktop-first list, filters and editor.
  - Plan route: a week view, Sunday to Saturday, with previous/next week, adding and removing Planned Recipes, the Cooked checkbox, an Added to List badge and the "Add this week to Shopping List" review.
  - Shopping List route: phone-first, grouped by Aisle, tick to cross out and move to the bottom, "Clear ticked", and an Extra Item input with Ingredient suggestions.
- **Reel lookup (new, small).** Given a Source URL, it fetches the thumbnail and title to prefill a new Recipe. If the fetch fails, the user simply types them in.
- **Ingredient catalogue seed.** The app ships the shared Ingredients and their Aisles. Private Ingredients are never promoted to the catalogue automatically.
- **Data migration (one-off).** It moves the previous app's Recipes, Ingredients and daily menus across:
  - The old combined type is split into Meal Type and Main Ingredient.
  - The old free-text quantity becomes the wording, with no amount or Unit.
  - Daily menus become Planned Recipes with their cooked flag.
  - Grocery items, Notes and feedback are not carried over.

**Prototype-derived core rules.** These are trimmed from the validated prototype on branch `prototype/shopping-list-logic` and encode the merge rule exactly:

```js
// Combine Recipe Ingredients of the given Planned Recipes: one line per Ingredient.
function aggregate(recipes, planned) {
  const lines = new Map();
  for (const p of planned) {
    for (const ri of recipes[p.recipeId].ingredients) {
      const line = lines.get(ri.ingredientId) ?? { ingredientId: ri.ingredientId, quantities: {}, unquantified: false, recipeIds: [] };
      if (ri.amount == null) line.unquantified = true;
      else line.quantities[ri.unit] = (line.quantities[ri.unit] ?? 0) + ri.amount;
      if (!line.recipeIds.includes(p.recipeId)) line.recipeIds.push(p.recipeId);
      lines.set(ri.ingredientId, line);
    }
  }
  return [...lines.values()];
}

// Merge only into an unticked line for the same Ingredient; a ticked line is already bought.
const target = list.find(i => i.ingredientId === line.ingredientId && !i.ticked);

// Offered for review: in the week, not yet Added to List, Recipe not archived.
const candidates = planned.filter(p => inWeek(p.date, weekStart) && !p.addedToList && !recipes[p.recipeId].archived);

// Archiving removes upcoming, uncooked Planned Recipes ("today" counts as upcoming until Cooked).
const removed = planned.filter(p => p.recipeId === id && p.date >= today && !p.cooked);
```

## Testing Decisions

- **One seam: the meal-prep domain module.** All rule tests run against its public functions with Vitest through `vp test`. They need no database, no Clerk and no Next.js. Server actions and routes are thin adapters and aren't unit-tested in this spec.
- **What a good test looks like:**
  - It sets up a small, realistic week of plain data (Recipes, Planned Recipes, the current list).
  - It calls one public function and asserts on the returned outcome as the user would see it: lines, amounts, flags, refusals.
  - It never asserts on internal helpers or data layout beyond the module's interface.
  - Tests are named in glossary language.
- **Scenarios to cover.** These are the prototype's walkthroughs, which you validated. Each becomes a test group:
  - A normal week with already-have skipped, tick and clear.
  - Pressing the button twice: only new Planned Recipes are offered, and nothing new means a refusal.
  - Units that don't add up: "400 g + 1 cup", "6 clove + more", "no amount".
  - Buying onions twice: no merge into a ticked line.
  - Changing the plan afterwards: the list is unchanged, and a re-planned Recipe is offered again.
  - Deleting a Recipe: past Planned Recipes kept, today's uncooked and future ones removed, list links dropped with amounts kept, planning refused.
  - Cooked only on the day.
  - Extra items: free text goes to Other, text matching an Ingredient merges, case is ignored.
  - Week boundaries: Saturday belongs to the week that started the previous Sunday, and Sunday starts a new week.
- **Database-level guarantees:** the amount-with-Unit check, the ingredient-or-extra check and the one-open-line index are in the contract. They're verified by applying the migration, not by unit tests.
- **Prior art:** the codebase has no tests yet, so these are the first. The prototype on branch `prototype/shopping-list-logic` is the behavioural reference.

## Out of Scope

- Filling in a Recipe's Ingredients automatically from a reel's caption, with AI or otherwise. Only the thumbnail and title are fetched.
- Structured, step-by-step methods. Recipes have notes only.
- Planning breakfast, snacks or pre-workout. Only lunch/dinner is planned. Those Recipes live in the collection, and their Ingredients can be added as Extra Items.
- Unit conversion (g ↔ kg, cups ↔ grams).
- Scaling Recipes by servings or portions.
- Households or sharing between users.
- Recipe feedback, ratings and health status.
- Notes not attached to a Recipe.
- Automatically syncing the Shopping List when the Plan changes.
- Promoting private Ingredients to the shared catalogue, and admin tooling for the catalogue.
- Service-level or end-to-end tests against a real database.

## Further Notes

- The contract is already written and emits cleanly. Applying it needs the target database connection. The data migration depends on that being done first.
- Prisma 8 is a release candidate, per ADR-0001: pin versions, and remember the contract has to be re-emitted when it changes.
- Next.js in this repo has breaking changes from common knowledge. Read the bundled Next.js docs before building routes and server actions.
- The three existing tickets in this folder (apply schema, migrate data, routes) are the first implementation slices of this spec.
