"use client";
import { Category } from "@/payload-types";
import { CategoryDropdown } from "./CategoryDropdown";
import { CategoriesSidebar } from "./CategoriesSidebar";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SingleCategoriesGetManyOutput } from "../../type";

import { trpc } from "@/modules/trpc/client";

export function Categories() {
  const [data] = trpc.categories.getMany.useSuspenseQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Active Category
  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory,
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    function calculateVisible() {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children) as HTMLDivElement[];
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;

        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    }

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);
  return (
    <div className="relative w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
            />
          </div>
        ))}
      </div>
      {/* Visisble Items */}
      <div
        className="flex flex-nowrap items-center"
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-foreground hover:border-primary text-foreground hover:text-background",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-background border-primary",
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
}
