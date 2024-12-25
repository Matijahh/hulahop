import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAssociateIsApproveInput {
  @ApiProperty({ default: false })
  @IsBoolean()
  is_approve: boolean;
}

export class UpdateAssociateIsVisibleOnSiteInput {
  @ApiProperty({ default: false })
  @IsBoolean()
  is_visible_on_site: boolean;
}

export class UpdateAssociateBestSellingInput {
  @ApiProperty({ default: false })
  @IsBoolean()
  best_selling: boolean;
}

export class UpdateAssociateHighlightedInput {
  @ApiProperty({ default: false })
  @IsBoolean()
  associate_highlighted: boolean;
}