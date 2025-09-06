import proj4 from 'proj4';

// Definições Proj4 para os sistemas de coordenadas
// Fonte: https://epsg.io/
const definitions = {
  wgs84: '+proj=longlat +datum=WGS84 +no_defs',
  sirgas2000: '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs', // EPSG:4674
  sad69: '+proj=longlat +ellps=aust_SA +towgs84=-67.35,3.88,-38.22,0,0,0,0 +no_defs', // EPSG:4618
  corregoAlegre: '+proj=longlat +ellps=intl +towgs84=-66.87,4.37,-38.52,0,0,0,0 +no_defs', // EPSG:4225
};

export type CoordinateSystem = keyof typeof definitions;

/**
 * Converte um par de coordenadas de um sistema de origem para WGS 84.
 * @param lon Longitude de origem.
 * @param lat Latitude de origem.
 * @param fromSystem O sistema de coordenadas de origem ('sirgas2000', 'sad69', 'corregoAlegre').
 * @returns Um array com [longitude, latitude] em WGS 84.
 */
export const convertToWGS84 = (lon: number, lat: number, fromSystem: CoordinateSystem): [number, number] => {
  if (fromSystem === 'wgs84' || !definitions[fromSystem]) {
    return [lon, lat];
  }

  // proj4 espera [longitude, latitude]
  const sourceProjection = new proj4.Proj(definitions[fromSystem]);
  const destProjection = new proj4.Proj(definitions.wgs84);

  const convertedPoint = proj4(sourceProjection, destProjection, [lon, lat]);

  return [convertedPoint[0], convertedPoint[1]];
};