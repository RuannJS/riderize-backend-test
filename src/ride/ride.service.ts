import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from './ride.controller';

interface CreateRideParam {
  name: string;
  start_date: Date;
  start_date_registration: Date;
  end_date_registration: Date;
  additonal_information?: string;
  start_place: string;
  participants_limit?: number;
}

@Injectable()
export class RideService {
  constructor(private readonly Prisma: PrismaService) {}

  async listCreatedRides(user: AuthUser) {
    const createdRides = await this.Prisma.ride.findMany({
      where: {
        ride_creator_id: user.id,
      },
    });

    return createdRides;
  }

  async listParticipatedRides(user: AuthUser) {
    const myRides = await this.Prisma.registeredParticipant.findMany({
      select: {
        ride: true,
      },
      where: {
        user_id: user.id,
      },
    });

    return myRides;
  }

  async listAvailableRides() {
    const allRides = await this.Prisma.ride.findMany();

    const oldRides = (ride: Date) => {
      const timeElapsed = Date.now();
      const rideTimeElapsed = ride.getTime();

      if (timeElapsed > rideTimeElapsed) {
        return false;
      }

      return true;
    };

    const rides = allRides.filter((ride) => oldRides(ride.start_date));

    return rides;
  }

  async createRide(
    {
      name,
      start_date,
      start_date_registration,
      end_date_registration,
      additonal_information,
      start_place,
      participants_limit,
    }: CreateRideParam,
    { email, iat, id }: AuthUser,
  ) {
    const newRide = await this.Prisma.ride.create({
      select: {
        id: true,
        name: true,
        start_date_registration: true,
        end_date_registration: true,
        start_place: true,
      },
      data: {
        name,
        start_date,
        start_date_registration,
        end_date_registration,
        additonal_information,
        start_place,
        participants_limit,
        ride_creator_id: id,
      },
    });

    return newRide;
  }

  async joinRide(rideID: string, user: AuthUser) {
    const verifyRide = await this.Prisma.ride.findUnique({
      select: {
        participants_limit: true,
        end_date_registration: true,
        participants: true,
      },
      where: {
        id: rideID,
      },
    });
    const subscriptionDate = Date.now();
    const today = new Date(subscriptionDate);
    const subscriptionLimit = verifyRide.end_date_registration.getTime();

    if (!verifyRide) {
      throw new NotFoundException();
    } else if (subscriptionDate > subscriptionLimit) {
      throw new UnauthorizedException();
    } else if (
      verifyRide.participants.length >= verifyRide.participants_limit
    ) {
      throw new UnauthorizedException();
    } else {
      const newParticipant = await this.Prisma.registeredParticipant.create({
        data: {
          ride_id: rideID,
          subscription_date: today.toISOString(),
          user_id: user.id,
        },
      });

      return newParticipant;
    }
  }
}
