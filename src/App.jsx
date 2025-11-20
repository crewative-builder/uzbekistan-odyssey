import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapContainer from "./components/map/MapContainer";
import Sidebar from "./components/ui/Sidebar"; // We will create this next
import appStore from "./store/appStore";

function App() {
  const { isSidebarOpen } = appStore();

  return (
    <Router basename="/uzbekistan-odyssey/">
      {" "}
      {/* IMPORTANT: This enables correct routing on GitHub Pages */}
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Map always in the background */}
        <MapContainer />

        {/* Sidebar conditionally rendered based on state */}
        {isSidebarOpen && <Sidebar />}

        {/* Routes for deep linking/URL changes (will be invisible, but handle the logic) */}
        <Routes>
          <Route path="/" element={null} />
          <Route path="/place/:id" element={null} />{" "}
          {/* /place/samarkand-registan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
