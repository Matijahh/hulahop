import { StoreLayoutDetails } from '../entities/store-layout-details.entity';
import { dataSource } from '../../../core/data-source';

export const storeLayoutDetailsRepository =
    dataSource.getRepository(StoreLayoutDetails);
