import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { EmailService } from './email.service';
import { BadRequestException, ConflictException } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ): Promise<User> {
    const { email, nickname } = createUserInput;
    if (!this.emailService.checkEmailFormat(email)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const newUser = await this.usersService.create(createUserInput);
    await this.emailService.sendWelcomeEmail(email, nickname);
    return newUser;
  }

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
