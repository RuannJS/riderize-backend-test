import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface RegisterParam {
  name: string;
  email: string;
  password: string;
}

interface LoginParam {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly Prisma: PrismaService) {}

  async register(body: RegisterParam) {
    const hashedPass = await bcrypt.hash(body.password, 5);

    const verifyUniqueUser = await this.Prisma.user.findUnique({
      where: { email: body.email },
    });

    if (verifyUniqueUser) {
      throw new ConflictException();
    }

    const newUser = await this.Prisma.user.create({
      select: {
        id: true,
        name: true,
      },
      data: { ...body, password: hashedPass },
    });

    return newUser;
  }

  async login({ email, password }: LoginParam) {
    const verifyUser = await this.Prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!verifyUser) {
      throw new UnauthorizedException();
    }

    const verifyUserPassword = await bcrypt.compare(
      password,
      verifyUser.password,
    );
    if (!verifyUserPassword) {
      throw new UnauthorizedException();
    }

    const token = await jwt.sign(
      { id: verifyUser.id, email },
      process.env.JWT_KEY,
    );

    return `Bearer ${token}`;
  }
}
