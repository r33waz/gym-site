import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IServiceResponse<T> {
  message: string;
  data: T;
  meta?: IPaginationMeta;
}

export interface IApiResponse<T> {
  status: number;
  message: string;
  data: T;
  meta?: IPaginationMeta;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<
  IServiceResponse<T>,
  IApiResponse<T>
> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result: IServiceResponse<T>) => ({
        status: response.statusCode,
        message: result.message,
        data: result.data,
        ...(result.meta && {
          meta: result.meta,
        }),
      })),
    );
  }
}
