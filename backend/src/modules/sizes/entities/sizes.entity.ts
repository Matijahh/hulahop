import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';

@Entity('sizes', { schema: 'hulahop_dev' })
export class Sizes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(50)
  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;
}
