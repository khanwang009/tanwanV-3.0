import { create } from 'zustand';

interface GameState {
  currentView: 'home' | 'map' | 'level' | 'result';
  currentUnit: string | null;
  currentNode: string | null;
  stars: number;
  completedNodes: string[];
  
  // Actions
  setView: (view: 'home' | 'map' | 'level' | 'result') => void;
  startNode: (unitId: string, nodeId: string) => void;
  completeNode: (nodeId: string, earnedStars: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentView: 'home',
  currentUnit: null,
  currentNode: null,
  stars: 0,
  completedNodes: [],

  setView: (view) => set({ currentView: view }),
  
  startNode: (unitId, nodeId) => set({ 
    currentView: 'level',
    currentUnit: unitId,
    currentNode: nodeId
  }),

  completeNode: (nodeId, earnedStars) => set((state) => ({
    currentView: 'result',
    completedNodes: state.completedNodes.includes(nodeId) 
      ? state.completedNodes 
      : [...state.completedNodes, nodeId],
    stars: state.stars + earnedStars
  })),
}));
