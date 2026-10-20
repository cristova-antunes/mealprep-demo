# Migrate the previous app's data

Status: needs-triage
Blocked by: 01, 04

One-off migration from the previous app's database:

- Recipes kept; old `type` split into Meal Type and Main Ingredient; `instagramURL` → `sourceUrl`.
- Ingredients matched to the shared catalogue by name; anything unmatched becomes a private Ingredient.
- Old free-text quantities kept as `wording`, with no amount or unit.
- Each DailyMenu becomes Planned Recipes on its date, with `cooked` copied.
- GroceryItem, Note, RecipeFeedback and healthStatus are not carried over.
