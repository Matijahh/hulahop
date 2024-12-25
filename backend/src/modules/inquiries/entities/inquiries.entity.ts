import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';

@Entity('inquiries', { schema: 'hulahop_dev' })
export class Inquiries {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(100)
  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @MaxLength(70)
  @Column('varchar', { name: 'email', nullable: true, length: 70 })
  email: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'mobile', nullable: true, length: 50 })
  mobile: string | null;

  @MaxLength(150)
  @Column('varchar', { name: 'subject', nullable: true, length: 150 })
  subject: string | null;

  @Column('text', { name: 'message', nullable: true })
  message: string | null;
}
