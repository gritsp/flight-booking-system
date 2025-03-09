import { UUID } from "crypto";

export interface FlightsConfig {
  id: UUID;
  early_rate: number;
  normal_rate: number;
  late_rate: number;
  dynamic_price_rate: number;
  frequent_flyer: number;
  created_at: number;
  updated_at: number;
}
