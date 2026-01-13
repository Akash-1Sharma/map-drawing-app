import { useState } from 'react';
import { MapFeature } from '../types/map';
import { Feature } from 'geojson';

export const useMapFeatures = () => {
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [backup, setBackup] = useState<Record<string, Feature>>({});

  const addFeature = (feature: MapFeature) => {
    setFeatures(prev => [...prev, feature]);
  };

  const backupFeature = (id: string, feature: Feature) => {
    setBackup(prev => ({ ...prev, [id]: feature }));
  };

  const deleteFeature = (id: string) => {
  setFeatures(prev => prev.filter(f => f.id !== id));
  setBackup(prev => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });
};

  const updateFeature = (id: string, newFeature: Feature) => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === id ? { ...f, feature: newFeature } : f
      )
    );
  };

  const restoreFeature = (id: string) => {
    if (!backup[id]) return;

    setFeatures(prev =>
      prev.map(f =>
        f.id === id ? { ...f, feature: backup[id] } : f
      )
    );
  };

  return {
    features,
    addFeature,
    backupFeature,
    updateFeature,
    restoreFeature,
    deleteFeature,

  };
};
