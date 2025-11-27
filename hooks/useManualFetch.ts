import { useQueryClient } from "@tanstack/react-query";
import { crudOperations } from "@/lib/crud";

export const useManualFetch = () => {
  const queryClient = useQueryClient();

  const fetchPage = async (page: number) => {
    return await queryClient.fetchQuery({
      queryKey: ["records", page],
      queryFn: () => crudOperations.read("/api/records", page, 10),
      staleTime: 5 * 60 * 1000,
    });
  };

  return { fetchPage };
};
