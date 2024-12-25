import { AssociateWithdrawnRequest } from '../entities/associate-withdrawn-request.entity';
import { dataSource } from '../../../core/data-source';

export const associateWithdrawnRequestRepository = dataSource.getRepository(
    AssociateWithdrawnRequest,
);
