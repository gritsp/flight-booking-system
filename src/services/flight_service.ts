import { Flights } from "@/app/models/databases/flights";
import { FlightService } from "@/interfaces/flight_service";
import database from "@/lib/database";

export default class FlightServiceImpl implements FlightService {
  private flightRepository;

  constructor() {
    this.flightRepository = database.prisma.flights;
  }

  async getFlights(): Promise<Flights[]> {
    const result = await this.flightRepository.findMany();
    if (!result) {
      return [] as unknown as Flights[];
    }
    return result;
  }

  async getFlightById(id: string): Promise<Flights> {
    const result = await this.flightRepository.findUnique({
      where: { id: id },
    });
    if (!result) {
      return null as unknown as Flights;
    }
    return result;
  }

  async createFlight(flight: Flights): Promise<Flights> {
    const result = await this.flightRepository.create({
      data: {
        origin: flight.origin,
        destination: flight.destination,
        departure: flight.departure,
        config_id: flight.config_id,
      },
    });
    return result;
  }

  async updateFlight(id: string, flight: Flights): Promise<Flights> {
    const result = await this.flightRepository.update({
      where: { id: id },
      data: {
        ...flight,
      },
    });
    return result;
  }

  async deleteFlight(id: string): Promise<Flights> {
    const result = await this.flightRepository.delete({
      where: { id: id },
    });
    return result;
  }
}
