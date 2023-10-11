import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Http2ServerRequest = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split('Bearer ')[1];

    if (!token) {
      return false;
    }
    return true;
  }
}
