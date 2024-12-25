import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { SkipAuth } from '../../core/guards/auth-guard';
import { AddTranslationsInput } from './dto/add-translation.dto';
import { TranslationService } from './translation.service';
import { baseController } from '../../core/baseController';
import { Response } from 'express';

@Controller('translations')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}
  @Post()
  addTranslations(
    @Body() addTranslationsInput: AddTranslationsInput,
    @Res() res: Response,
  ) {
    const result =
      this.translationService.addTranslations(addTranslationsInput);
    return baseController.getResult(
      res,
      HttpStatus.OK,
      result,
      'Translation added successfully',
    );
  }

  @SkipAuth()
  @Get(':lang')
  getTranslations(@Param('lang') lang: string): Record<string, string> {
    try {
      const fileToRead = process.env.NODE_ENV === 'prod' ? '.' : 'src';
      const translation = readFileSync(
        `${fileToRead}/i18n/${lang}/translation.json`,
        'utf8',
      );
      return JSON.parse(translation);
    } catch (error) {
      // Handle error
      throw new BadRequestException('Translations not found');
    }
  }
}
