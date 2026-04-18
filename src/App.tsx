/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useGameStore } from "@/store/gameStore";
import HomeView from "./components/views/HomeView";
import MapView from "./components/views/MapView";
import LevelView from "./components/views/LevelView";
import ResultView from "./components/views/ResultView";

export default function App() {
  const currentView = useGameStore(state => state.currentView);

  return (
    <div className="w-full h-screen overflow-hidden bg-black selection:bg-blue-500/30">
      {currentView === 'home' && <HomeView />}
      {currentView === 'map' && <MapView />}
      {currentView === 'level' && <LevelView />}
      {currentView === 'result' && <ResultView />}
    </div>
  );
}
