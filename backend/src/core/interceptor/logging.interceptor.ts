import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import * as httpContext from 'express-http-context';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(_context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      tap((value) => {
        if (httpContext.get('response')) {
          const response = httpContext.get('response');
          if (!response.hasOwnProperty('success')) {
            throw new BadRequestException({
              message: [
                ...response.messages,
                {
                  message: 'Success value not set in response',
                  show: true,
                  type: 'error',
                },
              ],
              statusCode: 400,
            });
          }
          if (!value) {
            throw new BadRequestException({
              message: response.messages,
              statusCode: 400,
              success: response.success,
            });
          }
          if (typeof value === 'undefined' || value === null) {
            value = {
              response: {},
            };
          } else if (!value.response) {
            value['response'] = {};
          }
          value.response = { ...value.response, ...response };
        }
      }),
    );
  }
}
