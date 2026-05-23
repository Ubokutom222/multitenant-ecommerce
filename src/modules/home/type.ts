import { Category } from "@/payload-types";
import { inferRouterOutputs } from "@trpc/server";
import categoriesRouter from "@/modules/trpc/routers/categoriesRouter";
import { AppRouter } from "@/modules/trpc/routers/_app";

type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type SingleCategoriesGetManyOutput = CategoriesGetManyOutput[0];
