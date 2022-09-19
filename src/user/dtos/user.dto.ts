import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthDto } from '../../auth/dtos';

export class CreateUserDto extends CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
