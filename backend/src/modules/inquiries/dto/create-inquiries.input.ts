import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateInquiriesInput {
  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiProperty()
  @MaxLength(70)
  email: string | null;

  @ApiProperty()
  @MaxLength(50)
  mobile: string | null;

  @ApiProperty()
  @MaxLength(150)
  subject: string | null;

  @ApiProperty()
  message: string | null;
}

export class CreateAssociateInquiry {
  @ApiProperty()
  @MaxLength(100)
  name: string | null;

  @ApiProperty()
  @MaxLength(70)
  email: string | null;

  @ApiProperty()
  @MaxLength(50)
  mobile: string | null;

  @ApiProperty()
  @MaxLength(150)
  subject: string | null;

  @ApiProperty()
  message: string | null;

  @ApiProperty()
  associate_id: string;
}
