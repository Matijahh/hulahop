import { PartialType } from '@nestjs/swagger';
import { CreateUserSessionInput } from './create-user-session.input';

export class UpdateUserSessionInput extends PartialType(
    CreateUserSessionInput,
) {
    id: number;
}
