import { UserAddresses } from '../entities/user-addresses.entity';
import { dataSource } from '../../../core/data-source';

export const userAddressesRepository = dataSource.getRepository(UserAddresses);
