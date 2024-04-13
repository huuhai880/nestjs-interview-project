import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  user_name: string;

  @Column({ length: 50})
  password: string;

  @Column({ length: 50})
  full_name: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @Column()
  user_created: string;

  @CreateDateColumn({nullable: true, default: () => "NULL", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @Column({nullable: true, default: null })
  user_updated: string;

  @CreateDateColumn({nullable: true, default: () => "NULL" })
  deleted_at: Date;

  @Column({nullable: true, default: null })
  user_deleted: string;

}