import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user';
import { AuthController } from './controllers';
import { AuthEntity } from './entities';
import { AuthService } from './services';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AuthEntity])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
