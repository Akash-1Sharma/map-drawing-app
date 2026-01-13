import { Feature, Geometry } from 'geojson';

export interface MapFeature {
  id: string;
  feature: Feature<Geometry>;
  shapeType: 'polygon' | 'rectangle' | 'circle' | 'polyline';
}
