export interface CreateLocation {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}
export interface Location {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  events: Event[];
}

export interface LocationEvent {
  id: string;
  name: string;
}
