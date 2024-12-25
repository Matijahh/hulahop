import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from 'src/commons/enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('exception', exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception.name === 'QueryFailedError') {
      let m = 'Something went wrong. Please try again later';
      // Ref: https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
      if (exception.code === 'ER_NO_REFERENCED_ROW_2') {
        // MySQL equivalent of '23503'
        if (exception.message.includes('Cannot add or update a child row')) {
          m = 'The referenced record does not exist';
          status = HttpStatus.NOT_FOUND;
        }
        if (exception.message.includes('referenced')) {
          m = 'The record is already in use';
          status = HttpStatus.FOUND;
        }
      }
      if (exception.code === 'ER_DUP_ENTRY') {
        // MySQL equivalent of '23505'
        m = exception.message.replace('Key', 'Field');
        status = HttpStatus.CONFLICT;
      }
      // Add more MySQL error codes as needed...
      return response.status(status).json({
        statusCode: status,
        message: m,
      });
    } else if (exception.name === ErrorType.TokenExpiredError) {
      const status = HttpStatus.UNAUTHORIZED;
      return response.status(status).json({
        statusCode: status,
        message: 'Unauthorized User!',
      });
    } else {
      const data: any =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception;
      return response.status(status).json({
        statusCode: data.statusCode,
        message: isArray(data.message) ? data.message[0] : data.message,
      });
    }
  }
}
