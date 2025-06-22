import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomSessionService } from './custom_session.service';
import { CustomSession } from './entities/custom_session.entity';
import { CreateCustomSessionInput } from './dto/create-custom_session.input';

@Resolver(() => CustomSession)
export class CustomSessionResolver {
  constructor(private readonly customSessionService: CustomSessionService) {}

  @Query(() => CustomSession, { nullable: true })
  fetchCustomSession(
    @Args('sessionId')
    sessionId: number,
  ): Promise<CustomSession | null> {
    return this.customSessionService.findOneBySessionId({ sessionId });
  }

  @Mutation(() => CustomSession)
  createCustomSession(
    @Args('productId', { type: () => Int })
    productId: number,
    @Args('userId', { type: () => Int })
    userId: number,
    @Args('createCustomSessionInput')
    createCustomSessionInput: CreateCustomSessionInput,
  ): Promise<CustomSession | null> {
    const user = { id: userId } as any;
    const product = { id: productId } as any;
    return this.customSessionService.create({
      createCustomSessionInput,
      user,
      product,
    });
  }
}
