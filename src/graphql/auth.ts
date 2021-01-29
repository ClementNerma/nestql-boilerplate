import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): unknown {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlOptionalAuthGuard extends GqlAuthGuard {
  handleRequest<TUser>(err: unknown, user: TUser | false): TUser | false {
    return user;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GqlAuth = (allowUnauth?: boolean) =>
  applyDecorators(
    UseGuards(!allowUnauth ? GqlAuthGuard : GqlOptionalAuthGuard),
  );

export const GqlPayload = createParamDecorator(
  (data, { args: [root, args, ctx, infos] }) => ctx.req?.user || null,
);

export const ViewerId = createParamDecorator(
  (data, { args: [root, args, ctx, infos] }) => (ctx.req?.user || null)?.uuid,
);
