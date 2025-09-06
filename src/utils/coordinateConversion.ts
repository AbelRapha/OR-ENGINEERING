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

/**
 * Converte uma string de Graus, Minutos, Segundos (DMS) para Graus Decimais (DD).
 * @param dms A string DMS, ex: "23° 40' 50\"" ou "-23 40 50.5".
 * @returns O valor em graus decimais.
 * @throws Lança um erro se o formato da string for inválido.
 */
export const dmsToDd = (dms: string): number => {
  const dmsString = dms.trim();
  // Regex para capturar graus, minutos e segundos com vários separadores e símbolos.
  const regex = /(-?)(\d{1,3})[°º\s]+(\d{1,2})['’\s]+([\d.]+)[\"”]?\s*$/i;
  const parts = dmsString.match(regex);

  if (!parts) {
    throw new Error(`Formato de coordenada DMS inválido: "${dms}"`);
  }

  const sign = parts[1] === '-' ? -1 : 1;
  const degrees = parseFloat(parts[2]);
  const minutes = parseFloat(parts[3]);
  const seconds = parseFloat(parts[4]);

  if (isNaN(degrees) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error(`Componente de coordenada DMS inválido: "${dms}"`);
  }
  
  if (minutes >= 60 || seconds >= 60) {
    throw new Error(`Minutos ou segundos inválidos em DMS: "${dms}". Devem ser menores que 60.`);
  }

  const dd = degrees + minutes / 60 + seconds / 3600;

  return sign * dd;
};

/**
 * Converte radianos para graus decimais.
 * @param rad O valor em radianos.
 * @returns O valor em graus decimais.
 */
export const radToDd = (rad: number): number => {
  return rad * (180 / Math.PI);
};