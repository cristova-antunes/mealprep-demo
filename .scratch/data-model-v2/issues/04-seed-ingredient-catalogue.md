# Load the shared Ingredient catalogue

Status: needs-triage
Category: enhancement
Blocked by: 01

Ship the app's starting set of shared Ingredients (no Clerk user id), each with an Aisle, and a repeatable way to load it into a database. The data migration (02) matches old Ingredients to this catalogue by name, so it has to exist first. Private Ingredients are never promoted into it automatically (see spec).
