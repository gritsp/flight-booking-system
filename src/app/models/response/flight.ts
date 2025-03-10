import { Flights } from "../databases/flights";

export interface FlightResponse extends Flights {
  object: "flight";
}

export interface FlightsResponse {
  data: Flights[];
  object: "list";
}
