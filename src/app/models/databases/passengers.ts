import { UUID } from "crypto";

export interface Passengers {
  id: UUID;
  first_name: string;
  last_name: string;
  created_at: number;
  updated_at: number;
}
