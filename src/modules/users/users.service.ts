import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';

@Injectable()
export class UsersService {
  private readonly ROUNDS = 12;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 중복 검사
    await this.validateUniqueEmail(createUserDto.email);

    // 닉네임 중복 검사
    await this.validateUniqueNickname(createUserDto.nickname);

    // 비밀번호 해싱
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // 사용자 생성
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // 환영 이메일 발송
    this.sendWelcomeEmailAsync(savedUser.email, savedUser.nickname);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['my_items', 'custom_sessions'],
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        created_at: true,
        updated_at: true,
        my_items: {
          id: true,
        },
        custom_sessions: {
          id: true,
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['my_items', 'custom_sessions'],
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        created_at: true,
        updated_at: true,
        my_items: {
          id: true,
        },
        custom_sessions: {
          id: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return true;
  }

  private async validateUniqueEmail(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
      withDeleted: false,
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일');
    }
  }

  private async validateUniqueNickname(nickname: string) {
    const existingUser = await this.userRepository.findOne({
      where: { nickname },
      withDeleted: false,
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 닉네임');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const result: string = await bcrypt.hash(password, this.ROUNDS);
    return result;
  }

  private sendWelcomeEmailAsync(email: string, nickname: string): void {
    this.emailService.sendWelcomeEmail(email, nickname).catch((error) => {
      this.logger.error(`환영 이메일 발송 실패: ${email}`, error.stack);
    });
  }
}
