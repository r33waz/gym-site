import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HRRP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      this.logger.log(
        `Method :- ${method} Url :- ${originalUrl} Status:- ${statusCode} - ${userAgent} ${ip} +${duration}ms`,
      );
    });

    res.on('close', () => {
      if (!res.writableFinished) {
        const duration = Date.now() - startTime;
        this.logger.warn(
          `${method} ${originalUrl} connection closed before response finished - ${ip} +${duration}ms`,
        );
      }
    });

    next();
  }
}
