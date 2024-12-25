import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class CreateUsersInput {
  @ApiPropertyOptional()
  @MaxLength(50)
  first_name: string | null;

  @ApiPropertyOptional()
  @MaxLength(50)
  last_name: string | null;

  @ApiPropertyOptional()
  @MaxLength(70)
  email: string | null;

  @ApiPropertyOptional()
  @MaxLength(50)
  mobile: string | null;

  @ApiPropertyOptional()
  status: boolean | null;

  @ApiPropertyOptional({ default: 'USER' })
  type: 'USER' | 'ASSOCIATE' | 'ADMIN';

  @ApiPropertyOptional()
  password: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  image_id: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  isHighlighted: boolean | null;


  created_at: string | null;
  updated_at: string | null;
}

export class BecomeSellerInput {
  @ApiProperty()
  @MaxLength(50)
  mobile: string;
}
