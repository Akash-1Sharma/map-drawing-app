import * as turf from '@turf/turf';
import { Feature, Polygon, MultiPolygon } from 'geojson';
import { notifyError } from './toast';

/**
 * Converts Leaflet Circle to Turf Polygon using buffer
 */
export const circleToPolygon = (
  center: [number, number],
  radiusInMeters: number
): Feature<Polygon> => {
  return turf.buffer(
    turf.point(center),
    radiusInMeters,
    { units: 'meters' }
  ) as Feature<Polygon>;
};

/**
 * Handles overlap between polygon-like features
 */
export const handlePolygonOverlap = (
  newFeature: Feature<Polygon | MultiPolygon>,   // ✅ FIXED
  existing: Feature<Polygon | MultiPolygon>[]
): Feature<Polygon | MultiPolygon> | null => {

  for (const poly of existing) {

    // ❌ Full enclosure
    if (turf.booleanContains(newFeature, poly)) {
      notifyError('Shape cannot fully enclose another shape');
      return null;
    }

    // ✂ Any intersection → auto-trim
    if (turf.booleanIntersects(newFeature, poly)) {
      const diff = turf.difference(
        turf.featureCollection([newFeature, poly])
      );

      if (!diff) return null;
      return diff as Feature<Polygon | MultiPolygon>;
    }
  }

  return newFeature;
};
