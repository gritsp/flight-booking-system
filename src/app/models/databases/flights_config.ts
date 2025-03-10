export interface FlightsConfig {
  id: string;
  early_rate: number;
  normal_rate: number;
  late_rate: number;
  dynamic_price_rate: number;
  frequent_flyer: number;
  created_at: Date;
  updated_at: Date;
}
