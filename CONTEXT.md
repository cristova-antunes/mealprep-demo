# Meal Prep

Users keep a personal collection of recipes, plan which ones to cook each week, and shop from a list derived from that plan.

## Language

### Recipes

**Recipe**:
A user's own version of a dish: its ingredients, notes and tags, usually adapted from a Source.
_Avoid_: Dish, meal (a Meal is something else)

**Source**:
The link a Recipe was adapted from, typically an Instagram reel.
_Avoid_: Origin, reference

**Recipe Ingredient**:
An Ingredient used in a Recipe, with an optional quantity and the user's original wording.
_Avoid_: Line item

**Quantity**:
An optional amount and Unit on a Recipe Ingredient; absent when the user only lists the Ingredient.

**Unit**:
One of a fixed set of measures (g, kg, ml, l, piece, tbsp, tsp, cup, clove, can, pinch); Quantities combine only when their Units match.

**Meal Type**:
A tag saying when a Recipe is eaten (breakfast, lunch/dinner, snack, pre-workout); a Recipe has one or more.

**Main Ingredient**:
The tag saying what a Recipe is built around (meat, fish, vegetarian); a Recipe has at most one.
_Avoid_: Recipe type, category

**Favorite**:
A Recipe the user has marked to find again quickly.

**Archived**:
A Recipe the user has deleted: hidden from their collection and unplannable, but still shown on past Planned Recipes.
_Avoid_: Deleted, removed

### Ingredients

**Ingredient**:
A single food item, either from the shared catalogue or private to one user when nothing in the catalogue fits.
_Avoid_: Product, item

**Aisle**:
The shopping section an Ingredient belongs to (protein, vegetables, dairy…), used to group the Shopping List.
_Avoid_: Ingredient type, category

### Planning

**Plan**:
The Planned Recipes falling in one week, Sunday to Saturday, so the first cook covers Sunday dinner and Monday lunch.
_Avoid_: Weekly menu, week

**Planned Recipe**:
A Recipe placed on one day of a Plan, cooked that evening to cover that day's dinner and the next day's lunch. A day may hold several.
_Avoid_: Daily menu, meal, plan entry

**Cooked**:
Whether the user actually made a Planned Recipe; known only on the day itself.

**Added to List**:
Whether a Planned Recipe's Ingredients have already been sent to the Shopping List, so they are not offered again.

### Shopping

**Shopping List**:
The user's single, ongoing list of things to buy, not tied to any one Plan.
_Avoid_: Grocery list

**Shopping List Item**:
One line on the Shopping List: an Ingredient with its combined Quantities and the Recipes that asked for it, or an Extra Item.
_Avoid_: Grocery item

**Ticked**:
A Shopping List Item the user has picked up in the shop; ticked items stay visible until the user clears them.
_Avoid_: Completed, done

**Extra Item**:
Something the user adds to a Shopping List by hand that no Recipe requires (e.g. paper towels).
_Avoid_: Custom item, manual entry
