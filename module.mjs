// @ts-check
import { module } from "@prisma/composer";
import mealprepDemoService from "./service.mjs";

export default module("mealprep-demo", ({ provision }) => {
  provision(mealprepDemoService, { id: "mealprepdemo" });
});
