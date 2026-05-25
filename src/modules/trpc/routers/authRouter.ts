import { baseProcedure, createTRPCRouter } from "@/modules/trpc/init";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { registerSchema, loginSchema } from "../../schemas";
import { TRPCError } from "@trpc/server";

const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.payload.create({
        collection: "users",
        data: input,
      });
      const data = await ctx.payload.login({
        collection: "users",
        data: input,
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login after registration",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: `${ctx.payload.config.cookiePrefix}-token`,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: Ensure cross-domain cookies work in production by setting the correct domain and secure flag
      });

      return data;
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: input,
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    const cookies = await getCookies();
    cookies.set({
      name: `${ctx.payload.config.cookiePrefix}-token`,
      value: data.token,
      httpOnly: true,
      path: "/",
      // TODO: Ensure cross-domain cookies work in production by setting the correct domain and secure flag
    });
    return data;
  }),
});

export default authRouter;
