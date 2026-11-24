import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const reqyest = context.switchToHttp().getRequest();
  return reqyest.user;
});
