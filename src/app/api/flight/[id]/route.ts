import { Flights } from "@/app/models/databases/flights";
import { FlightResponse } from "@/app/models/response/flight";
import FlightServiceImpl from "@/services/flight_service";
const flightService = new FlightServiceImpl();

export async function GET(params: Promise<{ id: string }>) {
  try {
    const { id } = await params;
    const result = await flightService.getFlightById(id);
    if (!result) {
      return Response.json({ error: "Flight not found" }, { status: 404 });
    }
    return Response.json({ object: "flight", ...result } as FlightResponse);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "something went wrong. please try again" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, params: Promise<{ id: string }>) {
  try {
    const { id } = await params;
    const flight = await req.json();
    const result = await flightService.updateFlight(id, flight as Flights);
    if (!result) {
      return Response.json({ error: "Flight not found" }, { status: 404 });
    }
    return Response.json({ object: "flight", ...result } as FlightResponse);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "something went wrong. please try again" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, params: Promise<{ id: string }>) {
  try {
    const { id } = await params;
    const result = await flightService.deleteFlight(id);
    if (!result) {
      return Response.json({ error: "Flight not found" }, { status: 404 });
    }
    return Response.json(result);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "something went wrong. please try again" },
      { status: 500 }
    );
  }
}
