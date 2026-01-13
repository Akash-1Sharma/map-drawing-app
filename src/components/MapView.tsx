import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import { Feature, Polygon, MultiPolygon } from 'geojson';
import { useRef } from 'react';


import { useMapFeatures } from '../hooks/useMapFeatures';
import { SHAPE_LIMITS } from '../config/shapeLimits';
import {
  handlePolygonOverlap,
  circleToPolygon,
} from '../utils/spatialUtils';
import {
  notifyError,
  notifyWarning,
  notifySuccess,
} from '../utils/toast';
import MapToolbar from './MapToolbar';
import AppHeader from './AppHeader';

type ShapeType = 'polygon' | 'rectangle' | 'circle' | 'polyline';

const MapView = () => {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const {
    features,
    addFeature,
    backupFeature,
    updateFeature,
    restoreFeature,
    deleteFeature,
  } = useMapFeatures();

  /* ================= CREATE ================= */

  const onCreated = (e: any) => {
    const layer = e.layer as any;

    let geoJson = layer.toGeoJSON() as Feature;
    let shapeType: ShapeType | null = null;

    if (layer instanceof L.Circle) shapeType = 'circle';
    else if (layer instanceof L.Rectangle) shapeType = 'rectangle';
    else if (layer instanceof L.Polygon) shapeType = 'polygon';
    else if (layer instanceof L.Polyline) shapeType = 'polyline';

    /* 🚫 Shape limit check */
    const count = features.filter(f => f.shapeType === shapeType).length;
    if (shapeType && count >= SHAPE_LIMITS[shapeType]) {
      notifyWarning(`Maximum ${shapeType} limit reached`);
      layer.remove();
      return;
    }

    /* 🧠 Overlap logic */
    if (
      shapeType &&
      ['polygon', 'rectangle', 'circle'].includes(shapeType)
    ) {
      let polygonForCheck: Feature<Polygon | MultiPolygon>;

      if (layer instanceof L.Circle) {
        polygonForCheck = circleToPolygon(
          [layer.getLatLng().lng, layer.getLatLng().lat],
          layer.getRadius()
        );
      } else {
        polygonForCheck = geoJson as Feature<Polygon | MultiPolygon>;
      }

      const existingPolygons = features
        .filter(f =>
          ['polygon', 'rectangle', 'circle'].includes(f.shapeType)
        )
        .map(f => f.feature as Feature<Polygon | MultiPolygon>);

      const processed = handlePolygonOverlap(
        polygonForCheck,
        existingPolygons
      );

      if (!processed) {
        layer.remove();
        return;
      }

      geoJson.geometry = processed.geometry;
    }

    const id = Date.now().toString();
    layer._featureId = id;

    addFeature({
      id,
      feature: geoJson,
      shapeType: shapeType as ShapeType,
    });

    notifySuccess(`${shapeType} added successfully`);
  };

  /* ================= EDIT START ================= */

  const onEditStart = () => {
  const fg = featureGroupRef.current;
  if (!fg) return;

  fg.eachLayer((layer: any) => {
    if (!layer._featureId) return;
    backupFeature(layer._featureId, layer.toGeoJSON());
  });
};


  /* ================= EDIT END ================= */

  const onEdited = (e: any) => {
    e.layers.eachLayer((layer: any) => {
      const id = layer._featureId;
      if (!id) return;

      const featureMeta = features.find(f => f.id === id);
      if (!featureMeta) return;

      let geoJson = layer.toGeoJSON() as Feature;

      if (featureMeta.shapeType === 'polyline') {
        updateFeature(id, geoJson);
        notifySuccess('Line updated');
        return;
      }

      let polygonForCheck: Feature<Polygon | MultiPolygon>;

      if (layer instanceof L.Circle) {
        polygonForCheck = circleToPolygon(
          [layer.getLatLng().lng, layer.getLatLng().lat],
          layer.getRadius()
        );
      } else {
        polygonForCheck = geoJson as Feature<Polygon | MultiPolygon>;
      }

      const otherPolygons = features
        .filter(
          f =>
            f.id !== id &&
            ['polygon', 'rectangle', 'circle'].includes(f.shapeType)
        )
        .map(f => f.feature as Feature<Polygon | MultiPolygon>);

      const processed = handlePolygonOverlap(
        polygonForCheck,
        otherPolygons
      );

      if (!processed) {
        notifyError('Edit not allowed due to overlap rules');
        restoreFeature(id);
        layer.remove();
        return;
      }

      geoJson.geometry = processed.geometry;
      updateFeature(id, geoJson);
      notifySuccess('Shape updated');
    });
  };

  /* ================= DELETE ================= */

const onDeleted = (e: any) => {
  let deletedCount = 0;

  e.layers.eachLayer((layer: any) => {
    const id = layer._featureId;
    if (!id) return;

    deleteFeature(id);
    deletedCount++;
  });

  if (deletedCount > 0) {
    notifySuccess(
      deletedCount === 1
        ? 'Shape deleted'
        : `${deletedCount} shapes deleted`
    );
  }
};



  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={13}
      style={{ height: '100vh' }}
    >
      <MapToolbar />

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup ref={featureGroupRef}>

        <EditControl
          position="topright"
          onCreated={onCreated}
          onEditStart={onEditStart}
          onEdited={onEdited}
          onDeleted={onDeleted}
          draw={{
  polyline: {
    shapeOptions: { color: '#1e88e5', weight: 4 },
  },
  polygon: {
    shapeOptions: { color: '#43a047', fillOpacity: 0.4 },
  },
  rectangle: {
    shapeOptions: { color: '#f4511e', fillOpacity: 0.4 },
  },
  circle: {
    shapeOptions: { color: '#8e24aa', fillOpacity: 0.4 },
  },
  marker: false,
  circlemarker: false,
}}

        />
      </FeatureGroup>
      <AppHeader />
    </MapContainer>
    
  );
};

export default MapView;
