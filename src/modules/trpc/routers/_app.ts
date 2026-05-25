import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import categoriesRouter from "./categoriesRouter";
import authRouter from "./authRouter";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
