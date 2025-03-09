import FlightService from "@/services/flight_service";
import database from "@/lib/database"; // Adjust to your Prisma client path
import { randomUUID } from "crypto";
import { Flights } from "@/app/models/databases/flights";

jest.mock("@/lib/database", () => ({
  prisma: {
    flights: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));
describe("FlightService", () => {
  let flightService: FlightService;
  beforeAll(() => {
    flightService = new FlightService();
  });

  describe("getFlights", () => {
    it("should return a list of flights", async () => {
      const mockFlights = [
        {
          id: randomUUID(),
          origin: "JFK",
          destination: "LAX",
          departureTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as unknown as Flights,
      ];
      (database.prisma.flights.findMany as jest.Mock).mockResolvedValue(
        mockFlights
      );
      const result = await flightService.getFlights();
      expect(result).toEqual(mockFlights);
    });

    it("should return empty array when flight is not found", async () => {
      (database.prisma.flights.findMany as jest.Mock).mockResolvedValue(null);
      const result = await flightService.getFlights();
      expect(result).toEqual([]);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights.findMany as jest.Mock).mockRejectedValue(
        new Error("cannot fetch flights")
      );
      await expect(flightService.getFlights()).rejects.toThrow(
        new Error("cannot fetch flights")
      );
    });
  });

  describe("getFlightById", () => {
    it("should return a flight", async () => {
      const mockFlight = {
        id: randomUUID(),
        origin: "JFK",
        destination: "LAX",
        departureTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Flights;
      (database.prisma.flights.findUnique as jest.Mock).mockResolvedValue(
        mockFlight
      );
      const result = await flightService.getFlightById(mockFlight.id);
      expect(result).toEqual(mockFlight);
    });

    it("should return null when flight is not found", async () => {
      (database.prisma.flights.findUnique as jest.Mock).mockResolvedValue(null);
      const result = await flightService.getFlightById(randomUUID());
      expect(result).toBeNull();
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights.findUnique as jest.Mock).mockRejectedValue(
        new Error("cannot fetch flight")
      );
      await expect(flightService.getFlightById(randomUUID())).rejects.toThrow(
        new Error("cannot fetch flight")
      );
    });
  });

  describe("createFlight", () => {
    it("should create a flight", async () => {
      const mockFlight = {
        id: randomUUID(),
        origin: "JFK",
        destination: "LAX",
        departureTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Flights;
      (database.prisma.flights.create as jest.Mock).mockResolvedValue(
        mockFlight
      );
      const result = await flightService.createFlight(mockFlight);
      expect(result).toEqual(mockFlight);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights.create as jest.Mock).mockRejectedValue(
        new Error("cannot create flight")
      );
      await expect(flightService.createFlight({} as Flights)).rejects.toThrow(
        new Error("cannot create flight")
      );
    });
  });

  describe("updateFlight", () => {
    it("should update a flight", async () => {
      const mockFlight = {
        id: randomUUID(),
        origin: "JFK",
        destination: "LAX",
        departureTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Flights;
      (database.prisma.flights.update as jest.Mock).mockResolvedValue(
        mockFlight
      );
      const result = await flightService.updateFlight(
        mockFlight.id,
        mockFlight
      );
      expect(result).toEqual(mockFlight);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights.update as jest.Mock).mockRejectedValue(
        new Error("cannot update flight")
      );
      await expect(
        flightService.updateFlight(randomUUID(), {} as Flights)
      ).rejects.toThrow(new Error("cannot update flight"));
    });
  });

  describe("deleteFlight", () => {
    it("should delete a flight", async () => {
      const mockFlight = {
        id: randomUUID(),
        origin: "JFK",
        destination: "LAX",
        departureTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Flights;
      (database.prisma.flights.delete as jest.Mock).mockResolvedValue(
        mockFlight
      );
      const result = await flightService.deleteFlight(mockFlight.id);
      expect(result).toEqual(mockFlight);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights.delete as jest.Mock).mockRejectedValue(
        new Error("cannot delete flight")
      );
      await expect(flightService.deleteFlight(randomUUID())).rejects.toThrow(
        new Error("cannot delete flight")
      );
    });
  });
});
