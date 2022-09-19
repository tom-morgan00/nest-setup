import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/entities';
import { Repository, QueryRunner } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities';
// import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async createUser(
    createUserDto: CreateUserDto,
    authEntity: AuthEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this.userRepo.create({
      ...createUserDto,
      auth: authEntity,
    });

    return queryRunner.manager.save(user);
  }
}
