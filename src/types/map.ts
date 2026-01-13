import { Feature, Geometry } from 'geojson';
//Type of shape features on the map
export interface MapFeature {
  id: string;
  feature: Feature<Geometry>;
  shapeType: 'polygon' | 'rectangle' | 'circle' | 'polyline';
}
