import { create } from "zustand";

// Zustand is a simple state management tool.
// It controls the app's current mode (2D or 3D) and which place is selected.

const appStore = create((set) => ({
  // State variables
  selectedPlaceId: null, // Holds the ID of the currently selected place (e.g., 'samarkand-registan')
  isSidebarOpen: false,
  currentMode: "2D", // Future use: '2D' or '3D'

  // Actions (Functions to update the state)
  setSelectedPlace: (id) =>
    set((state) => ({
      selectedPlaceId: id,
      isSidebarOpen: true,
    })),

  closeSidebar: () =>
    set({
      isSidebarOpen: false,
      selectedPlaceId: null,
    }),

  // Future use: Toggle between 2D and 3D
  toggleMode: () =>
    set((state) => ({
      currentMode: state.currentMode === "2D" ? "3D" : "2D",
      isSidebarOpen: false, // Close sidebar when toggling view
    })),
}));

export default appStore;
