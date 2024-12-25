import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { StoreLayoutDetails } from '../../store-layout-details/entities/store-layout-details.entity';
import { Images } from '../../images/entities/images.entity';

@Entity('store_layout_sliders', { schema: 'hulahop_dev' })
export class StoreLayoutSliders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.store_id !== null)
  @IsInt()
  @Column('int', { name: 'store_id', nullable: true })
  store_id: number | null;

  @MaxLength(100)
  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @ManyToOne(
    () => StoreLayoutDetails,
    (store_layout_details) => store_layout_details.store_layout_sliders,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: StoreLayoutDetails;

  @ManyToOne(() => Images, (images) => images.store_layout_sliders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;
}
