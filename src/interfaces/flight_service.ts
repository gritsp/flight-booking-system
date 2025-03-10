import { Flights } from "@/app/models/databases/flights";
import { FlightsConfig } from "@/app/models/databases/flights_config";

export interface FlightService {
  getFlights(): Promise<Flights[]>;
  getFlightById(id: string): Promise<Flights>;
  createFlight(flight: Flights): Promise<Flights>;
  updateFlight(id: string, flight: Flights): Promise<Flights>;
  deleteFlight(id: string): Promise<Flights>;

  getFlightsConfigs(): Promise<FlightsConfig[]>;
  getFlightsConfigById(id: string): Promise<FlightsConfig>;
  createFlightsConfig(flightConfig: FlightsConfig): Promise<FlightsConfig>;
  updateFlightsConfig(
    id: string,
    flightConfig: FlightsConfig
  ): Promise<FlightsConfig>;
  deleteFlightsConfig(id: string): Promise<FlightsConfig>;
}
