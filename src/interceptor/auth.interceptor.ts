import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    const request: Http2ServerRequest = context.switchToHttp().getRequest();

    const token: string = request?.headers?.authorization?.split('Bearer ')[1];

    request.headers['auth'] = token;

    return handler.handle();
  }
}
