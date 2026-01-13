import React from 'react';
import './App.css';
import MapView from './components/MapView';
import Toolbar from './components/Toolbar';
import { useMapFeatures } from './hooks/useMapFeatures';
import { exportGeoJSON } from './utils/geoJsonExport';
import { ToastContainer } from 'react-toastify';


function App() {
  const { features } = useMapFeatures();

  return (
     <>
      <Toolbar onExport={() => exportGeoJSON(features)} />
      <MapView />
      <ToastContainer position="top-right" autoClose={3000} />

      <ToastContainer
  position="top-center"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="colored"
/>
    </>
  );
}

export default App;