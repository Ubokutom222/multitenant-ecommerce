"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/payload-types";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useDropdownPostion } from "./use-dropdown-position";
import { SubCategoryMenu } from "./SubcategoryMenu";
import Link from "next/link";
import { SingleCategoriesGetManyOutput } from "../../type";
interface Props {
  category: SingleCategoriesGetManyOutput;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export function CategoryDropdown(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { getDropdownPostion } = useDropdownPostion(dropdownRef);

  const dropdownPosition = getDropdownPostion();

  function onMouseEnter() {
    if (props.category.subcategories) {
      setIsOpen(true);
    }
  }

  function onMouseLeave() {
    setIsOpen(false);
  }
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-foreground hover:border-primary text-foreground hover:text-background",
            props.isActive &&
              !props.isNavigationHovered &&
              "bg-foreground border-primary text-background",
            isOpen && "bg-foreground border-primary text-background",
          )}
        >
          <Link
            href={`/${props.category.slug === "all" ? "" : props.category.slug}`}
          >
            {props.category.name}
          </Link>
        </Button>
        {props.category.subcategories &&
          props.category.subcategories.length > 0 && (
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-b-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-foreground left-1/2 -translate-x-1/2",
                isOpen && "opacity-100",
              )}
            ></div>
          )}
      </div>
      <SubCategoryMenu
        category={props.category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
}
