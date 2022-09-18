import { Injectable } from '@nestjs/common';
import { Repository, QueryRunner } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities';
// import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: Repository<UserEntity>) {}

  async createUser(
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
