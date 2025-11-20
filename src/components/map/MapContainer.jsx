import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore"; // <-- NEW IMPORT

// Uzbekistan geographical center
const UZBEKISTAN_CENTER = [66.9237, 41.3775];

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { openSidebar } = appStore(); // <-- NEW STATE HOOK

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8`,
      center: UZBEKISTAN_CENTER,
      zoom: 6,
      minZoom: 5,
      maxBounds: [
        [50, 30],
        [80, 50],
      ],
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker";

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        // POPUP AND SIDEBAR LOGIC
        markerElement.addEventListener("click", () => {
          // 1. Define the content for the popup, including a button
          const popupContent = `
            <div style="padding: 5px; max-width: 250px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${place.name}</h3>
              <p style="margin-bottom: 10px; font-size: 0.9em;">${place.description}</p>
              <button id="view-details-${place.id}" style="background-color: #4f46e5; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
                View Details
              </button>
            </div>
          `;

          // 2. Create and display the popup
          const popup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(place.coordinates)
            .setHTML(popupContent)
            .addTo(map.current);

          // 3. IMPORTANT: Set up the click handler for the button inside the popup
          popup.on("open", () => {
            document
              .getElementById(`view-details-${place.id}`)
              .addEventListener("click", () => {
                openSidebar(place.id); // Triggers the sidebar to open via Zustand
                popup.remove(); // Close the popup when the sidebar opens
              });
          });
        });
      });
    });

    return () => map.current?.remove();
  }, [openSidebar]); // Added openSidebar to dependency array

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default MapContainer;
