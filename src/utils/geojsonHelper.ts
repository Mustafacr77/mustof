export interface GeoJSONFeatureProperties {
  eraId: string;
  name: string;
  color: string;
  label: string;
  labelCoord: [number, number];
}

export interface GeoJSONPolygonGeometry {
  type: 'Polygon';
  coordinates: [number, number][][]; // [[[longitude, latitude], ...]]
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: GeoJSONFeatureProperties;
  geometry: GeoJSONPolygonGeometry;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

/**
 * Converts a list of political territories with [lat, lng] coordinates
 * into standard GeoJSON FeatureCollection with [lng, lat] coordinates,
 * ensuring standard polygon ring closure.
 */
export function convertTerritoriesToGeoJSON(territories: {
  eraId: string;
  name: string;
  color: string;
  label: string;
  labelCoord: [number, number];
  coordinates: [number, number][];
}[]): GeoJSONFeatureCollection {
  const features: GeoJSONFeature[] = territories.map(t => {
    // 1. Map [lat, lng] to [lng, lat] for standard GeoJSON compatibility
    const geoJsonCoords: [number, number][] = t.coordinates.map(coord => [coord[1], coord[0]]);

    // 2. Ensure standard GeoJSON closure (first and last coordinate must be identical)
    if (geoJsonCoords.length > 0) {
      const first = geoJsonCoords[0];
      const last = geoJsonCoords[geoJsonCoords.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        geoJsonCoords.push([first[0], first[1]]);
      }
    }

    return {
      type: 'Feature',
      properties: {
        eraId: t.eraId,
        name: t.name,
        color: t.color,
        label: t.label,
        labelCoord: t.labelCoord
      },
      geometry: {
        type: 'Polygon',
        coordinates: [geoJsonCoords]
      }
    };
  });

  return {
    type: 'FeatureCollection',
    features
  };
}
