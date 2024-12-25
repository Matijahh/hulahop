import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';

@Entity('announcements', { schema: 'hulahop_dev' })
export class Announcements {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(100)
  @Column('varchar', { name: 'title', nullable: true, length: 100 })
  title: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('tinyint', { name: 'status', nullable: true, width: 1 })
  status: boolean | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;
}
