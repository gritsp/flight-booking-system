import { UUID } from "crypto";

export interface Flights {
  id: UUID;
  origin: string;
  destination: string;
  departure: string;
  config_id: UUID;
  created_at: number;
  updated_at: number;
}
