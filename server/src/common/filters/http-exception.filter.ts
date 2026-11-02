import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('EXCEPTION_LAYER');
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    // if it is the known nest js http exception or run time error
    const status =
      exception instanceof HttpException
        ? exception?.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

    this.logger.error(
      `Route: ${request.url} | Status: ${status} | Error: ${exception instanceof Error ? exception.message : exception}`,
    );

    response.status(status).json({
      status: status,
      message: typeof message === 'object' && message['message'] ? message['message'] : message,
    });
  }
}
