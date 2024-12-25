import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { imagesRepository } from './repository/images.repository';
import { Images } from './entities/images.entity';
import { CreateImagesInput } from './dto/create-images.input';
import { UpdateImagesInput } from './dto/update-images.input';
import { extname, join } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class ImagesService extends AbstractService {
  constructor() {
    super(imagesRepository);
  }

  async create(data: CreateImagesInput): Promise<Images> {
  const originalImagePath = join(process.cwd(), 'uploads', data.name);

  // Define compressed image name and path
  const compressedName = `compressed_${data.name.split('.')[0]}.webp`;
  const compressedImagePath = join(process.cwd(), 'uploads', compressedName);

  // Compress the image using Sharp
  await sharp(originalImagePath)
    .webp({ quality: 60 }) // Adjust quality as needed
    .toFile(compressedImagePath);

    const newData = {
      ...data,
      compressed_name: compressedName,
    };


  return await this.abstractCreate(newData);
  }

  async basicCreate(data: CreateImagesInput): Promise<Images> {
    return await this.abstractCreate(data);
  }

  async createCompressedImage(data: CreateImagesInput): Promise<Images> {
    const originalImagePath = join(process.cwd(), 'uploads', data.name);
  
    // Define the compressed image name and path
    const compressedName = `${data.name.split('.')[0]}.webp`; // Use the same base name
    const compressedImagePath = join(process.cwd(), 'uploads', compressedName);
  
    // Compress the image using Sharp
    await sharp(originalImagePath)
      .webp({ quality: 60 }) // Adjust compression quality as needed
      .toFile(compressedImagePath);
  
    // Update the data object to use the compressed name for both fields
    data.name = compressedName;

    const newData = {
      ...data,
      compressed_name: compressedName,
    };
  
    // Save the compressed image record in the database
    return await this.abstractCreate(newData);
  }

  async update(
    id: number,
    data: UpdateImagesInput,
    relations: string[] = null,
  ): Promise<Images | boolean> {
    const image = await this.findOne({ where: { id } });
    if (!image) {
      throw new BadRequestException('Record does not exist');
    }
    data.updated_at = Date.now().toString();
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async getPathDetails(id: string, compressed = false) {
    const file = await this.findOne({ where: { id } });
    if (!file) {
      throw new BadRequestException('Record does not exist');
    }
    const path = join(process.cwd(), 'uploads');
  
    return compressed
      ? {
          path: path,
          compressedFileName: file.compressed_name,
        }
      : {
          path: path,
          fileName: file.name,
          ext: extname(file.name).substring(1),
        };
  }
  

  extractBase64img = (data: string) => {
    const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    const match = data.match(reg);
    const baseType = {
      jpeg: 'jpg',
    };
    baseType['svg+xml'] = 'svg';
    if (!match) {
      throw new Error('image base64 data error');
    }
    const extensionName = baseType[match[1]] ? baseType[match[1]] : match[1];
    return {
      extensionName: '.' + extensionName,
      base64: match[2],
    };
  };

  async remove(id: string) {
    try {
      const image = await this.findOne({ where: { id } });
      if (!image) {
        throw new BadRequestException('Record does not exist');
      }
      const path = join(process.cwd(), 'uploads', image.name);
      if (fs.existsSync(path)) {
        fs.rmSync(path);
        const remove = await this.abstractRemove(id);
        return remove;
      }
    } catch (error) {
      console.error('there was an error:', error);
    }
  }
}
