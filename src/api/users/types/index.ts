export interface User {
  id: string;
  name: string;
  password: string;
  coinAmount: number;
}

export interface LoginResponse {
  id: string;
  isAdmin: boolean;
  data: {
    id: string;
    isAdmin: boolean;
    coinAmount: number;
  };
}
