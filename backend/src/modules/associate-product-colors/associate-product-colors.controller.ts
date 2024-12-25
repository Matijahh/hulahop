import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AssociateProductColorsService } from './associate-product-colors.service';
import { CreateAssociateProductColorsInput } from './dto/create-associate-product-colors.input';
import { UpdateAssociateProductColorsInput } from './dto/update-associate-product-colors.input';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('associate_product_colors')
@ApiBasicAuth()
@Controller('associate_product_colors')
export class AssociateProductColorsController {
  constructor(
    private readonly associateProductColorsService: AssociateProductColorsService,
  ) {}

  @ApiBody({ type: CreateAssociateProductColorsInput })
  @Post()
  create(
    @Body()
    createAssociateProductColorsInput: CreateAssociateProductColorsInput,
  ) {
    return this.associateProductColorsService.create(
      createAssociateProductColorsInput,
    );
  }

  @Get()
  findAll() {
    return this.associateProductColorsService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associateProductColorsService.findOne({ where: { id } });
  }

  @ApiBody({ type: UpdateAssociateProductColorsInput })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateAssociateProductColorsInput: UpdateAssociateProductColorsInput,
  ) {
    return this.associateProductColorsService.update(id, {
      ...updateAssociateProductColorsInput,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.associateProductColorsService.remove(id);
  }
}
