import { create } from "zustand";

const useGameState = create((set) => ({
  gameInProgress: false,
  removedCards: [],
  startGame: () => set((state) => ({ gameInProgress: true })),
  endGame: () => set((state) => ({ gameInProgress: false })),
  removeCard: (url) =>
    set((state) => ({ removedCards: [...state.removedCards, url] })),
}));

export default useGameState;
