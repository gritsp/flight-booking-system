import { Flights } from "@/app/models/databases/flights";
import { FlightResponse, FlightsResponse } from "@/app/models/response/flight";
import FlightServiceImpl from "@/services/flight_service";
const flightService = new FlightServiceImpl();

export async function GET() {
  try {
    const result = await flightService.getFlights();
    return Response.json({ object: "list", data: result } as FlightsResponse);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "something went wrong. please try again" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const flight = await req.json();
    const result = await flightService.createFlight(flight as Flights);
    return Response.json({ object: "flight", ...result } as FlightResponse);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "something went wrong. please try again" },
      { status: 500 }
    );
  }
}
