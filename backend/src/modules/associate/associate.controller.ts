import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { baseController } from 'src/core/baseController';
import { Response, Request } from 'express';
import { AssociateService } from './associate.service';
import { UserTypes } from 'src/commons/enum';
import { SkipAuth } from '../../core/guards/auth-guard';

@ApiTags('associates')
@ApiBearerAuth()
@Controller('associates')
export class AssociateController {
  constructor(private readonly associateService: AssociateService) {}

  @SkipAuth()
  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    const isHighlighted = req.query.isHighlighted === 'true';

    const conditions: any = { type: UserTypes.ASSOCIATE };
    if (req.query.isHighlighted !== undefined) {
      conditions.isHighlighted = isHighlighted;
    }

    const result = await this.associateService.find({
      where: conditions,
      relations: { store_layout_details: true },
    });

    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.associateService.findOne({
      where: { id },
      relations: { store_layout_details: true },
    });
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Associate fetched successfully',
    );
  }
}
