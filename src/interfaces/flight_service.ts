import { Flights } from "@/app/models/databases/flights";

export interface FlightService {
  getFlights(): Promise<Flights[]>;
  getFlightById(id: string): Promise<Flights>;
  createFlight(flight: Flights): Promise<Flights>;
  updateFlight(id: string, flight: Flights): Promise<Flights>;
  deleteFlight(id: string): Promise<Flights>;
}
