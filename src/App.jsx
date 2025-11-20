import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar";
import appStore from "./store/appStore";

function App() {
  const { isSidebarOpen } = appStore();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Map always in the background */}
      <MapContainer />

      {/* Sidebar is rendered, its visibility is controlled by its CSS/state */}
      <Sidebar />
    </div>
  );
}

export default App;
