Map Drawing Application (React + TypeScript)

A frontend web application built with React.js and TypeScript that renders OpenStreetMap free tiles and allows users to draw, edit, manage, and export spatial features while enforcing non-overlapping polygon rules.

This project demonstrates frontend engineering skills, spatial reasoning, clean code structure, and good UX practices.

Live Demo

Hosted Link:
(Add your Vercel / Netlify / GitHub Pages URL here)

Tech Stack

React.js (with TypeScript)

Leaflet & react-leaflet

react-leaflet-draw (drawing & editing tools)

Turf.js (spatial operations)

React Toastify (UI notifications)

OpenStreetMap (free map tiles)

Features
Map Rendering

OpenStreetMap free tiles

Smooth zooming and panning

Clean, responsive UI

Drawing Tools

Users can draw:

Polygon

Rectangle

Circle

Line String

Drawing tools are available via an inline toolbar (no modal popups).

Spatial Constraints (Core Logic)
Non-Overlapping Rule (Polygonal Shapes Only)

Applies to:

Polygon

Rectangle

Circle (converted to polygon internally)

Rules:

Full enclosure is blocked (error shown)

Partial overlap is auto-trimmed

Valid shapes are accepted

Line Strings

Line Strings are excluded from overlap rules

They can freely cross or overlap any shape

Circle Handling (Important Detail)

Leaflet circles are not true GeoJSON shapes.
To enable accurate spatial checks:

Circles are converted into polygon buffers using Turf.js

All overlap logic works on polygon geometry

Editing & Validation

Shapes can be edited

On edit:

Geometry is backed up

Rules are re-validated

Invalid edits are rolled back automatically

Line edits are always allowed

Deleting Shapes

Single or multiple shapes can be deleted

State stays fully synchronized

Clean UX with one toast notification per delete action

Export GeoJSON

Export all drawn features as a GeoJSON file

Includes:

Geometry

Shape type as a property

Suitable for GIS tools like QGIS or Mapbox

Dynamic Configuration

Maximum allowed shapes per type can be changed easily in code:

// src/config/shapeLimits.ts
export const SHAPE_LIMITS = {
  polygon: 10,
  rectangle: 5,
  circle: 5,
  polyline: 20,
};


No hard-coded limits in logic.

Polygon Overlap Logic (Explanation)

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
