import { useQuery, useQueryClient } from "@tanstack/react-query";
import { crudOperations } from "@/lib/crud";
import { User } from "@/lib/crud";

export const useRecords = (initialPage: number = 1) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["records", initialPage],
    queryFn: () => crudOperations.read("/api/records", initialPage, 10),
    staleTime: 5 * 60 * 1000,
    // Use prefetched data if available
    initialData: () => {
      return queryClient.getQueryData(["records", initialPage]);
    },
  });

  // Smart prefetching when 60% records are consumed
  const prefetchNextPage = (currentIndex: number, loadedRecords: User[]) => {
    if (!data?.hasMore || isFetching) return;

    const sixtyPercentThreshold = Math.floor(loadedRecords.length * 0.6);

    // Only prefetch if we're at 60% AND we haven't already loaded the next page
    if (currentIndex >= sixtyPercentThreshold) {
      const nextPage = data.currentPage + 1;

      // Check if we already have the next page data
      const nextPageData = queryClient.getQueryData(["records", nextPage]);
      if (!nextPageData && data.hasMore) {
        // Prefetch next page
        queryClient.prefetchQuery({
          queryKey: ["records", nextPage],
          queryFn: () => crudOperations.read("/api/records", nextPage, 10),
          staleTime: 5 * 60 * 1000,
        });
      }
    }
  };

  return {
    records: data?.records || [],
    totalCount: data?.totalCount || 0,
    hasMore: data?.hasMore || false,
    currentPage: data?.currentPage || 1,
    isLoading: isLoading && !data, // Only show loading if no data at all
    isFetching,
    error,
    prefetchNextPage,
  };
};
