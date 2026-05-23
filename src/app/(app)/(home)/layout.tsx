import { Navbar } from "@/modules/home/components/Navbar";
import {
  SearchFilters,
  SearchFiltersLoading,
} from "@/modules/home/components/search-filters";
import { Footer } from "@/components/Footer";
import { trpc, HydrateClient } from "@/modules/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  children: React.ReactNode;
}
export default async function HomeLayout(props: Props) {
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<SearchFiltersLoading />}>
            <SearchFilters />
          </Suspense>
        </ErrorBoundary>
        <div className="flex-1 bg-background-muted">{props.children}</div>
        <Footer />
      </div>
    </HydrateClient>
  );
}
