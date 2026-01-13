Map Drawing Application (React + TypeScript)

A frontend web application built with React.js and TypeScript that renders OpenStreetMap free tiles and allows users to draw, edit, manage, and export spatial features while enforcing non-overlapping polygon rules.

This project demonstrates frontend engineering skills, spatial reasoning, clean code structure, and good UX practices.

Live Demo

Hosted Link:

Tech Stack
React.js (with TypeScript)
Leaflet & react-leaflet
react-leaflet-draw (drawing & editing tools)
Turf.js (spatial operations)
React Toastify (UI notifications)
OpenStreetMap (free map tiles)

Features
1.Map Rendering
2.OpenStreetMap free tiles
3.Smooth zooming and panning
4.Clean, responsive UI
4.Drawing Tools

=>Users can draw:
1.Polygon
2.Rectangle
3.Circle
4.Line String


Spatial Constraints (Core Logic)
Non-Overlapping Rule (Polygonal Shapes Only)
Applies to:
Polygon
Rectangle
Circle (converted to polygon internally)

Rules:
1.Full enclosure is blocked (error shown)
2.Partial overlap is auto-trimmed
3.Valid shapes are accepted
4.Line Strings
5.Line Strings are excluded from overlap rules
They can freely cross or overlap any shape

Shape Limits can be changed easily in the code
// src/config/shapeLimits.ts
export const SHAPE_LIMITS = {
  polygon: 10,
  rectangle: 5,
  circle: 5,
  polyline: 20,
};


No hard-coded limits in logic.
Polygon Overlap Logic

The overlap logic is implemented using Turf.js:
Convert all polygon-like shapes into GeoJSON polygons
For each new or edited shape:
Check full enclosure using booleanContains
Check any intersection using booleanIntersects
If intersection exists:
Use turf.difference() to auto-trim overlapping area
If fully enclosed:
Block creation/edit and show error
This ensures spatial correctness while maintaining good UX.
Code is organized for clarity, scalability, and maintainability.

Setup & Run Locally
Clone Repository
git clone https://github.com/<your-username>/map-drawing-app.git
cd map-drawing-app

Install Dependencies
npm install

Start Development Server
npm start


App runs at:
👉 http://localhost:3000

📄 Sample GeoJSON Output
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      },
      "properties": {
        "shapeType": "polygon"
      }
    }
  ]
}

UI & UX Highlights

Floating instruction panel

Color-coded shapes

Toast notifications (no blocking alerts)

Clean, professional layout

Smooth interaction flow

👤 Author

Akash Sharma
Frontend Developer

GitHub: https://github.com/Akash-1Sharma
