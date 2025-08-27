import React from "react";
import SortingVisualizer from "./SortingVisualizer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white pt-10">
      {/* Increased top padding */}
      <h1 className="text-3xl font-bold mb-10">Sorting Algorithm Visualizer</h1>
      <SortingVisualizer />
    </div>
  );
}
