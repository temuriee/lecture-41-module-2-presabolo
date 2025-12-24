import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "./templates";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
}
