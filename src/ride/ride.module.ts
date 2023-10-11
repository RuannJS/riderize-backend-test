import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';

@Module({
  imports: [PrismaModule],
  providers: [
    RideService,
    { provide: APP_INTERCEPTOR, useClass: AuthInterceptor },
  ],
  controllers: [RideController],
})
export class RideModule {}
