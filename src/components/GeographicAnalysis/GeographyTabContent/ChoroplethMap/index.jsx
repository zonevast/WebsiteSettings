"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import IraqJson from "./Iraq.topo.json";
import { useTheme } from "next-themes";

const ChoroplethMap = ({ data }) => {
  const mapContainerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Load Datamap inside useEffect to ensure this only runs client-side.
    const Datamap = require("datamaps/dist/datamaps.world.min.js");

    if (!data || data.length === 0) {
      console.error("No data provided for the map.");
      return;
    }

    // Build dataset for Datamap
    const dataset = {};
    const values = data.map((item) => item[1]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Color scales for light and dark modes
    const lightModeColors = ["#7C3AED33", "#7C3AED"];
    const darkModeColors = ["#431575", "#B388FF"];

    const paletteScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range(isDark ? darkModeColors : lightModeColors);

    data.forEach(([iso, value]) => {
      dataset[iso] = {
        numberOfThings: value,
        fillColor: paletteScale(value),
      };
    });

    // Create custom popup styles
    const customPopupStyles = ` 
      .hoverinfo {
        padding: 10px;
        border-radius: 8px;
        background-color: ${isDark ? "#1f2937" : "#ffffff"};
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        border: 1px solid ${isDark ? "#374151" : "#e5e7eb"};
        color: ${isDark ? "#e5e7eb" : "#1f2937"};
        font-family: system-ui, -apple-system, sans-serif;
      }
      .hoverinfo-title {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 4px;
      }
      .hoverinfo-content {
        font-size: 12px;
      }
    `;

    // Append the custom styles to the document
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customPopupStyles;
    document.head.appendChild(styleSheet);

    // Initialize the Datamap
    const map = new Datamap({
      element: mapContainerRef.current,
      scope: "iraq",
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: isDark ? "#4B5563" : "#9CA3AF",
        highlightBorderWidth: 2,
        highlightFillColor: isDark ? "#4B5563" : "#E5E7EB",
        highlightBorderColor: isDark ? "#9CA3AF" : "#6B7280",
        borderWidth: 1,
        dataJson: IraqJson,
        popupTemplate: (geo, data) => {
          if (!data)
            return `
              <div class="hoverinfo">
                <div class="hoverinfo-title">${geo.properties.name}</div>
                <div class="hoverinfo-content">No data available</div>
              </div>`;
          return `
              <div class="hoverinfo">
                <div class="hoverinfo-title">${geo.properties.name}</div>
                <div class="hoverinfo-content">
                  Orders: <strong>${data.numberOfThings.toLocaleString()}</strong>
                </div>
              </div>`;
        },
      },
      fills: {
        defaultFill: isDark ? "#1F2937" : "#F3F4F6",
      },
      data: dataset,
      setProjection: (element) => {
        const projection = d3
          .geoMercator()
          .center([44.0, 33.0])
          .scale(2000)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        const path = d3.geoPath().projection(projection);
        return { path, projection };
      },
    });

    // Create a stable resize callback
    const handleResize = () => {
      if (map && map.resize) {
        map.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Safely clean up the map if it exists
      if (map && map.svg && typeof map.svg.remove === "function") {
        map.svg.remove();
      }
      styleSheet.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, isDark]);

  return (
    <div
      ref={mapContainerRef}
      className={`relative rounded-xl overflow-hidden transition-colors duration-200 ${
        isDark ? "bg-gray-800" : "bg-gray-50"
      }`}
      style={{
        height: "400px",
        width: "100%",
      }}
    />
  );
};

export default ChoroplethMap;
