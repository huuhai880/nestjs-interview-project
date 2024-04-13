import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  product_name: string;

  @Column()
  category_id: number;

  @Column()
  type_of_product: number;

  @Column({ default: 0 })
  price: number;

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