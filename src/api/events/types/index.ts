export interface Event {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  coinReward: number;
  dateFrom: string;
  dateTo: string;
  location: EventLocation;
}

export interface EventLocation {
  id: string;
  name: string;
  address: string;
}

export interface CreateEvent {
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  coinReward: number;
  type: string;
  tags: string[];
  dateFrom: string;
  dateTo: string;
  locationId: string;
}
