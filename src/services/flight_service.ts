import { Flights } from "@/app/models/databases/flights";
import { FlightsConfig } from "@/app/models/databases/flights_config";
import { FlightService } from "@/interfaces/flight_service";
import database from "@/lib/database";

export default class FlightServiceImpl implements FlightService {
  private flightRepository;
  private flightsConfigRepository;

  constructor() {
    this.flightRepository = database.prisma.flights;
    this.flightsConfigRepository = database.prisma.flights_config;
  }

  async getFlightsConfigs(): Promise<FlightsConfig[]> {
    const result = await this.flightsConfigRepository.findMany();
    if (!result) {
      return [] as unknown as FlightsConfig[];
    }
    return result;
  }

  async getFlightsConfigById(id: string): Promise<FlightsConfig> {
    if (!id) {
      console.log("id not found");
      return null as unknown as FlightsConfig;
    }
    const result = await this.flightsConfigRepository.findUnique({
      where: { id: id },
    });
    if (!result) {
      return null as unknown as FlightsConfig;
    }
    return result;
  }

  async createFlightsConfig(
    flightConfig: FlightsConfig
  ): Promise<FlightsConfig> {
    const result = await this.flightsConfigRepository.create({
      data: {
        ...flightConfig,
      },
    });

    return result;
  }

  async updateFlightsConfig(
    id: string,
    flightConfig: FlightsConfig
  ): Promise<FlightsConfig> {
    const idExist = await this.getFlightsConfigById(id);
    if (!idExist) {
      console.log("idExist not found");
      return null as unknown as FlightsConfig;
    }
    const result = await this.flightsConfigRepository.update({
      where: { id: id },
      data: {
        ...flightConfig,
      },
    });
    return result;
  }

  async deleteFlightsConfig(id: string): Promise<FlightsConfig> {
    const idExist = await this.getFlightsConfigById(id);
    if (!idExist) {
      return null as unknown as FlightsConfig;
    }
    const result = await this.flightsConfigRepository.delete({
      where: { id: id },
    });
    return result;
  }

  async getFlights(): Promise<Flights[]> {
    const result = await this.flightRepository.findMany();
    if (!result) {
      return [] as unknown as Flights[];
    }
    return result;
  }

  async getFlightById(id: string): Promise<Flights> {
    if (!id) {
      return null as unknown as Flights;
    }
    console.log("id", id);
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
