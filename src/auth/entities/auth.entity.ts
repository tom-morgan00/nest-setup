import { Entity, Column, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities';
import { UserEntity } from 'src/user/entities';

@Entity({ name: 'auth' })
export class AuthEntity extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.auth)
  @Exclude()
  public user: UserEntity;
}
