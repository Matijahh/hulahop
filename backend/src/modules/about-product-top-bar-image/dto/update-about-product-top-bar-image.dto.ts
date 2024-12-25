import { PartialType } from '@nestjs/swagger';
import { CreateAboutProductTopBarImageDto } from './create-about-product-top-bar-image.dto';

export class UpdateAboutProductTopBarImageDto extends PartialType(CreateAboutProductTopBarImageDto) {}
