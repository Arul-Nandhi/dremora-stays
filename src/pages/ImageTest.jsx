import React from 'react';
import { images } from "../data/assets";

export default function ImageTest() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🧪 Image Test Page</h2>

      <h3>Banners</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.banners.map((img, i) => (
          <img key={i} src={img} width="200" />
        ))}
      </div>

      <h3>Rooms</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.rooms.map((img, i) => (
          <img key={i} src={img} width="200" />
        ))}
      </div>
    </div>
  );
}
