#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/51dcabfaa403ec19a071fa67c7dc6e970886218395091a814722d674ab6b388b/contract';
import endContract from '../../snapshots/51dcabfaa403ec19a071fa67c7dc6e970886218395091a814722d674ab6b388b/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Ingredient',
        columns: [
          col('aisle', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('clerkId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Ingredient_aisle_check_12e4f0df',
            sql`"aisle" IN ('protein', 'carbs', 'legumes', 'vegetable', 'fruit', 'fats_and_dairy', 'condiments', 'ready_meals', 'other')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'PlannedRecipe',
        columns: [
          col('addedToList', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('clerkId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('cooked', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('date', 'date', { notNull: true, codecRef: { codecId: 'pg/date-string@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('recipeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Recipe',
        columns: [
          col('archivedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('clerkId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isFavorite', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('mainIngredient', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('mealTypes', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('sourceUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('thumbnailUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Recipe_mainIngredient_check_c4d60415',
            sql`"mainIngredient" IN ('meat', 'fish', 'vegetarian')`,
          ),
          checkExpression(
            'Recipe_mealTypes_check_aecbc17a',
            sql`array_remove("mealTypes", NULL) <@ '{"breakfast","lunch_dinner","snack","pre_workout","dessert"}'`,
          ),
          checkExpression(
            'Recipe_mealTypes_elem_not_null_87226d38',
            sql`array_position("mealTypes", NULL) IS NULL`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'RecipeIngredient',
        columns: [
          col('amount', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('ingredientId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('recipeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('unit', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('wording', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['recipeId', 'ingredientId']),
          checkExpression(
            'RecipeIngredient_unit_check_bee72bda',
            sql`"unit" IN ('g', 'kg', 'ml', 'l', 'piece', 'tbsp', 'tsp', 'cup', 'clove', 'can', 'pinch')`,
          ),
          checkExpression(
            'recipe_ingredient_amount_with_unit_c620e484',
            sql`("amount" IS NULL) = ("unit" IS NULL)`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'ShoppingListItem',
        columns: [
          col('aisle', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('clerkId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('ingredientId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('ticked', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('unquantified', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'ShoppingListItem_aisle_check_12e4f0df',
            sql`"aisle" IN ('protein', 'carbs', 'legumes', 'vegetable', 'fruit', 'fats_and_dairy', 'condiments', 'ready_meals', 'other')`,
          ),
          checkExpression(
            'shopping_list_item_ingredient_or_extra_4d0c2c86',
            sql`(("ingredientId" IS NOT NULL AND "name" IS NULL AND "aisle" IS NULL) OR ("ingredientId" IS NULL AND "name" IS NOT NULL AND "aisle" IS NOT NULL))`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'ShoppingListItemQuantity',
        columns: [
          col('amount', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('itemId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('unit', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['itemId', 'unit']),
          checkExpression(
            'ShoppingListItemQuantity_unit_check_bee72bda',
            sql`"unit" IN ('g', 'kg', 'ml', 'l', 'piece', 'tbsp', 'tsp', 'cup', 'clove', 'can', 'pinch')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'ShoppingListItemRecipe',
        columns: [
          col('itemId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('recipeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['itemId', 'recipeId'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Ingredient',
        index: 'Ingredient_clerkId_idx_610a6a63',
        columns: ['clerkId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PlannedRecipe',
        index: 'PlannedRecipe_clerkId_date_idx_ee5b1f6c',
        columns: ['clerkId', 'date'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PlannedRecipe',
        index: 'PlannedRecipe_recipeId_idx_037d8d32',
        columns: ['recipeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Recipe',
        index: 'Recipe_clerkId_idx_610a6a63',
        columns: ['clerkId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RecipeIngredient',
        index: 'RecipeIngredient_ingredientId_idx_0bb57833',
        columns: ['ingredientId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'RecipeIngredient',
        index: 'RecipeIngredient_recipeId_idx_037d8d32',
        columns: ['recipeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItem',
        index: 'ShoppingListItem_clerkId_idx_610a6a63',
        columns: ['clerkId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItem',
        index: 'ShoppingListItem_ingredientId_idx_0bb57833',
        columns: ['ingredientId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItem',
        index: 'shopping_list_item_one_open_line_12fc15aa',
        columns: ['clerkId', 'ingredientId'],
        extras: { where: sql`(NOT "ticked" AND "ingredientId" IS NOT NULL)`, unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItemQuantity',
        index: 'ShoppingListItemQuantity_itemId_idx_41357140',
        columns: ['itemId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItemRecipe',
        index: 'ShoppingListItemRecipe_itemId_idx_41357140',
        columns: ['itemId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ShoppingListItemRecipe',
        index: 'ShoppingListItemRecipe_recipeId_idx_037d8d32',
        columns: ['recipeId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'PlannedRecipe',
        foreignKey: {
          name: 'PlannedRecipe_recipeId_fkey',
          columns: ['recipeId'],
          references: { schema: 'public', table: 'Recipe', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'RecipeIngredient',
        foreignKey: {
          name: 'RecipeIngredient_recipeId_fkey',
          columns: ['recipeId'],
          references: { schema: 'public', table: 'Recipe', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'RecipeIngredient',
        foreignKey: {
          name: 'RecipeIngredient_ingredientId_fkey',
          columns: ['ingredientId'],
          references: { schema: 'public', table: 'Ingredient', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ShoppingListItem',
        foreignKey: {
          name: 'ShoppingListItem_ingredientId_fkey',
          columns: ['ingredientId'],
          references: { schema: 'public', table: 'Ingredient', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ShoppingListItemQuantity',
        foreignKey: {
          name: 'ShoppingListItemQuantity_itemId_fkey',
          columns: ['itemId'],
          references: { schema: 'public', table: 'ShoppingListItem', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ShoppingListItemRecipe',
        foreignKey: {
          name: 'ShoppingListItemRecipe_itemId_fkey',
          columns: ['itemId'],
          references: { schema: 'public', table: 'ShoppingListItem', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ShoppingListItemRecipe',
        foreignKey: {
          name: 'ShoppingListItemRecipe_recipeId_fkey',
          columns: ['recipeId'],
          references: { schema: 'public', table: 'Recipe', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
