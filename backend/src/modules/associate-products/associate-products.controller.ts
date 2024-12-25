import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AssociateProductsService } from './associate-products.service';
import { CreateAssociateProductsInput } from './dto/create-associate-products.input';
import { UpdateAssociateProductsInput } from './dto/update-associate-products.input';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { baseController } from 'src/core/baseController';
import {
  UpdateAssociateBestSellingInput,
  UpdateAssociateHighlightedInput,
  UpdateAssociateIsApproveInput,
  UpdateAssociateIsVisibleOnSiteInput,
} from './dto/update-associate-products-status.input';
import { CurrentUser } from 'src/commons';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { GetAssociateProductFilterInputDto } from './dto/get-associate-product-filter.input';
import { SkipAuth } from '../../core/guards/auth-guard';
import { masterFilterInputDto } from './dto/master-filter.dto';

@ApiTags('associate_products')
@ApiBearerAuth()
@Controller('associate_products')
export class AssociateProductsController {
  constructor(
    private readonly associateProductsService: AssociateProductsService,
  ) {}

  @ApiBody({ type: CreateAssociateProductsInput })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createAssociateProductsInput: CreateAssociateProductsInput,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    createAssociateProductsInput.user_id = currentUser.id;
    createAssociateProductsInput.created_at = Date.now().toString();
    const result = await this.associateProductsService.create(
      createAssociateProductsInput,
    );
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product created successfully',
    );
  }

  @SkipAuth()
  @Get()
  async findAll(
    @Res() res: Response,
    @Query() filterDto: GetAssociateProductFilterInputDto,
  ) {
    const result = await this.associateProductsService.findAll(filterDto);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate products retrieved successfully',
    );
  }

  @SkipAuth()
  @Get('master-search')
  async masterFilter(
    @Res() res: Response,
    @Query() query: masterFilterInputDto,
  ) {
    const result = await this.associateProductsService.masterFilter(query);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product retrieved successfully',
    );
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.associateProductsService.findOne({
      where: { id },
      relations: {
        product: {
          category: true,
          sub_category: true,
          product_variants: {
            color: true,
            sub_variants: true,
          },
        },
        user: { store_layout_details: true },
        cover_image_color: true,
        associate_product_colors: { color: true },
      },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product retrieved successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateProductsInput })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() updateAssociateProductsInput: UpdateAssociateProductsInput,
  ) {
    updateAssociateProductsInput.updated_at = Date.now().toString();
    const result = await this.associateProductsService.update(id, {
      ...updateAssociateProductsInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product updated successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateIsApproveInput })
  @Patch('approve/:id')
  async updateApprove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() updateAssociateIsApproveInput: UpdateAssociateIsApproveInput,
  ) {
    const result = await this.associateProductsService.updateStatus(id, {
      ...updateAssociateIsApproveInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product updated successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateIsVisibleOnSiteInput })
  @Patch('visible_on_site/:id')
  async updateVisibleOnSite(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body()
    updateAssociateIsVisibleOnSiteInput: UpdateAssociateIsVisibleOnSiteInput,
  ) {
    const result = await this.associateProductsService.updateStatus(id, {
      ...updateAssociateIsVisibleOnSiteInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product updated successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateBestSellingInput })
  @Patch('best_selling/:id')
  async updateBestSellingProduct(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body()
    updateAssociateBestSellingInput: UpdateAssociateBestSellingInput,
  ) {
    const result = await this.associateProductsService.updateBestSellingStatus(id, {
      ...updateAssociateBestSellingInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product updated successfully',
    );
  }

  @ApiBody({ type: UpdateAssociateHighlightedInput })
  @Patch('associate_highlighted/:id')
  async updateAssociateHighlighted(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body()
    UpdateAssociateHighlightedInput: UpdateAssociateHighlightedInput,
  ) {
    const result = await this.associateProductsService.updateHighlightStatus(id, {
      ...UpdateAssociateHighlightedInput,
      id,
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product updated successfully',
    );
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.associateProductsService.remove(id);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate product deleted successfully',
    );
  }
}
