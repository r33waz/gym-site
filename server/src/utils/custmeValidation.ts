// filters/validation-exception.filter.ts
import {
  //   ExceptionFilter, interface to create custom error handler
  ExceptionFilter,
  //   decorator to tell NestJS what errors to handle
  Catch,
  //   gives access to request/response objects
  ArgumentsHost,
  //   handles 400 errors (validation errors)
  BadRequestException,
  //   built-in logging utility
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationError {
  // which input field failed (email, password)
  field: string;
  //   error message
  message: string;
  //   optional invalid value user sent
  value?: any;
}

interface ValidationErrorResponse {
  status: number;
  error: string;
  message: string;
  errors: ValidationError[];
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    // get http content
    const ctx = host.switchToHttp();
    // Extract Express response object to send custom response
    const response = ctx.getResponse<Response>();
    // Extract actual error payload from NestJS
    const exceptionResponse = exception.getResponse() as any;

    // Check if this is a validation error from class-validator
    if (this.isValidationError(exceptionResponse)) {
      const errors = this.formatValidationErrors(exceptionResponse.message);

      const errorResponse: ValidationErrorResponse = {
        status: 400,
        error: 'Validation Error',
        message: 'One or more validation errors occurred',
        errors: errors,
      };

      this.logger.warn(`Validation failed: ${JSON.stringify(errors)}`);

      response.status(400).json(errorResponse);
      return;
    }

    // Not a validation error, let the default handler process it
    response.status(400).json({
      status: 400,
      // error: 'Bad Request',
      message: exceptionResponse.message || 'Bad request',
      // timestamp: new Date().toISOString(),
    });
  }

  private isValidationError(response: any): boolean {
    return (
      typeof response === 'object' &&
      Array.isArray(response.message) &&
      response.message.length > 0
    );
  }

  private formatValidationErrors(messages: string[]): ValidationError[] {
    return messages.map((message) => {
      // Parse validation error messages
      // Format is usually: "propertyName constraint message"
      const parts = message.split(' ');
      const field = parts[0] || 'unknown';

      return {
        field: field,
        message: message,
      };
    });
  }
}
