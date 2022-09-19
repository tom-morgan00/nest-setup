import { Entity, Column, JoinColumn, OneToOne, Index } from 'typeorm';
import { AbstractEntity } from 'src/common/entities';
import { AuthEntity } from 'src/auth/entities';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column()
  public name: string;

  @OneToOne(() => AuthEntity, (auth: AuthEntity) => auth.user, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Index()
  public auth: AuthEntity;
}
