import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Globe } from "lucide-react";
import appStore from "../../store/appStore";
import placesData from "../../data/places.json"; // Re-use the data

const Sidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL (/place/:id)
  const { selectedPlaceId, closeSidebar } = appStore();

  // Find the place data using the ID from the store/URL
  const place = placesData.find((p) => p.id === (selectedPlaceId || id));

  // If no place is found or sidebar is somehow opened incorrectly, close it
  useEffect(() => {
    if (!place) {
      closeSidebar();
      navigate("/");
    }
  }, [place, closeSidebar, navigate]);

  if (!place) return null; // Don't render if data is missing

  const handleClose = () => {
    closeSidebar();
    navigate("/"); // Navigate back to the main URL
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-slate-900/95 backdrop-blur-sm shadow-2xl z-20 transition-transform duration-300 transform translate-x-0">
      <div className="p-6 h-full flex flex-col">
        {/* Header and Close Button */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
          <h2 className="text-3xl font-serif text-amber-300">{place.name}</h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Placeholder (Future) */}
        <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <Globe size={64} className="text-slate-600" />
        </div>

        {/* Content */}
        <p className="text-slate-300 mb-6 flex-grow">{place.description}</p>

        {/* Footer/Action Button */}
        <div className="mt-auto">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-150 shadow-lg"
            onClick={() => console.log("Future: Enter 3D View")}
          >
            Enter 3D View (Phase 3)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
