import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import placesData from "../../data/places.json"; // Import the JSON data

// Uzbekistan geographical center
const UZBEKISTAN_CENTER = [66.9237, 41.3775];

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // **REPLACE THIS WITH YOUR ACTUAL MAPTILER KEY/STYLE URL**
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8`,
      center: UZBEKISTAN_CENTER,
      zoom: 6,
      minZoom: 5,
      maxBounds: [
        [50, 30], // SW coordinates (far enough to cover neighbors)
        [80, 50], // NE coordinates
      ],
    });

    map.current.on("load", () => {
      setLoaded(true);

      // 1. Add markers from the JSON data
      placesData.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker"; // Use a custom CSS class for styling

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        // FUTURE STEP: Add click handler to navigate/open sidebar
        markerElement.addEventListener("click", () => {
          console.log(`Clicked on: ${place.name}`);
        });
      });
    });

    // Clean up map instance on component unmount
    return () => map.current?.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="map-container w-full h-full"
      style={{ height: "100vh", width: "100vw" }} // Full viewport coverage
    />
  );
};

export default MapContainer;
