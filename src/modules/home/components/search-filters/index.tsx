"use client";
import { SearchInput } from "./SearchInput";
import { Categories } from "./Categories";

export function SearchFilters() {
  const backgroundColor =
    // selectedCategory?.color ??
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#ffffff"
      : "#0a0a0a";

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
}

export function SearchFiltersLoading() {
  const backgroundColor =
    // selectedCategory?.color ??
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#ffffff"
      : "#0a0a0a";

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor }}
    >
      <SearchInput isDisabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
}
