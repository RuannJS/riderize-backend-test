import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/ride.dto';
import { Auth } from 'src/decorator/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

export interface AuthUser {
  id: string;
  email: string;
  iat: number;
}
@Controller('ride')
export class RideController {
  constructor(private readonly Service: RideService) {}

  @Get('/created')
  async listCreatedRides(@Auth() user: AuthUser) {
    return await this.Service.listCreatedRides(user);
  }

  @Get('/participated')
  async listParticipatedRides(@Auth() user: AuthUser) {
    return await this.Service.listParticipatedRides(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async listAvailableRides() {
    return await this.Service.listAvailableRides();
  }

  @UseGuards(AuthGuard)
  @Post()
  async createRide(@Body() body: CreateRideDto, @Auth() user: AuthUser) {
    return await this.Service.createRide(body, user);
  }

  @UseGuards(AuthGuard)
  @Post('/join/:rideID')
  async joinRide(@Param('rideID') rideID: string, @Auth() user: AuthUser) {
    return await this.Service.joinRide(rideID, user);
  }
}
