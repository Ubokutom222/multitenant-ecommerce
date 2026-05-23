import { SingleCategoriesGetManyOutput } from "../../type";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SingleCategoriesGetManyOutput[];
}

export function CategoriesSidebar(props: Props) {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<
    SingleCategoriesGetManyOutput[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SingleCategoriesGetManyOutput | null>(null);

  // If we have parent categories, show those, otherwise show root categories
  const currentCategories = parentCategories ?? props.data ?? [];

  function handleOpenChange(open: boolean) {
    setSelectedCategory(null);
    setParentCategories(null);
    props.onOpenChange(open);
  }

  function handleCategoryClick(category: SingleCategoriesGetManyOutput) {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug == "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  }

  const backgroundColor =
    selectedCategory?.color ??
    (typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#0a0a0a"
      : "#ffffff");

  return (
    <Sheet open={props.open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {
                setParentCategories(null);
                setSelectedCategory(null);
              }}
              className="w-full text-left p-4 hover:bg-foreground hover:text-background flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                handleCategoryClick(cat);
              }}
              className="cursor-pointer w-full text-left p-4 hover:bg-foreground hover:text-background flex justify-between items-center text-base font-medium"
            >
              {cat.name}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
