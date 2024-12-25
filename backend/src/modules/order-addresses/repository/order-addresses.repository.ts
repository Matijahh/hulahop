import { OrderAddresses } from '../entities/order-addresses.entity';
import { dataSource } from '../../../core/data-source';

export const orderAddressesRepository =
    dataSource.getRepository(OrderAddresses);
