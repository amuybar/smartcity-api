import { Test, TestingModule } from '@nestjs/testing';
import { TrafficService } from './traffic.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Traffic } from './traffic.schema';
import { Model } from 'mongoose';

describe('TrafficService', () => {
  let service: TrafficService;
  let model: Model<Traffic>;

  const mockTrafficModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficService,
        {
          provide: getModelToken(Traffic.name),
          useValue: mockTrafficModel,
        },
      ],
    }).compile();

    service = module.get<TrafficService>(TrafficService);
    model = module.get<Model<Traffic>>(getModelToken(Traffic.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTraffic', () => {
    it('should create and return traffic data', async () => {
      const data = { location: 'Kakamega', count: 50 };
      const savedTraffic = { ...data, _id: 'mockId' };

      mockTrafficModel.save.mockResolvedValue(savedTraffic);

      const result = await service.createTraffic(data);
      expect(result).toEqual(savedTraffic);
      expect(mockTrafficModel.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if creation fails', async () => {
      const data = { location: 'Kakamega', count: 50 };
      mockTrafficModel.save.mockRejectedValue(new Error('Error creating'));

      await expect(service.createTraffic(data)).rejects.toThrow(
        'Error creating traffic data',
      );
    });
  });

  describe('getAllTraffic', () => {
    it('should return all traffic data', async () => {
      const trafficData = [{ location: 'Kakamega', count: 50 }];
      mockTrafficModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(trafficData),
      });

      const result = await service.getAllTraffic();
      expect(result).toEqual(trafficData);
      expect(mockTrafficModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching fails', async () => {
      mockTrafficModel.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Error fetching')),
      });

      await expect(service.getAllTraffic()).rejects.toThrow(
        'Error fetching traffic data',
      );
    });
  });

  describe('getTrafficByLocation', () => {
    it('should return traffic data for a specific location', async () => {
      const location = 'Kakamega';
      const trafficData = [{ location: 'Kakamega', count: 50 }];
      mockTrafficModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(trafficData),
      });

      const result = await service.getTrafficByLocation(location);
      expect(result).toEqual(trafficData);
      expect(mockTrafficModel.find).toHaveBeenCalledWith({ location });
    });

    it('should throw a NotFoundException if no location is provided', async () => {
      await expect(service.getTrafficByLocation('')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return an empty array if no data matches the location', async () => {
      const location = 'Unknown Location';
      mockTrafficModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      const result = await service.getTrafficByLocation(location);
      expect(result).toEqual([]);
      expect(mockTrafficModel.find).toHaveBeenCalledWith({ location });
    });
  });
});
