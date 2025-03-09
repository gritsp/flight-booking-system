import { UUID } from "crypto";

export interface Seats {
  id: UUID;
  flight_id: UUID;
  type: string;
  price: number;
  total_available: number;
  total_booked: number;
  created_at: number;
  updated_at: number;
}
