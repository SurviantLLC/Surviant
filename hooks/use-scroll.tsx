"use client"

import { create } from "zustand"

interface ScrollState {
  scrollY: number
  scrollTarget: number
  setScrollY: (scrollY: number) => void
  setScrollTarget: (scrollTarget: number) => void
}

export const useScroll = create<ScrollState>((set) => ({
  scrollY: 0,
  scrollTarget: 0,
  setScrollY: (scrollY) => set({ scrollY }),
  setScrollTarget: (scrollTarget) => set({ scrollTarget }),
}))
