import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NODE_ENV } from 'src/app/constants';
import { SnakeNamingStrategy } from './strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        logging: configService.get('NODE_ENV') === NODE_ENV.DEVELOPMENT,
        extra: { charset: 'utf8mb4_unicode_ci' }, // allows emojis to be stored in the database
      }),
    }),
  ],
})
export class DatabaseModule {}
