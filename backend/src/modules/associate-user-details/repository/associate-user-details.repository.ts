import { AssociateUserDetails } from '../entities/associate-user-details.entity';
import { dataSource } from '../../../core/data-source';

export const associateUserDetailsRepository =
    dataSource.getRepository(AssociateUserDetails);
