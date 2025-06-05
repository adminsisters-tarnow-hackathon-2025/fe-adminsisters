export interface Event {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  coinReward: number;
  image: string;
  dateFrom: string;
  dateTo?: string;
  location: EventLocation;
}

export interface EventLocation {
  id: string;
  name: string;
  address: string;
}
