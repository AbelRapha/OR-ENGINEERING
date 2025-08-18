export interface GeocodedAddress {
  lat: string;
  lon: string;
  name: string;
}

const NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";
const OSRM_API_URL = "https://router.project-osrm.org/table/v1/driving/";
const API_HEADERS = { "User-Agent": "OR-Calculator/1.0 (a230424@dac.unicamp.br)" };

/**
 * Converte um endereço em coordenadas geográficas usando a API Nominatim.
 * @param address O endereço a ser geocodificado.
 * @returns Um objeto com latitude, longitude e nome do local, ou null se falhar.
 */
export const geocodeAddress = async (address: string): Promise<GeocodedAddress | null> => {
  const url = `${NOMINATIM_API_URL}?q=${encodeURIComponent(address)}&format=json&limit=1`;
  try {
    const response = await fetch(url, { headers: API_HEADERS });
    if (!response.ok) {
      console.error("Nominatim API error:", response.statusText);
      return null;
    }
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error geocoding address "${address}":`, error);
    return null;
  }
};

/**
 * Obtém as matrizes de distância e duração da API OSRM.
 * @param origins Array de origens geocodificadas.
 * @param destinations Array de destinos geocodificados.
 * @returns Um objeto contendo as matrizes de distâncias (metros) e durações (segundos).
 */
export const getRoutingMatrix = async (origins: GeocodedAddress[], destinations: GeocodedAddress[]) => {
  const allCoords = [...origins, ...destinations];
  const locations = allCoords.map(coord => `${coord.lon},${coord.lat}`).join(';');
  
  const sources = Array.from({ length: origins.length }, (_, i) => i).join(';');
  const destinationIndices = Array.from({ length: destinations.length }, (_, i) => i + origins.length).join(';');

  const url = `${OSRM_API_URL}${locations}?sources=${sources}&destinations=${destinationIndices}&annotations=distance,duration`;

  try {
    const response = await fetch(url, { headers: API_HEADERS });
    const data = await response.json();
    if (data.code !== "Ok") {
      throw new Error(data.message || "OSRM API returned an error");
    }
    return {
      distances: data.distances as number[][],
      durations: data.durations as number[][],
    };
  } catch (error) {
    console.error("Error getting OSRM matrix:", error);
    throw error;
  }
};