import { saveAs } from 'file-saver';
import { FeatureCollection } from 'geojson';
import { MapFeature } from '../types/map';

export const exportGeoJSON = (features: MapFeature[]) => {
  const geoJson: FeatureCollection = {
    type: 'FeatureCollection',
    features: features.map(f => ({
      ...f.feature,
      properties: {
        shapeType: f.shapeType,
      },
    })),
  };

  const blob = new Blob([JSON.stringify(geoJson, null, 2)], {
    type: 'application/json',
  });

  saveAs(blob, 'map-features.geojson');
};
