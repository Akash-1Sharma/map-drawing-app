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
 * - Blocks full enclosure
 * - Auto-trims partial overlaps (cumulative)
 */
export const handlePolygonOverlap = (
  newFeature: Feature<Polygon | MultiPolygon>,
  existing: Feature<Polygon | MultiPolygon>[]
): Feature<Polygon | MultiPolygon> | null => {

  let current: Feature<Polygon | MultiPolygon> = newFeature;

  for (const poly of existing) {

    // ❌ Full enclosure → block
    if (turf.booleanContains(current, poly)) {
      notifyError('Shape cannot fully enclose another shape');
      return null;
    }

    // ✂ Trim only real overlaps
    if (turf.booleanOverlap(current, poly)) {
      const diff = turf.difference(
        turf.featureCollection([current, poly])
      );

      if (!diff) {
        return null;
      }

      current = diff as Feature<Polygon | MultiPolygon>;
    }
  }

  return current;
};
