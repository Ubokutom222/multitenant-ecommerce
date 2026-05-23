import Link from "next/link";
import { Category } from "@/payload-types";
import { SingleCategoriesGetManyOutput } from "../../type";
interface Props {
  category: SingleCategoriesGetManyOutput;
  isOpen: boolean;
  position: {
    top: number;
    left: number;
  };
}

export function SubCategoryMenu(props: Props) {
  if (
    !props.isOpen ||
    !props.category.subcategories ||
    props.category.subcategories.length === 0
  )
    return null;
  const backgroundColor =
    props.category.color ??
    (typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#0a0a0a"
      : "#ffffff");

  return (
    <div
      className="fixed z-100"
      style={{ top: props.position.top, left: props.position.left }}
    >
      {/* INVISIBLE BRIDGE TO MAINTAIN HOVER */}
      <div className="h-3 w-60" />
      <div
        className="w-60 text-black rounded-md overflow-hidden border "
        style={{ backgroundColor }}
      >
        <div>
          {props.category.subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/${props.category.slug}/${sub.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
