import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(
  UnauthorizedException,
  ForbiddenException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: UnauthorizedException | ForbiddenException | NotFoundException | BadRequestException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      success: false,
      status: statusCode,
      message: exception.message,
    });
  }
}
