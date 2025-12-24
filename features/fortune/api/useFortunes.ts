"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getRandomFortune, saveFortune } from "./fortuneApi";
import type { SaveFortunePayload } from "../types/fortuneTypes";

// Fetch random fortune
export function useRandomFortune() {
  return useQuery({
    queryKey: ["fortune", "random"],
    queryFn: getRandomFortune,
    enabled: false, // only fetch when button clicked
  });
}

// Save fortune with name
export function useSaveFortune() {
  return useMutation({
    mutationFn: (payload: SaveFortunePayload) => saveFortune(payload),
  });
}
