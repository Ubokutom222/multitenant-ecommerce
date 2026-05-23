"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon, ListFilterIcon } from "lucide-react";
import { SingleCategoriesGetManyOutput } from "../../type";
import { CategoriesSidebar } from "./CategoriesSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/modules/trpc/client";
interface Props {
  isDisabled?: boolean;
}
export function SearchInput(props: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data] = trpc.categories.getMany.useSuspenseQuery();
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          className="pl-8"
          placeholder="Search products..."
          disabled={props.isDisabled}
        />
      </div>
      <Button
        className="size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add Library Button */}
    </div>
  );
}
