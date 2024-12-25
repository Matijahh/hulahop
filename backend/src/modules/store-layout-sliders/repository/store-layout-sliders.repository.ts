import { StoreLayoutSliders } from '../entities/store-layout-sliders.entity';
import { dataSource } from '../../../core/data-source';

export const storeLayoutSlidersRepository =
    dataSource.getRepository(StoreLayoutSliders);
