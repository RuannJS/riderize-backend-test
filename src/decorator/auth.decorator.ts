import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

export const Auth = createParamDecorator(
  async (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const token: string = request.headers.auth;

    const user = await jwt.verify(token, process.env.JWT_KEY);

    return user;
  },
);
