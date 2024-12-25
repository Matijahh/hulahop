import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentUser {
  user_id: number;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);