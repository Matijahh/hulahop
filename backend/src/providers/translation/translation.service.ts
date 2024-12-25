import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { AddTranslationsInput } from './dto/add-translation.dto';

@Injectable()
export class TranslationService {
  addTranslations(addTranslationsInput: AddTranslationsInput): boolean {
    const { en, sb } = addTranslationsInput;
    const originalEn = this.getTranslation('en');
    const originalSb = this.getTranslation('sb');

    try {
      this.updateTranslation('en', { [en]: en });
      this.updateTranslation('sb', { [en]: sb });
      this.updateTranslation('en', { [sb]: en });
      return true;
    } catch (error) {
      console.error(error);
      // If an error occurs, revert the translations back to their original state
      this.updateTranslation('en', originalEn);
      this.updateTranslation('sb', originalSb);
      throw new BadRequestException(
        'An error occurred while adding translations',
      );
    }
  }

  private getTranslation(lang: string): { [key: string]: string } {
    const filePath = path.join(`src/i18n/${lang}/translation.json`);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData.toString());
  }

  private updateTranslation(
    lang: string,
    translation: { [key: string]: string },
  ): boolean {
    try {
      const filePath = path.join(`src/i18n/${lang}/translation.json`);
      // Read the existing translations
      const rawData = fs.readFileSync(filePath);
      const existingTranslations = JSON.parse(rawData.toString());
      // Merge the existing translations with the new translations
      const mergedTranslations = { ...existingTranslations, ...translation };
      const updatedData = JSON.stringify(mergedTranslations, null, 2);
      // Write the merged translations back to the file
      fs.writeFileSync(filePath, updatedData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
