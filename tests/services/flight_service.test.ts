import FlightService from "@/services/flight_service";
import database from "@/lib/database"; // Adjust to your Prisma client path
import { randomUUID, verify } from "crypto";
import { Flights } from "@/app/models/databases/flights";
import { FlightsConfig } from "@/app/models/databases/flights_config";

jest.mock("@/lib/database", () => ({
  prisma: {
    flights: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    flights_config: {
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

  describe("getFlightsConfigById", () => {
    it("should return a flight config", async () => {
      const mockFlightConfig = {
        id: randomUUID(),
        early_rate: 0.1,
        normal_rate: 1,
        late_rate: 1.5,
        dynamic_price_rate: 10,
        frequent_flyer: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (
        database.prisma.flights_config.findUnique as jest.Mock
      ).mockResolvedValue(mockFlightConfig);
      const result = await flightService.getFlightsConfigById(
        mockFlightConfig.id
      );
      expect(result).toEqual(mockFlightConfig);
    });

    it("should return null when flight config is not found", async () => {
      (
        database.prisma.flights_config.findUnique as jest.Mock
      ).mockResolvedValue(null);
      const result = await flightService.getFlightsConfigById(randomUUID());
      expect(result).toBeNull();
    });

    it("should throw an error when an error occurs", async () => {
      (
        database.prisma.flights_config.findUnique as jest.Mock
      ).mockRejectedValue(new Error("cannot fetch flight config"));
      await expect(
        flightService.getFlightsConfigById(randomUUID())
      ).rejects.toThrow(new Error("cannot fetch flight config"));
    });
  });

  describe("getFlightsConfigs", () => {
    it("should return a list of flight configs", async () => {
      const mockFlightConfigs = [
        {
          id: randomUUID(),
          early_rate: 0.1,
          normal_rate: 1,
          late_rate: 1.5,
          dynamic_price_rate: 10,
          frequent_flyer: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (database.prisma.flights_config.findMany as jest.Mock).mockResolvedValue(
        mockFlightConfigs
      );
      const result = await flightService.getFlightsConfigs();
      expect(result).toEqual(mockFlightConfigs);
    });

    it("should return empty array when flight configs are not found", async () => {
      (database.prisma.flights_config.findMany as jest.Mock).mockResolvedValue(
        null
      );
      const result = await flightService.getFlightsConfigs();
      expect(result).toEqual([]);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights_config.findMany as jest.Mock).mockRejectedValue(
        new Error("cannot fetch flight configs")
      );
      await expect(flightService.getFlightsConfigs()).rejects.toThrow(
        new Error("cannot fetch flight configs")
      );
    });
  });

  describe("createFlightsConfig", () => {
    it("should create a flight config", async () => {
      const mockFlightConfig = {
        id: randomUUID(),
        early_rate: 0.1,
        normal_rate: 1,
        late_rate: 1.5,
        dynamic_price_rate: 10,
        frequent_flyer: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };
      (database.prisma.flights_config.create as jest.Mock).mockResolvedValue(
        mockFlightConfig
      );
      const result = await flightService.createFlightsConfig(mockFlightConfig);
      expect(result).toEqual(mockFlightConfig);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights_config.create as jest.Mock).mockRejectedValue(
        new Error("cannot create flight config")
      );
      await expect(
        flightService.createFlightsConfig({} as FlightsConfig)
      ).rejects.toThrow(new Error("cannot create flight config"));
    });
  });

  describe("updateFlightsConfig", () => {
    it("should update a flight config", async () => {
      const mockFlightConfig = {
        early_rate: 0.1,
        normal_rate: 1,
        late_rate: 1.5,
        dynamic_price_rate: 10,
        frequent_flyer: 10,
      } as unknown as FlightsConfig;

      (
        database.prisma.flights_config.findUnique as jest.Mock
      ).mockResolvedValue(mockFlightConfig);

      (database.prisma.flights_config.update as jest.Mock).mockResolvedValue(
        mockFlightConfig
      );
      const result = await flightService.updateFlightsConfig(
        randomUUID(),
        mockFlightConfig
      );
      expect(database.prisma.flights_config.findUnique).toHaveBeenCalled();
      expect(result).toEqual(mockFlightConfig);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights_config.update as jest.Mock).mockRejectedValue(
        new Error("cannot update flight config")
      );
      await expect(
        flightService.updateFlightsConfig(randomUUID(), {} as FlightsConfig)
      ).rejects.toThrow(new Error("cannot update flight config"));
    });
  });

  describe("deleteFlightsConfig", () => {
    it("should delete a flight config", async () => {
      const mockFlightConfig = {
        id: randomUUID(),
        early_rate: 0.1,
        normal_rate: 1,
        late_rate: 1.5,
        dynamic_price_rate: 10,
        frequent_flyer: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };
      (database.prisma.flights_config.delete as jest.Mock).mockResolvedValue(
        mockFlightConfig
      );
      const result = await flightService.deleteFlightsConfig(
        mockFlightConfig.id
      );
      expect(result).toEqual(mockFlightConfig);
    });

    it("should throw an error when an error occurs", async () => {
      (database.prisma.flights_config.delete as jest.Mock).mockRejectedValue(
        new Error("cannot delete flight config")
      );
      await expect(
        flightService.deleteFlightsConfig(randomUUID())
      ).rejects.toThrow(new Error("cannot delete flight config"));
    });
  });
});
