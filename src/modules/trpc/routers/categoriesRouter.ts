import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "../init";

const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    type formattedType = {
      subcategories?: {
        subcategories: undefined;
        id: number;
        name: string;
        slug: string;
        color?: string | null | undefined;
        parent?: number | Category | null | undefined;
        updatedAt: string;
        createdAt: string;
      }[];
      id: number;
      name: string;
      slug: string;
      color?: string | null;
      parent?: (number | null) | Category;
      updatedAt: string;
      createdAt: string;
    }[];

    const formattedData: formattedType = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
        ...(sub as Category),
        subcategories: undefined, // Avoid nesting beyond one level
      })),
    }));
    return formattedData;
  }),
});

export default categoriesRouter;
