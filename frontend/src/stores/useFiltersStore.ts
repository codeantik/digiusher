import { create } from "zustand";

interface FilterState {
  cloudType: string;
  region: string;
  minRam: number;
  maxRam: number;
  minCpu: number;
  maxCpu: number;
  setFilters: (filters: Partial<FilterState>) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  cloudType: "AWS",
  region: "eu-west-1",
  minRam: 0,
  maxRam: 128,
  minCpu: 1,
  maxCpu: 64,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
