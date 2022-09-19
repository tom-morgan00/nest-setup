import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MySqlErrorCode } from 'src/database/constraints';
import { UserEntity } from 'src/user/entities';
import { UserService } from 'src/user/services';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateAuthDto } from '../dtos';
import { RegisterDto } from '../dtos/registration.dto';
import { AuthEntity } from '../entities';
import { UserAlreadyExistsException } from '../exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly dataSrc: DataSource,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    let user: UserEntity;
    const queryRunner = this.dataSrc.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const auth = await this.createAuth(registerDto, queryRunner);

      user = await this.userService.createUser(registerDto, auth, queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err?.code === MySqlErrorCode.UniqueViolation) {
        throw new UserAlreadyExistsException();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  private async createAuth(
    createAuthDto: CreateAuthDto,
    queryRunner: QueryRunner,
  ): Promise<AuthEntity> {
    const auth = this.authRepo.create(createAuthDto);
    return queryRunner.manager.save(auth);
  }
}
