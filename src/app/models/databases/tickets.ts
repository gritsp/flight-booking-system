import { UUID } from "crypto";

export interface Tickets {
  id: UUID;
  flight_id: UUID;
  seat_type: string;
  passenger_id: UUID;
  seat_row: number;
  seat_column: number;
  price: number;
  created_at: number;
  updated_at: number;
}
