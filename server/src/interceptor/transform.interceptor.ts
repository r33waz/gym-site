import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface Response<T> {
  status: number;
  message: string;
  data: T;
  meta?: IPaginationMeta;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const statusCode =  context.switchToHttp().getResponse().statusCode
    return next.handle().pipe(
      map((response)=>{
        if (response && typeof response === "object" && 'items' in response && Array.isArray(response?.items)){
          const {item,...meta} = response
          return (
            statusCode
          )
        }
      })
    )
  }
}
